import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { fetchTabixGffData } from './GFF3Fetcher.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fixtures: Record<string, Buffer> = {
  '/mini.gff3.gz': readFileSync(path.join(__dirname, 'fixtures/mini.gff3.gz')),
  '/mini.gff3.gz.tbi': readFileSync(
    path.join(__dirname, 'fixtures/mini.gff3.gz.tbi'),
  ),
}

function parseRange(rangeHeader: string, size: number) {
  const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader)
  if (!match) {
    return undefined
  }
  const start = Number(match[1])
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1
  return { start, end }
}

// Minimal HTTP server that serves the fixture files, honoring Range
// requests, since @gmod/tabix reads bgzip blocks via ranged GETs (and the
// .tbi index via a plain GET) rather than reading whole files.
async function withFixtureServer(run: (baseUrl: string) => Promise<void>) {
  const server = createServer((req, res) => {
    const body = fixtures[req.url ?? '']
    if (!body) {
      res.writeHead(404)
      res.end()
      return
    }
    const rangeHeader = req.headers.range
    const range = rangeHeader ? parseRange(rangeHeader, body.length) : undefined
    if (range) {
      const { start, end } = range
      res.writeHead(206, {
        'content-range': `bytes ${start}-${end}/${body.length}`,
        'content-length': end - start + 1,
      })
      res.end(body.subarray(start, end + 1))
    } else {
      res.writeHead(200, { 'content-length': body.length })
      res.end(body)
    }
  })

  await new Promise<void>(resolve => {
    server.listen(0, '127.0.0.1', resolve)
  })
  const address = server.address()
  if (!address || typeof address === 'string') {
    throw new Error('failed to start fixture server')
  }

  try {
    await run(`http://127.0.0.1:${address.port}`)
  } finally {
    await new Promise<void>(resolve => {
      server.close(() => resolve())
    })
  }
}

test('fetchTabixGffData converts a tabix-indexed GFF3 region into a SimpleFeatureSerialized tree', async () => {
  await withFixtureServer(async baseUrl => {
    const feats = await fetchTabixGffData({
      url: `${baseUrl}/mini.gff3.gz`,
      region: { chromosome: 'chrTest', start: 100, end: 500 },
    })

    assert.equal(feats.length, 1)
    const [gene] = feats
    assert.equal(gene.id, 'gene1')
    assert.equal(gene.name, 'TESTGENE')
    assert.equal(gene.seqId, 'chrTest')
    // GFF3 is 1-based closed; SimpleFeatureSerialized is 0-based half-open.
    assert.equal(gene.fmin, 100)
    assert.equal(gene.fmax, 500)
    assert.equal(gene.strand, -1)
    assert.equal(gene.type, 'gene')

    assert.equal(gene.children?.length, 1)
    const [mrna] = gene.children!
    assert.equal(mrna.id, 'mRNA1')
    assert.equal(mrna.name, 'TESTGENE-mRNA')
    assert.equal(mrna.type, 'mRNA')

    const childTypes = (mrna.children ?? []).map(f => f.type).sort()
    assert.deepEqual(childTypes, ['CDS', 'exon', 'exon'])

    const cds = mrna.children!.find(f => f.type === 'CDS')!
    assert.equal(cds.id, 'cds1')
    assert.equal(cds.fmin, 150)
    assert.equal(cds.fmax, 300)

    // exons carry no ID attribute, so a positional fallback ID is generated
    const exons = mrna.children!.filter(f => f.type === 'exon')
    assert.deepEqual(exons.map(f => f.id).sort(), [
      'chrTest:101..300:exon',
      'chrTest:350..500:exon',
    ])
  })
})

test('fetchTabixGffData excludes features outside the queried region', async () => {
  await withFixtureServer(async baseUrl => {
    const feats = await fetchTabixGffData({
      url: `${baseUrl}/mini.gff3.gz`,
      region: { chromosome: 'chrTest', start: 100, end: 500 },
    })

    assert.ok(!feats.some(f => f.id === 'gene2'))
  })
})
