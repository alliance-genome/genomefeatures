import type { SimpleFeatureSerialized } from './types'

function renderStrand(strand: number) {
  if (strand === 1) {
    return '+'
  }
  if (strand === -1) {
    return '-'
  }
  return strand
}

export function renderTrackDescription(feature: SimpleFeatureSerialized) {
  let returnString = ''
  returnString += `<table class="tooltip-table" style="margin-top: 30px;"><tbody>`
  returnString += !feature.id.includes('http')
    ? `<tr><th>Name</th><td>${feature.name} (${feature.id})</td></tr>`
    : `<tr><th>Name</th><td>${feature.name}</td></tr>`
  returnString += `<tr><th>Type</th><td>${feature.type}</td></tr>`
  returnString += `<tr><th>Source</th><td>${feature.source}</td></tr>`

  returnString += `<tr><th>Location</th><td>${feature.seqId}:${feature.fmin}..${feature.fmax} (${renderStrand(feature.strand)})</td></tr>`

  returnString += '</tbody></table>'
  return returnString
}

const jBrowseConfigs: Partial<
  Record<string, { assembly: string; trackSuffixes: string[] }>
> = {
  FlyBase: {
    assembly: 'Drosophila_melanogaster',
    trackSuffixes: [
      '_all_genes',
      '_ht_variants',
      '_variants',
      '_multiple-variant_alleles',
    ],
  },
  MGI: {
    assembly: 'Mus_musculus',
    trackSuffixes: [
      '_all_genes',
      '_ht_variants',
      '_variants',
      '_multiple-variant_alleles',
    ],
  },
  WormBase: {
    assembly: 'Caenorhabditis_elegans',
    trackSuffixes: ['_all_genes', '_ht_variants', '_variants'],
  },
  ZFIN: {
    assembly: 'Danio_rerio',
    trackSuffixes: ['_all_genes', '_variants'],
  },
  SGD: {
    assembly: 'Saccharomyces_cerevisiae',
    trackSuffixes: ['_all_genes', '_ht_variants'],
  },
  RGD: {
    assembly: 'Rattus_norvegicus',
    trackSuffixes: ['_all_genes', '_ht_variants', '_variants'],
  },
  human: {
    assembly: 'Homo_sapiens',
    trackSuffixes: ['_all_genes', '_ht_variants'],
  },
}

export function getJBrowseUrl(
  source: string,
  chr: string,
  start: number,
  end: number,
) {
  const config = jBrowseConfigs[source]
  if (!config) {
    console.warn('no source found', source)
    return null
  }
  const tracks = config.trackSuffixes
    .map(trackSuffix => `${config.assembly}${trackSuffix}`)
    .join(',')
  const loc = encodeURIComponent(`${chr}:${start}..${end}`)
  return `/jbrowse2?tracklist=true&assembly=${config.assembly}&tracks=${tracks}&loc=${loc}`
}
