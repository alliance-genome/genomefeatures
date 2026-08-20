import assert from 'node:assert/strict'
import test from 'node:test'

import { filterVariantsByIdentifiers } from './VariantFilterService.ts'

const variants = [
  { name: 'variant-one', identifiers: ['MGI:1', 'MGI:2'] },
  { name: 'variant-two', identifiers: ['MGI:3'] },
]

const matches = (
  variant: (typeof variants)[number],
  identifiers: ReadonlySet<string>,
) => variant.identifiers.some(identifier => identifiers.has(identifier))

test('omitted filter shows all variants', () => {
  assert.equal(
    filterVariantsByIdentifiers(variants, undefined, matches),
    variants,
  )
})

test('explicit empty filter shows no variants', () => {
  assert.deepEqual(filterVariantsByIdentifiers(variants, [], matches), [])
})

test('non-empty filter keeps matching variants', () => {
  assert.deepEqual(filterVariantsByIdentifiers(variants, ['MGI:2'], matches), [
    variants[0],
  ])
})
