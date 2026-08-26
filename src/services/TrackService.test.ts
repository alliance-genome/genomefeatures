import assert from 'node:assert/strict'
import test from 'node:test'

import { getJBrowseUrl } from './TrackService.ts'

const speciesDataDirectories = {
  FlyBase: 'Drosophila%20melanogaster',
  MGI: 'Mus%20musculus',
  WormBase: 'Caenorhabditis%20elegans',
  ZFIN: 'Danio%20rerio',
  SGD: 'Saccharomyces%20cerevisiae',
  RGD: 'Rattus%20norvegicus',
} as const

for (const [source, dataDirectory] of Object.entries(speciesDataDirectories)) {
  test(`builds a JBrowse URL for ${source}`, () => {
    assert.equal(
      getJBrowseUrl(source, 'chr1', 100, 200),
      `/jbrowse/?data=data%2F${dataDirectory}&tracks=Variants%2CAll%20Genes&highlight=&loc=chr1%3A100..200`,
    )
  })
}

test('builds a genes-only JBrowse URL for human data', () => {
  assert.equal(
    getJBrowseUrl('human', 'chr1', 100, 200),
    '/jbrowse/?data=data%2FHomo%20sapiens&tracks=All%20Genes&highlight=&loc=chr1%3A100..200',
  )
})

test('does not create a link for an unsupported source', () => {
  assert.equal(getJBrowseUrl('unsupported', 'chr1', 100, 200), null)
})
