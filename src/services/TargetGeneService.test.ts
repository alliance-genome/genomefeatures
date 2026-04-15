import assert from 'node:assert/strict'
import test from 'node:test'

import type { SimpleFeatureSerialized } from './types'

import {
  featureMatchesTargetGene,
  filterTrackDataForTargetGene,
} from './TargetGeneService.ts'

function makeFeature(
  overrides: Partial<
    SimpleFeatureSerialized & {
      alias?: string | string[]
      curie?: string
      gene_id?: string
    }
  > = {},
) {
  return {
    id: 'feature-1',
    fmin: 100,
    fmax: 200,
    seqId: 'chrIV',
    type: 'gene',
    name: 'feature-1',
    strand: 1,
    source: 'test',
    children: [],
    ...overrides,
  }
}

test('matches yeast-style genes by gene_id when feature name does not contain the curie', () => {
  const yeastFeature = makeFeature({
    id: 'YDR404C',
    name: 'RPB7',
    gene_id: 'SGD:S000002812',
  })

  assert.equal(
    featureMatchesTargetGene(yeastFeature, 'RPB7', 'SGD:S000002812'),
    true,
  )
})

test('matches frog-style genes by curie when the curie is not present in name or id', () => {
  const frogFeature = makeFeature({
    id: 'gene-0001',
    name: 'pax8.L',
    curie: 'Xenbase:XB-GENE-480983',
  })

  assert.equal(
    featureMatchesTargetGene(frogFeature, 'pax8.L', 'Xenbase:XB-GENE-480983'),
    true,
  )
})

test('matches target genes by alias when the canonical symbol differs from the feature name', () => {
  const aliasFeature = makeFeature({
    id: 'gene-0002',
    name: 'YDR404C',
    alias: ['RPB7', 'B16'],
  })

  assert.equal(featureMatchesTargetGene(aliasFeature, 'RPB7'), true)
})

test('matches target genes when yeast-style alias data is returned as a string', () => {
  const aliasFeature = makeFeature({
    id: 'gene-0002b',
    name: 'YDR404C',
    alias: 'RPB7',
  })

  assert.equal(featureMatchesTargetGene(aliasFeature, 'RPB7'), true)
})

test('filters to the matching target gene instead of leaving yeast/frog-style payloads unfiltered', () => {
  const targetFeature = makeFeature({
    id: 'gene-0003',
    name: 'YDR404C',
    gene_id: 'SGD:S000002812',
    alias: ['RPB7'],
  })
  const nonCodingFeature = makeFeature({
    id: 'gene-0004',
    name: 'snR10',
    type: 'ncRNA_gene',
    gene_id: 'SGD:S000006005',
  })

  const filtered = filterTrackDataForTargetGene(
    [nonCodingFeature, targetFeature],
    'RPB7',
    'SGD:S000002812',
  )

  assert.deepEqual(filtered, [targetFeature])
})

test('falls back to the original data when no target gene match is found', () => {
  const firstFeature = makeFeature({ id: 'gene-0005', name: 'feature-a' })
  const secondFeature = makeFeature({ id: 'gene-0006', name: 'feature-b' })
  const data = [firstFeature, secondFeature]

  assert.deepEqual(filterTrackDataForTargetGene(data, 'missing', 'missing'), data)
})
