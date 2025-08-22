import * as d3 from 'd3-selection'

import { SimpleFeatureSerialized } from './services/types'

// Takes in the current entry start/end and the array of used space and assigns a row
export function checkSpace(used_space: string[][], start: number, end: number) {
  let row = 0
  let assigned
  let fits
  // if empty, this is the first entry, on the first row.
  if (used_space.length == 0) {
    row = 1
  } else {
    // for each row
    for (let i = 1; i < used_space.length; i++) {
      // for each entry in that row
      for (const elt of used_space[i]) {
        const [used_start, used_end] = elt.split(':')

        // check for overlap
        if (end < +used_start || start > +used_end) {
          fits = 1
        } else {
          fits = 0
          break
        }
      }
      if (fits) {
        assigned = 1
        row = i
        break
      }
    }
    // if this is true for 0 rows... use the next row.
    // zero indexed so length is the next one.
    if (!assigned) {
      row = used_space.length
    }
  }
  return row
}

// Function to find range
// Now with checkSpace function embedded.
// Will only check rows that make it into the final viz.
// Needs to assign the row as well
// Added check for type.... all types were getting included even if
// we had no intention to display them
export function findRange(
  data: SimpleFeatureSerialized[],
  display_feats: unknown[],
  geneBounds?: { start: number; end: number },
  geneSymbol?: string,
  geneId?: string,
) {
  let fmin = -1
  let fmax = -1
  const extremeFeatures: {name: string, type: string, fmin: number, fmax: number}[] = []
  
  // If no gene filtering is provided, process all data (this is the case for allele pages)
  // The allele page already has filtered data specific to the gene
  if (!geneSymbol && !geneId) {
    // Process all features in the data
    for (const feature of data) {
      const featureChildren = feature.children
      if (featureChildren) {
        featureChildren.forEach(featureChild => {
          if (display_feats.includes(featureChild.type)) {
            // Update fmin if we find something earlier
            if (fmin < 0 || featureChild.fmin < fmin) {
              fmin = featureChild.fmin
            }
            
            // Update fmax if we find something later
            if (fmax < 0 || featureChild.fmax > fmax) {
              fmax = featureChild.fmax
            }
          }
        })
      }
    }
    
    return { fmin, fmax }
  }
  
  // We'll only consider features from the target gene
  const targetGenes: SimpleFeatureSerialized[] = []
  
  // Find genes that match our gene identifier
  for (const feature of data) {
    // Check if this top-level feature (gene) matches our target gene
    // Gene names might include the symbol (e.g., "Pax6") or ID (e.g., "MGI:97490")
    const geneMatches = 
      (geneSymbol && feature.name?.toLowerCase().includes(geneSymbol.toLowerCase())) ||
      (geneId && (feature.name?.includes(geneId) || feature.id?.includes(geneId)))
    
    if (geneMatches) {
      targetGenes.push(feature)
    }
  }
  
  // Check if we found any matching genes
  if (targetGenes.length === 0) {
    // Fall back to processing all data if no matches found
    for (const feature of data) {
      const featureChildren = feature.children
      if (featureChildren) {
        featureChildren.forEach(featureChild => {
          if (display_feats.includes(featureChild.type)) {
            // Update fmin if we find something earlier
            if (fmin < 0 || featureChild.fmin < fmin) {
              fmin = featureChild.fmin
            }
            
            // Update fmax if we find something later  
            if (fmax < 0 || featureChild.fmax > fmax) {
              fmax = featureChild.fmax
            }
          }
        })
      }
    }
    
    return { fmin, fmax }
  }

  // Now only process children of target genes
  for (const feature of targetGenes) {
    const featureChildren = feature.children
    if (featureChildren) {
      featureChildren.forEach(featureChild => {
        if (display_feats.includes(featureChild.type)) {
          
          // Filter out transcripts that start before and end after the target gene bounds
          // These create ugly gray bars that span the entire view without showing useful boundaries
          if (geneBounds) {
            const startsBeforeGene = featureChild.fmin < geneBounds.start
            const endsAfterGene = featureChild.fmax > geneBounds.end
            
            if (startsBeforeGene && endsAfterGene) {
              return // Skip this transcript
            }
          }
          
          // Update fmin if we find something earlier
          if (fmin < 0 || featureChild.fmin < fmin) {
            fmin = featureChild.fmin
          }
          
          // Update fmax if we find something later
          if (fmax < 0 || featureChild.fmax > fmax) {
            fmax = featureChild.fmax
            extremeFeatures.push({
              name: featureChild.name || 'unnamed',
              type: featureChild.type,
              fmin: featureChild.fmin,
              fmax: featureChild.fmax
            })
          }
        }
      }) // transcript level
    } // gene level
  }

  return {
    fmin: fmin,
    fmax: fmax,
  }
}

export function calculateNewTrackPosition(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>,
): number {
  const viewerClass = viewer.attr('class')
  const classNames = viewerClass.split(' ')
  const viewTrackSelector = `.${classNames[0]}.${classNames[1]} .track`
  const nodes = d3.selectAll<SVGElement, unknown>(viewTrackSelector).nodes()
  let usedHeight = 0

  nodes.forEach((node: SVGElement) => {
    usedHeight += node.getBoundingClientRect().height + 1
  })

  return usedHeight
}

export function getTranslate(transform: string): [number, number] {
  // Create a dummy g for calculation purposes only. This will never
  // be appended to the DOM and will be discarded once this function
  // returns.
  const g: SVGGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'g',
  )

  // Set the transform attribute to the provided string value.
  g.setAttributeNS(null, 'transform', transform)

  // consolidate the SVGTransformList containing all transformations
  // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
  // its SVGMatrix.
  const matrix = g.transform.baseVal.consolidate()?.matrix
  return matrix ? [matrix.e, matrix.f] : [0, 0]
}

interface VariantData {
  alleles?: string[]
  selected?: string
}

export function setHighlights(
  selectedAlleles: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svgTarget: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>,
) {
  const viewer_height = svgTarget.node()?.getBBox().height ?? 0
  const highlights = svgTarget
    .selectAll<SVGElement, VariantData>(
      '.variant-deletion,.variant-SNV,.variant-insertion,.variant-delins',
    )
    .filter((d: VariantData) => {
      let returnVal = false

      if (d.alleles?.length) {
        // Handle comma-separated string case
        const ids = d.alleles[0].replace(/"|\[|\]| /g, '').split(',')
        ids.forEach((val: string) => {
          if (selectedAlleles.includes(val)) {
            returnVal = true
          }
        })

        // Handle array case
        d.alleles.forEach((val: string) => {
          if (selectedAlleles.includes(val)) {
            returnVal = true
          }
        })
      }

      return returnVal
    })
    .datum((d: VariantData) => {
      d.selected = 'true'
      return d
    })
    .style('stroke', 'black')

  highlights.each(function (this: SVGElement) {
    let x_val = d3.select<SVGElement, unknown>(this).attr('x')
    let width_val = +d3.select<SVGElement, unknown>(this).attr('width')

    if (width_val === 0 || Number.isNaN(width_val)) {
      width_val = 3
      x_val = String(+x_val - width_val / 2)
    }

    // Find the variants track, or append directly to svgTarget if not found
    const variantsTrack = svgTarget.select('.variants.track')
    const targetElement = variantsTrack.empty() ? svgTarget : variantsTrack
    
    targetElement
      .append('rect')
      .attr('class', 'highlight')
      .attr('x', x_val)
      .attr('width', width_val)
      .attr('height', viewer_height)
      .attr('fill', 'yellow')
      .attr('opacity', 0.8)
      .lower()
  })
}
