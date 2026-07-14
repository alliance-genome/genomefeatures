import gff from '@gmod/gff'
import { TabixIndexedFile } from '@gmod/tabix'
import { RemoteFile } from 'generic-filehandle2'

import type { SimpleFeatureSerialized } from './services/types'
import type { Region } from './types'
import type { GFF3FeatureLineWithRefs } from '@gmod/gff'

function strandToNumber(strand: string | null): number {
  if (strand === '+') {
    return 1
  }
  if (strand === '-') {
    return -1
  }
  return 0
}

function firstAttr(
  attributes: GFF3FeatureLineWithRefs['attributes'],
  key: string,
): string | undefined {
  return attributes?.[key]?.[0]
}

function lineToSimpleFeature(
  line: GFF3FeatureLineWithRefs,
): SimpleFeatureSerialized {
  const id =
    firstAttr(line.attributes, 'ID') ??
    `${line.seq_id}:${line.start}..${line.end}:${line.type}`

  return {
    id,
    seqId: line.seq_id ?? '',
    fmin: (line.start ?? 1) - 1,
    fmax: line.end ?? 0,
    strand: strandToNumber(line.strand),
    type: line.type ?? '',
    source: line.source ?? '',
    name: firstAttr(line.attributes, 'Name') ?? id,
    children: line.child_features.flatMap(childFeature =>
      childFeature.map(lineToSimpleFeature),
    ),
  }
}

export async function fetchTabixGffData({
  url,
  indexUrl,
  indexType = 'TBI',
  region,
}: {
  url: string
  indexUrl?: string
  indexType?: string
  region: Region
}): Promise<SimpleFeatureSerialized[]> {
  const idx = indexUrl ?? url + (indexType === 'TBI' ? '.tbi' : '.csi')
  const store = new TabixIndexedFile({
    tbiFilehandle: indexType === 'TBI' ? new RemoteFile(idx) : undefined,
    csiFilehandle: indexType === 'CSI' ? new RemoteFile(idx) : undefined,
    filehandle: new RemoteFile(url),
  })

  const lines: string[] = []
  await store.getLines(region.chromosome, region.start, region.end, {
    lineCallback: line => {
      lines.push(line)
    },
  })

  const items = gff.parseStringSync(lines.join('\n'), {
    parseSequences: false,
    // The queried region can cut through features whose parent line falls
    // outside the window (e.g. a neighboring gene); ignore unresolved
    // Parent/Derives_from references instead of throwing.
    errorCallback: () => undefined,
  })

  return items.map(feature => lineToSimpleFeature(feature[0]))
}
