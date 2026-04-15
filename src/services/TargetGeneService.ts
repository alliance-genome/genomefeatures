import type { SimpleFeatureSerialized } from './types'

type TargetGeneFeature = SimpleFeatureSerialized & {
  alias?: string[]
  curie?: string
  gene_id?: string
}

function normalizeValue(value?: string) {
  return value?.toLowerCase()
}

function normalizeValues(values?: string[]) {
  return values?.map(value => value.toLowerCase())
}

function valueMatchesTarget(value: string | undefined, target: string | undefined) {
  return Boolean(value && target && value.includes(target))
}

export function featureMatchesTargetGene(
  feature: TargetGeneFeature,
  geneSymbol?: string,
  geneId?: string,
) {
  if (!geneSymbol && !geneId) {
    return true
  }

  const normalizedGeneSymbol = normalizeValue(geneSymbol)
  const normalizedGeneId = normalizeValue(geneId)
  const normalizedName = normalizeValue(feature.name)
  const normalizedId = normalizeValue(feature.id)
  const normalizedCurie = normalizeValue(feature.curie)
  const normalizedFeatureGeneId = normalizeValue(feature.gene_id)
  const normalizedAliases = normalizeValues(feature.alias)

  const matchesSymbol = Boolean(
    normalizedGeneSymbol &&
      (valueMatchesTarget(normalizedName, normalizedGeneSymbol) ||
        normalizedAliases?.some(alias => valueMatchesTarget(alias, normalizedGeneSymbol))),
  )

  const matchesId = Boolean(
    normalizedGeneId &&
      (valueMatchesTarget(normalizedName, normalizedGeneId) ||
        valueMatchesTarget(normalizedId, normalizedGeneId) ||
        valueMatchesTarget(normalizedFeatureGeneId, normalizedGeneId) ||
        valueMatchesTarget(normalizedCurie, normalizedGeneId) ||
        normalizedAliases?.some(alias => valueMatchesTarget(alias, normalizedGeneId))),
  )

  return matchesSymbol || matchesId
}

export function filterTrackDataForTargetGene(
  data: SimpleFeatureSerialized[],
  geneSymbol?: string,
  geneId?: string,
) {
  if (!geneSymbol && !geneId) {
    return data
  }

  const targetGenes = data.filter(feature =>
    featureMatchesTargetGene(feature as TargetGeneFeature, geneSymbol, geneId),
  )

  return targetGenes.length > 0 ? targetGenes : data
}
