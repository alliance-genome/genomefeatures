import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Worm example (tabix GFF3)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

const vcfTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/worm-latest.vcf.gz'
const gffTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/docker/9.1.0/WormBase/c_elegans_PRJNA13758/GFF_WB.sorted.gff.gz'

export const WormGff1: StoryObj<StaticArgs> = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    gffTabixUrl,
  } satisfies StaticArgs,
}
