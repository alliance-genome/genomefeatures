import assert from 'node:assert/strict'
import test from 'node:test'

import { getJBrowseUrl } from './TrackService.ts'

const speciesJBrowseConfigs = {
  FlyBase: {
    assembly: 'Drosophila_melanogaster',
    tracks:
      'Drosophila_melanogaster_all_genes,Drosophila_melanogaster_ht_variants,Drosophila_melanogaster_variants,Drosophila_melanogaster_multiple-variant_alleles',
  },
  MGI: {
    assembly: 'Mus_musculus',
    tracks:
      'Mus_musculus_all_genes,Mus_musculus_ht_variants,Mus_musculus_variants,Mus_musculus_multiple-variant_alleles',
  },
  WormBase: {
    assembly: 'Caenorhabditis_elegans',
    tracks:
      'Caenorhabditis_elegans_all_genes,Caenorhabditis_elegans_ht_variants,Caenorhabditis_elegans_variants',
  },
  ZFIN: {
    assembly: 'Danio_rerio',
    tracks: 'Danio_rerio_all_genes,Danio_rerio_variants',
  },
  SGD: {
    assembly: 'Saccharomyces_cerevisiae',
    tracks:
      'Saccharomyces_cerevisiae_all_genes,Saccharomyces_cerevisiae_ht_variants',
  },
  RGD: {
    assembly: 'Rattus_norvegicus',
    tracks:
      'Rattus_norvegicus_all_genes,Rattus_norvegicus_ht_variants,Rattus_norvegicus_variants',
  },
  human: {
    assembly: 'Homo_sapiens',
    tracks: 'Homo_sapiens_all_genes,Homo_sapiens_ht_variants',
  },
} as const

const taxonJBrowseConfigs = {
  'NCBITaxon:9606': speciesJBrowseConfigs.human,
  'NCBITaxon:10090': speciesJBrowseConfigs.MGI,
  'NCBITaxon:10116': speciesJBrowseConfigs.RGD,
  'NCBITaxon:8355': {
    assembly: 'Xenopus_laevis',
    tracks: 'Xenopus_laevis_all_genes',
  },
  'NCBITaxon:8364': {
    assembly: 'Xenopus_tropicalis',
    tracks: 'Xenopus_tropicalis_all_genes',
  },
  'NCBITaxon:7955': speciesJBrowseConfigs.ZFIN,
  'NCBITaxon:7227': speciesJBrowseConfigs.FlyBase,
  'NCBITaxon:6239': speciesJBrowseConfigs.WormBase,
  'NCBITaxon:559292': speciesJBrowseConfigs.SGD,
  'NCBITaxon:2697049': {
    assembly: 'SARS-CoV-2',
    tracks: 'SARS-CoV-2_all_genes',
  },
} as const

for (const [source, config] of Object.entries(speciesJBrowseConfigs)) {
  test(`builds a JBrowse 2 URL for ${source}`, () => {
    assert.equal(
      getJBrowseUrl(source, 'chr1', 100, 200),
      `/jbrowse2?tracklist=true&assembly=${config.assembly}&tracks=${config.tracks}&loc=chr1%3A100..200`,
    )
  })
}

for (const [taxonId, config] of Object.entries(taxonJBrowseConfigs)) {
  test(`builds a JBrowse 2 URL for ${taxonId}`, () => {
    assert.equal(
      getJBrowseUrl(taxonId, 'chr1', 100, 200),
      `/jbrowse2?tracklist=true&assembly=${config.assembly}&tracks=${config.tracks}&loc=chr1%3A100..200`,
    )
  })
}

test('does not create a link for an unsupported source', () => {
  assert.equal(getJBrowseUrl('unsupported', 'chr1', 100, 200), null)
})
