import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Human example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/9.0.0/human/tracks/All_Genes/{refseq}/trackData.jsonz'

export const NF1IsoformOnly: StoryObj<StaticArgs> = {
  args: {
    locString: '17:31094927..31382116',
    genome: 'human',
    type: TRACK_TYPE.ISOFORM,
    geneBounds: {
      start: 31094927,
      end: 31382116,
    },
    geneSymbol: 'NF1',
    geneId: 'HGNC:7765',
    ncListUrlTemplate,
  } satisfies StaticArgs,
}

export const A2MIsoformOnly: StoryObj<StaticArgs> = {
  args: {
    locString: '12:9067664..9116229',
    genome: 'human',
    type: TRACK_TYPE.ISOFORM,
    geneBounds: {
      start: 9067664,
      end: 9116229,
    },
    geneSymbol: 'A2M',
    geneId: 'HGNC:7',
    ncListUrlTemplate,
  } satisfies StaticArgs,
}
