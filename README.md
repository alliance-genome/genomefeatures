# genomefeatures

[![npm package][npm-badge]][npm]

[![Build Status](https://img.shields.io/github/actions/workflow/status/GMOD/genomefeatures/push.yml?branch=main)](https://github.com/GMOD/genomefeatures/actions?query=branch%3Amain+workflow%3APush+)

[npm-badge]: https://img.shields.io/npm/v/genomefeatures.png?style=flat-square
[npm]: https://www.npmjs.com/package/genomefeatures

# Screenshot

![Example 1](images/ExampleIsoform1.png)

## Demo

Demo https://gmod.org/genomefeatures/

Storybook https://gmod.org/genomefeatures/storybook

# Instructions

Install from NPM

```bash
yarn add genomefeatures
```

Or see see [example/index.html](example/index.html) for CDN import style usage,
e.g.

## Loading data

### Static access pattern - Accessing JBrowse NCList files, tabix-indexed GFF3 files, and VCF tabix files

In the old days, this component required a WebApollo aka Apollo 2 server running
to work (see [LEGACY.md](LEGACY.md)) but after the refactor, we can now fetch
files from static files like JBrowse 1 NCList files, tabix-indexed GFF3 files,
and VCF tabix files. This means you do not need a complex apollo deployment to
use this component: just some static files

```typescript
import {
  fetchNCListData,
  fetchTabixVcfData,
  parseLocString,
  GenomeFeatureViewer,
} from 'genomefeatures'

// if your bundler let's you import CSS, you can do this, otherwise see CDN usage example
import 'genomefeatures/style.css'

const locString = '2L:130639..135911'
const genome = 'fly'

const vcfTabixUrl =
  'https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/fly-latest.vcf.gz'
const ncListUrlTemplate =
  'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/FlyBase/fruitfly/tracks/All_Genes/{refseq}/trackData.jsonz'

const region = parseLocString(locString)
const trackData = await fetchNCListData({
  region,
  urlTemplate: ncListUrlTemplate,
})

const variantData = await fetchTabixVcfData({
  url: vcfTabixUrl,
  region,
})

const gfc = new GenomeFeatureViewer(
  {
    region,
    genome,
    tracks: [
      {
        type: 'ISOFORM_EMBEDDED_VARIANT',
        trackData,
        variantData,
      },
    ],
  },
  `#svgelement`,
  900,
  500,
)
```

And then in your HTML

```html
<svg id="svgelement"></svg>
```

### Fetching gene/transcript features from a tabix-indexed GFF3 file

As an alternative to NCList, `trackData` can also be fetched directly from a
bgzipped, tabix-indexed GFF3 file (`.gff3.gz` + `.gff3.gz.tbi`, or a `.csi`
index) using `fetchTabixGffData`. This uses
[`@gmod/tabix`](https://github.com/GMOD/tabix-js) and
[`@gmod/gff`](https://github.com/GMOD/gff-js) under the hood to query the
region and parse the matching lines into the same `SimpleFeatureSerialized`
shape as `fetchNCListData`, so it can be used as a drop-in replacement:

```typescript
import { fetchTabixGffData, parseLocString } from 'genomefeatures'

const region = parseLocString('V:7106..57424')

const trackData = await fetchTabixGffData({
  url: 'https://s3.amazonaws.com/agrjbrowse/docker/9.1.0/WormBase/c_elegans_PRJNA13758/GFF_WB.sorted.gff.gz',
  region,
  // optional: defaults to `${url}.tbi`; pass indexType: 'CSI' for a .csi index
  // indexUrl: 'https://.../GFF_WB.sorted.gff.gz.tbi',
})
```

## Developers

```bash
git clone git@github.com:GMOD/genomefeatures
yarn dev # vite demo
yarn storybook # storybook examples
```

## Notes

Originally called https://github.com/GMOD/GenomeFeatureComponent

Created by Nathan Dunn (@nathandunn), used by Alliance of Genome Resources

Updated in 2025 by Colin Diesh (@cmdcolin) to add ability to fetch from static
files

See also https://github.com/GMOD/react-genomefeatures
