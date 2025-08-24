import * as d3 from 'd3'

import {
  calculateNewTrackPosition,
  checkSpace,
  findRange,
  setHighlights,
} from '../RenderFunctions'
import {
  getJBrowseLink,
  renderTrackDescription,
} from '../services/TrackService'
import {
  generateDelinsPoint,
  generateInsertionPoint,
  generateSnvPoints,
  generateVariantDataBinsAndDataSets,
  getColorsForConsequences,
  getDeletionHeight,
  getVariantAlleles,
  getVariantDescriptions,
  getVariantSymbol,
  getVariantTrackPositions,
  calculateVariantTrackLayout,
  renderVariantDescriptions,
} from '../services/VariantService'

import type { VariantFeature } from '../services/VariantService'
import type { SimpleFeatureSerialized } from '../services/types'
import type { Selection } from 'd3'

export default class IsoformAndVariantTrack {
  private trackData: SimpleFeatureSerialized[]
  private variantData: VariantFeature[]
  private viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
  private width: number
  private variantFilter: string[]
  private isoformFilter: string[]
  private initialHighlight?: string[]
  private height: number
  private transcriptTypes: string[]
  private variantTypes: string[]
  private binRatio: number
  private showVariantLabel: boolean
  private geneBounds?: { start: number; end: number }
  private geneSymbol?: string
  private geneId?: string

  constructor({
    viewer,
    height,
    width,
    transcriptTypes,
    variantTypes,
    showVariantLabel,
    variantFilter,
    binRatio,
    isoformFilter,
    initialHighlight,
    trackData,
    variantData,
    geneBounds,
    geneSymbol,
    geneId,
  }: {
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
    height: number
    width: number
    transcriptTypes: string[]
    variantTypes: string[]
    showVariantLabel?: boolean
    variantFilter: string[]
    binRatio: number
    isoformFilter: string[]
    initialHighlight?: string[]
    trackData?: SimpleFeatureSerialized[]
    variantData?: VariantFeature[]
    geneBounds?: { start: number; end: number }
    geneSymbol?: string
    geneId?: string
  }) {
    this.trackData = trackData ?? []
    this.variantData = variantData ?? []
    this.viewer = viewer
    this.width = width
    this.variantFilter = variantFilter
    this.isoformFilter = isoformFilter
    this.initialHighlight = initialHighlight
    this.height = height
    this.transcriptTypes = transcriptTypes
    this.variantTypes = variantTypes
    this.binRatio = binRatio
    this.showVariantLabel = showVariantLabel ?? true
    this.geneBounds = geneBounds
    this.geneSymbol = geneSymbol
    this.geneId = geneId
  }

  DrawTrack() {
    
    const isoformFilter = this.isoformFilter
    let isoformData = this.trackData
    const initialHighlight = this.initialHighlight
    
    const variantData = this.filterVariantData(
      this.variantData,
      this.variantFilter,
    )
    
    
    const viewer = this.viewer
    const width = this.width
    const binRatio = this.binRatio
    
    // We'll calculate the actual number of variant tracks later based on the layout
    const distinctVariants = getVariantTrackPositions(variantData)
    let numVariantTracks = distinctVariants.length
    
    if (!this.trackData || !Array.isArray(this.trackData) || this.trackData.length === 0) {
      throw new Error('trackData must be a non-empty array')
    }
    
    const source = this.trackData[0].source
    const chr = this.trackData[0].seqId
    const MAX_ROWS = !isoformFilter || isoformFilter.length === 0 ? 9 : 30

    const UTR_feats = ['UTR', 'five_prime_UTR', 'three_prime_UTR']
    const CDS_feats = ['CDS']
    const exon_feats = ['exon']
    const display_feats = this.transcriptTypes
    const dataRange = findRange(isoformData, display_feats, this.geneBounds, this.geneSymbol, this.geneId)

    let viewStart = dataRange.fmin
    let viewEnd = dataRange.fmax
    
    // If we have gene bounds from the API, use them to constrain the view
    if (this.geneBounds) {
      // Use gene bounds without extra padding
      viewStart = this.geneBounds.start
      viewEnd = this.geneBounds.end
      
      // Include transcript features if they extend beyond gene bounds
      if (dataRange.fmin < viewStart) {
        viewStart = dataRange.fmin
      }
      if (dataRange.fmax > viewEnd) {
        viewEnd = dataRange.fmax
      }
    }

    // constants
    const EXON_HEIGHT = 10 // will be white / transparent
    const CDS_HEIGHT = 10 // will be colored in
    const ISOFORM_HEIGHT = 40 // height for each isoform
    const GENE_LABEL_HEIGHT = 20
    const MIN_WIDTH = 2
    const ISOFORM_TITLE_HEIGHT = 0 // height for each isoform
    const UTR_HEIGHT = 10 // this is the height of the isoform running all of the way through
    const VARIANT_HEIGHT = 10 // this is the height of the isoform running all of the way through
    const VARIANT_TRACK_SPACING = 5 // vertical spacing between variant tracks for better clickability
    const TRANSCRIPT_BACKBONE_HEIGHT = 4 // this is the height of the isoform running all of the way through
    const ARROW_HEIGHT = 20
    const ARROW_WIDTH = 10
    const ARROW_POINTS = `0,0 0,${ARROW_HEIGHT} ${ARROW_WIDTH},${ARROW_WIDTH}`
    const SNV_WIDTH = 10
    const VARIANT_TRACK_HEIGHT = 40 // Not sure if this needs to be dynamic or not
    const LABEL_PADDING = 22.5

    const x = d3.scaleLinear().domain([viewStart, viewEnd]).range([0, width])

    // REMOVED: Old deletionTrack - all variants now use single unified track
    const labelTrack = viewer.append('g').attr('class', 'label')

    const sortWeight = {} as Record<string, number>
    for (let i = 0, len = UTR_feats.length; i < len; i++) {
      sortWeight[UTR_feats[i]] = 200
    }
    for (let i = 0, len = CDS_feats.length; i < len; i++) {
      sortWeight[CDS_feats[i]] = 1000
    }
    for (let i = 0, len = exon_feats.length; i < len; i++) {
      sortWeight[exon_feats[i]] = 100
    }

    const geneList = {} as Record<string, string>

    // Sort by genomic position instead of alphabetically
    // This ensures genes are displayed in their natural chromosomal order
    // and prevents the primary gene from being pushed out of view by alphabetically earlier genes
    isoformData = isoformData.sort((a, b) => {
      // First priority: selected genes come first
      if (a.selected && !b.selected) {
        return -1
      }
      if (!a.selected && b.selected) {
        return 1
      }
      // Second priority: sort by genomic start position
      const aStart = a.fmin || 0
      const bStart = b.fmin || 0
      return aStart - bStart
    })

    let heightBuffer = 0

    const tooltipDiv = d3
      .select('body')
      .append('div')
      .attr('class', 'gfc-tooltip')
      .style('visibility', 'visible')
      .style('opacity', 0)

    const closeToolTip = () => {
      tooltipDiv
        .transition()
        .duration(100)
        .style('opacity', 10)
        .style('visibility', 'hidden')
    }
    // Separate isoform and variant render
    const variantBins = generateVariantDataBinsAndDataSets(
      variantData,
      (viewEnd - viewStart) * binRatio,
    )

    // Process ALL variants together through unified layout
    const allBins = [...variantBins]


    // Need to adjust for the label track being created already... but is below this track.
    const variantTrackAdjust = calculateNewTrackPosition(this.viewer)
    
    // Check if we have no variant data and add a message if needed
    // Only show message for species that are expected to have variants (not human or SGD)
    const hasNoVariants = !variantData || variantData.length === 0
    const isHumanOrSGD = source === 'human' || source === 'SGD'
    
    if (hasNoVariants && !isHumanOrSGD) {
      // Add a message about missing variant data only for species expected to have variants
      // Position it where the variant track would normally appear
      const variantMessageTrack = viewer
        .append('g')
        .attr('class', 'variant-message track')
        .attr('transform', `translate(0,${variantTrackAdjust})`)
      
      variantMessageTrack
        .append('text')
        .attr('x', 10)
        .attr('y', 15)
        .attr('fill', '#d9534f')
        .attr('opacity', 0.8)
        .attr('font-size', '12px')
        .text('No variant data available for this region. Please contact help@alliancegenome.org if this is unexpected.')
    }
    const variantContainer = viewer
      .append('g')
      .attr('class', 'variants track')
      .attr('transform', `translate(0,${variantTrackAdjust})`)

    // Calculate variant layout with overlap detection
    // Convert pixel positions to base positions for overlap detection
    const variantBinsWithPixelPositions = allBins.map(v => ({
      ...v,
      pixelFmin: x(v.fmin),
      pixelFmax: x(v.fmax)
    }))
    
    // Use pixel buffer to detect overlaps (15 pixels should be enough for click separation)
    const variantLayout = calculateVariantTrackLayout(variantBinsWithPixelPositions, 15)
    

    // Calculate the actual number of variant tracks needed
    let maxVariantRow = 0
    variantLayout.forEach(item => {
      if (item.row > maxVariantRow) {
        maxVariantRow = item.row
      }
    })
    // Update the number of variant tracks
    numVariantTracks = Math.max(maxVariantRow + 1, 1)
    

    // Create a map for quick lookup of row positions
    const variantRowMap = new Map()
    variantLayout.forEach(item => {
      const key = `${item.variant.fmin}-${item.type.toLowerCase()}`
      variantRowMap.set(key, item.row)
    })
    

    // Create separate groups for each row to ensure proper event isolation
    // Create from bottom to top so higher rows naturally render on top
    const rowGroups: d3.Selection<SVGGElement, unknown, HTMLElement | null, undefined>[] = []
    for (let i = 0; i < numVariantTracks; i++) {
      const rowGroup = variantContainer.append('g')
        .attr('class', `variant-row-${i}`)
        .attr('transform', `translate(0,${i * (VARIANT_HEIGHT + VARIANT_TRACK_SPACING)})`)
        .style('pointer-events', 'all')
        .style('isolation', 'isolate')  // CSS isolation to prevent event bubbling issues
      rowGroups.push(rowGroup)
    }
    
    // Reorder the groups so row 0 (visually on top) is last in DOM order (on top for events)
    // Reverse order so row 0 is on top for event handling
    for (let i = rowGroups.length - 1; i >= 0; i--) {
      rowGroups[i].raise()  // This moves each group to the end, starting from the last
    }
    
    // Sort variants by row ASCENDING so row 0 (visually on top) renders last (on top for events)
    const sortedBins = [...allBins].sort((a, b) => {
      const aType = a.type.toLowerCase()
      const bType = b.type.toLowerCase()
      const aKey = `${a.fmin}-${aType === 'snv' || aType === 'point_mutation' ? 'snv' : 
                     aType === 'insertion' ? 'insertion' :
                     aType === 'deletion' ? 'deletion' : 'delins'}`
      const bKey = `${b.fmin}-${bType === 'snv' || bType === 'point_mutation' ? 'snv' : 
                     bType === 'insertion' ? 'insertion' :
                     bType === 'deletion' ? 'deletion' : 'delins'}`
      const aRow = variantRowMap.get(aKey) || 0
      const bRow = variantRowMap.get(bKey) || 0
      // Sort ascending: Row 0 renders last so it's on top for events (matching visual hierarchy)
      return aRow - bRow
    })

    sortedBins.forEach((variant, variantIndex) => {
      const { type, fmax, fmin } = variant
      let drawnVariant = true
      let isPoints = false
      const viewerWidth = this.width
      const symbol_string = getVariantSymbol(variant)
      const descriptions = getVariantDescriptions(variant)
      const variant_alleles = getVariantAlleles(variant)
      const descriptionHtml = renderVariantDescriptions(descriptions)
      const consequenceColor = getColorsForConsequences(descriptions)[0]
      if (
        type.toLowerCase() === 'snv' ||
        type.toLowerCase() === 'point_mutation'
      ) {
        isPoints = true
        // Get the calculated row for this variant
        const variantRow = variantRowMap.get(`${fmin}-snv`) || 0
        
        // Use the row group instead of individual transform
        const targetGroup = rowGroups[variantRow] || variantContainer
        targetGroup
          .append('polygon')
          .attr('class', 'variant-SNV')
          .attr('id', `variant-${fmin}`)
          .attr('points', generateSnvPoints(x(fmin)))
          .attr('fill', consequenceColor)
          .attr('x', x(fmin))
          .attr('z-index', 30)
          .on('click', () => {
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', function (event) {
            const d = d3.select(this).datum() as any
            if (!d) return
            
            // Highlight this specific variant
            d3.select(this).style('stroke', 'black')
            
            // Show label for this variant
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .filter((labelData: any) => labelData && labelData.variant === d.variant)
              .style('opacity', 1)
              .style('pointer-events', 'auto')  // Enable pointer events when visible
              .raise()
          })
          .on('mouseout', function () {
            const d = d3.select(this).datum() as any
            if (!d || d.selected !== 'true') {
              d3.select(this).style('stroke', null)
            }
            
            // Hide all labels
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
              .style('pointer-events', 'none')  // Disable pointer events when hidden
          })
          .datum({
            fmin: fmin,
            fmax: fmax,
            variant: symbol_string + fmin,
            alleles: variant_alleles,
          })
      } else if (type.toLowerCase() === 'insertion') {
        isPoints = true
        // Get the calculated row for this variant
        const variantRow = variantRowMap.get(`${fmin}-insertion`) || 0
        const targetGroup = rowGroups[variantRow] || variantContainer
        targetGroup
          .append('polygon')
          .attr('class', 'variant-insertion')
          .attr('id', `variant-${fmin}`)
          .attr('points', generateInsertionPoint(x(fmin)))
          .attr('fill', consequenceColor)
          .attr('x', x(fmin))
          .attr('z-index', 30)
          .on('click', () => {
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', function(event) {
            const d = d3.select(this).datum() as any
            if (!d) return
            
            // Highlight this specific variant
            d3.select(this).style('stroke', 'black')
            
            // Show label for this variant
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .filter((labelData: any) => labelData && labelData.variant === d.variant)
              .style('opacity', 1)
              .style('pointer-events', 'auto')  // Enable pointer events when visible
              .raise()
          })
          .on('mouseout', function() {
            const d = d3.select(this).datum() as any
            if (!d || d.selected !== 'true') {
              d3.select(this).style('stroke', null)
            }
            
            // Hide all labels
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
              .style('pointer-events', 'none')  // Disable pointer events when hidden
          })
          .datum({
            fmin: fmin,
            fmax: fmax,
            variant: symbol_string + fmin,
            alleles: variant_alleles,
          })
      } else if (
        type.toLowerCase() === 'delins' ||
        type.toLowerCase() === 'substitution' ||
        type.toLowerCase() === 'indel' ||
        type.toLowerCase() === 'mnv'
      ) {
        isPoints = true
        // Get the calculated row for this variant
        const variantRow = variantRowMap.get(`${fmin}-delins`) || 0
        const targetGroup = rowGroups[variantRow] || variantContainer
        targetGroup
          .append('polygon')
          .attr('class', 'variant-delins')
          .attr('id', `variant-${fmin}`)
          .attr('points', generateDelinsPoint(x(fmin)))
          .attr('x', x(fmin))
          .attr('fill', consequenceColor)
          .attr('z-index', 30)
          .on('click', () => {
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', function(event) {
            const d = d3.select(this).datum() as any
            if (!d) return
            
            // Highlight this specific variant
            d3.select(this).style('stroke', 'black')
            
            // Show label for this variant
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .filter((labelData: any) => labelData && labelData.variant === d.variant)
              .style('opacity', 1)
              .style('pointer-events', 'auto')  // Enable pointer events when visible
              .raise()
          })
          .on('mouseout', function() {
            const d = d3.select(this).datum() as any
            if (!d || d.selected !== 'true') {
              d3.select(this).style('stroke', null)
            }
            
            // Hide all labels
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
              .style('pointer-events', 'none')  // Disable pointer events when hidden
          })
          .datum({
            fmin: fmin,
            fmax: fmax,
            variant: symbol_string + fmin,
            alleles: variant_alleles,
          })
      } else if (type.toLowerCase() === 'deletion') {
        // Handle deletions
        const variantRow = variantRowMap.get(`${fmin}-deletion`) || 0
        const width = Math.max(Math.ceil(x(fmax) - x(fmin)), 5) // Minimum width of 5px for visibility
        const variantDatum = {
          fmin: fmin,
          fmax: fmax,
          variant: symbol_string + fmin,
          alleles: variant_alleles,
          selected: false
        }
        
        
        // Use the row group for proper isolation
        const targetGroup = rowGroups[variantRow] || variantContainer
        const deletionRect = targetGroup
          .append('rect')
          .attr('class', 'variant-deletion')
          .attr('id', `variant-${fmin}`)
          .attr('x', x(fmin))
          .attr('y', 0)  // Y is 0 because row group handles vertical position
          .attr('width', width)
          .attr('height', VARIANT_HEIGHT) // Use full height like other variants
          // NO TRANSFORM - row group handles the vertical positioning
          .attr('fill', consequenceColor)
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')  // Show it's interactive
          .on('click', () => {
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', function(event) {
            const d = d3.select(this).datum() as any
            if (!d) return
            
            // Highlight this specific deletion rectangle
            d3.select(this)
              .style('stroke', 'black')
            
            // Show label for this variant
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .filter((labelData: any) => labelData && labelData.variant === d.variant)
              .style('opacity', 1)
              .style('pointer-events', 'auto')  // Enable pointer events when visible
              .raise()
          })
          .on('mouseout', function() {
            const d = d3.select(this).datum() as any
            if (!d || d.selected !== 'true') {
              d3.select(this)
                .style('stroke', null)
            }
            
            // Hide all labels
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
              .style('pointer-events', 'none')  // Disable pointer events when hidden
          })
          .datum(variantDatum)
      } else {
        drawnVariant = false
      }

      if (drawnVariant) {
        // Calculate initial position with offset to the right of the variant
        // For deletions, position label after the deletion ends
        const isDeletion = type.toLowerCase() === 'deletion'
        const variantXPos = isDeletion ? x(fmax) : x(fmin)
        const labelOffsetFromVariant = isPoints ? 15 : 10
        let label_offset = variantXPos + labelOffsetFromVariant
        
        // Get the row for this variant to calculate correct label height
        const variantType = type.toLowerCase()
        let labelVariantRow = 0
        if (variantType === 'deletion') {
          labelVariantRow = variantRowMap.get(`${fmin}-deletion`) || 0
        } else if (variantType === 'snv' || variantType === 'point_mutation') {
          labelVariantRow = variantRowMap.get(`${fmin}-snv`) || 0
        } else if (variantType === 'insertion') {
          labelVariantRow = variantRowMap.get(`${fmin}-insertion`) || 0
        } else if (variantType === 'delins' || variantType === 'substitution' || variantType === 'indel' || variantType === 'mnv') {
          labelVariantRow = variantRowMap.get(`${fmin}-delins`) || 0
        }

        // Calculate label height based on the variant's row
        const label_height = (VARIANT_HEIGHT + VARIANT_TRACK_SPACING) * labelVariantRow + LABEL_PADDING
        
        
        const variant_label = labelTrack
          .append('text')
          .attr('class', 'variantLabel')
          .attr('fill', 'black')
          .attr('opacity', 0)
          .attr('height', ISOFORM_TITLE_HEIGHT)
          .attr('transform', `translate(${label_offset},${label_height})`)
          // if html, it cuts off the <sup> tag
          .text(symbol_string)
          .style('pointer-events', 'none')  // Labels should not capture events when invisible
          .datum({ fmin: fmin, variant: symbol_string + fmin })

        const symbol_string_width = variant_label.node()?.getBBox().width ?? 0
        // If label would go off the right edge, position it to the left
        if (label_offset + symbol_string_width > viewerWidth - 5) {
          // For deletions, position to the left of the deletion START, not END
          const leftPositionBase = isDeletion ? x(fmin) : variantXPos
          label_offset = leftPositionBase - symbol_string_width - labelOffsetFromVariant
          variant_label.attr('transform', `translate(${label_offset},${label_height})`)
        }
      }
    })

    // reposition labels after height is determined.
    const labelTrackPosition = variantTrackAdjust
    labelTrack.attr('transform', `translate(0,${labelTrackPosition})`)
    
    // Ensure label track is always above variants for proper mouseover visibility
    labelTrack.raise()

    // Calculate where this track should go and translate it, must be after the variant labels are added
    const newTrackPosition =
      calculateNewTrackPosition(this.viewer) + LABEL_PADDING
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    let row_count = 0
    const used_space = [] as string[][]
    let fmin_display = -1
    let fmax_display = -1

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const renderTooltipDescription = this.renderTooltipDescription

    const alreadyRendered = [] as string[] // hack fix for multiple transcript returns.
    for (let i = 0; i < isoformData.length && row_count < MAX_ROWS; i++) {
      const feature = isoformData[i]
      let featureChildren = feature.children
      if (featureChildren) {
        const selected = feature.selected

        // May want to remove this and add an external sort function
        // outside of the render method to put certain features on top.
        // Sort transcripts by name
        featureChildren = featureChildren.sort((a, b) => {
          const aName = a.name || ''
          const bName = b.name || ''
          return aName.localeCompare(bName)
        })

        // For each isoform..
        let warningRendered = false
        featureChildren.forEach(featureChild => {
          if (
            isoformFilter &&
            isoformFilter.length !== 0 &&
            !(
              isoformFilter.includes(featureChild.id) ||
              isoformFilter.includes(featureChild.name)
            )
          ) {
            return
          }
          
          // Filter out transcripts that span beyond both gene boundaries
          // These create ugly gray bars without showing useful information
          if (this.geneBounds) {
            const startsBeforeGene = featureChild.fmin < this.geneBounds.start
            const endsAfterGene = featureChild.fmax > this.geneBounds.end
            
            if (startsBeforeGene && endsAfterGene) {
              return // Skip rendering this transcript
            }
          }

          if (alreadyRendered.includes(featureChild.id)) {
            return
          } else {
            alreadyRendered.push(featureChild.id)
          }
          //
          const featureType = featureChild.type

          if (display_feats.includes(featureType)) {
            // function to assign row based on available space.
            // *** DANGER EDGE CASE ***/
            let current_row = checkSpace(
              used_space,
              x(featureChild.fmin),
              x(featureChild.fmax),
            )
            if (row_count < MAX_ROWS) {
              // An isoform container
              let text_string = ''
              let text_label
              let addingGeneLabel = false
              const featName = feature.name
              if (!Object.keys(geneList).includes(featName)) {
                heightBuffer += GENE_LABEL_HEIGHT
                addingGeneLabel = true
                geneList[featName] = 'Green'
              }

              const isoform = track
                .append('g')
                .attr('class', 'isoform')
                .attr(
                  'transform',
                  `translate(0,${row_count * ISOFORM_HEIGHT + 10 + heightBuffer})`,
                )
              if (addingGeneLabel) {
                text_string = featName
                text_label = isoform
                  .append('text')
                  .attr('class', 'geneLabel')
                  .attr('fill', selected ? 'sandybrown' : 'black')
                  .attr('height', ISOFORM_TITLE_HEIGHT)
                  .attr(
                    'transform',
                    `translate(${x(featureChild.fmin)},-${GENE_LABEL_HEIGHT})`,
                  )
                  .text(text_string)
                  .on('click', () => {
                    renderTooltipDescription(
                      tooltipDiv,
                      renderTrackDescription(feature),
                      closeToolTip,
                    )
                  })
                  .datum({
                    fmin: featureChild.fmin,
                  })
              }

              isoform
                .append('polygon')
                .datum(() => ({
                  fmin: featureChild.fmin,
                  fmax: featureChild.fmax,
                  strand: feature.strand,
                }))
                .attr('class', 'transArrow')
                .attr('points', ARROW_POINTS)
                .attr('transform', d =>
                  feature.strand > 0
                    ? `translate(${Number(x(d.fmax))},0)`
                    : `translate(${Number(x(d.fmin))},${ARROW_HEIGHT}) rotate(180)`,
                )
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })

              const transcriptX = x(featureChild.fmin)
              const transcriptWidth = x(featureChild.fmax) - x(featureChild.fmin)
              
              isoform
                .append('rect')
                .attr('class', 'transcriptBackbone')
                .attr('y', 10 + ISOFORM_TITLE_HEIGHT)
                .attr('height', TRANSCRIPT_BACKBONE_HEIGHT)
                .attr('transform', `translate(${transcriptX},0)`)
                .attr('width', transcriptWidth)
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })
                .datum({
                  fmin: featureChild.fmin,
                  fmax: featureChild.fmax,
                })
              
              text_string = featureChild.name || ''
              
              text_label = isoform
                .append('text')
                .attr('class', 'transcriptLabel')
                .attr('fill', selected ? 'sandybrown' : 'gray')
                .attr('opacity', selected ? 1 : 0.5)
                .attr('height', ISOFORM_TITLE_HEIGHT)
                .attr('transform', `translate(${x(featureChild.fmin)},0)`)
                .text(text_string)
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })
                .datum({
                  fmin: featureChild.fmin,
                })

              // Now that the label has been created we can calculate the space
              // that this new element is taking up making sure to add in the
              // width of the box.
              // TODO: this is just an estimate of the length
              let text_width = text_string.length * 2

              // not some instances (as in reactjs?) the bounding box isn't
              // available, so we have to guess
              try {
                text_width = text_label.node()?.getBBox().width ?? 0
              } catch (e) {
                // Bounding box not yet available
              }
              // First check to see if label goes past the end
              if (Number(text_width + x(featureChild.fmin)) > width) {
                // Label extends beyond viewer width
              }
              const feat_end =
                text_width > x(featureChild.fmax) - x(featureChild.fmin)
                  ? x(featureChild.fmin) + text_width
                  : x(featureChild.fmax)

              // This is probably not the most efficient way to do this. Making
              // an 2d array... each row is the first array (no zer0) next
              // level is each element taking up space. Also using colons
              // as spacers seems very perl... maybe change that?
              // *** DANGER EDGE CASE ***/
              if (used_space[current_row]) {
                const temp = used_space[current_row]
                temp.push(`${x(featureChild.fmin)}:${feat_end}`)
                used_space[current_row] = temp
              } else {
                used_space[current_row] = [
                  `${x(featureChild.fmin)}:${feat_end}`,
                ]
              }

              // Now check on bounds since this feature is displayed
              // The true end of display is converted to bp.
              if (fmin_display < 0 || fmin_display > featureChild.fmin) {
                fmin_display = featureChild.fmin
              }
              if (fmax_display < 0 || fmax_display < featureChild.fmax) {
                fmax_display = featureChild.fmax
              }

              // have to sort this so we draw the exons BEFORE the CDS
              if (featureChild.children) {
                featureChild.children = featureChild.children.sort((a, b) => {
                  const sortAValue = sortWeight[a.type]
                  const sortBValue = sortWeight[b.type]

                  if (
                    typeof sortAValue === 'number' &&
                    typeof sortBValue === 'number'
                  ) {
                    return sortAValue - sortBValue
                  }
                  if (
                    typeof sortAValue === 'number' &&
                    typeof sortBValue !== 'number'
                  ) {
                    return -1
                  }
                  if (
                    typeof sortAValue !== 'number' &&
                    typeof sortBValue === 'number'
                  ) {
                    return 1
                  }
                  // NOTE: type not found and weighted
                  const aType = a.type || ''
                  const bType = b.type || ''
                  return aType.localeCompare(bType)
                })

                featureChild.children.forEach(innerChild => {
                  const innerType = innerChild.type

                  if (exon_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'exon')
                      .attr('x', x(innerChild.fmin))
                      .attr(
                        'transform',
                        `translate(0,${EXON_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT})`,
                      )
                      .attr('height', EXON_HEIGHT)
                      .attr('z-index', 10)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                      .datum({ fmin: innerChild.fmin, fmax: innerChild.fmax })
                  } else if (CDS_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'CDS')
                      .attr('x', x(innerChild.fmin))
                      .attr(
                        'transform',
                        `translate(0,${CDS_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT})`,
                      )
                      .attr('z-index', 20)
                      .attr('height', CDS_HEIGHT)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                      .datum({ fmin: innerChild.fmin, fmax: innerChild.fmax })
                  } else if (UTR_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'UTR')
                      .attr('x', x(innerChild.fmin))
                      .attr(
                        'transform',
                        `translate(0,${UTR_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT})`,
                      )
                      .attr('z-index', 20)
                      .attr('height', UTR_HEIGHT)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                      .datum({ fmin: innerChild.fmin, fmax: innerChild.fmax })
                  }
                })
              }
              row_count += 1
            }
            if (row_count === MAX_ROWS && !warningRendered) {
              // *** DANGER EDGE CASE ***/
              const link = getJBrowseLink(source, chr, viewStart, viewEnd)
              ++current_row
              warningRendered = true
              track
                .append('a')
                .attr('class', 'transcriptLabel')
                .attr('xlink:show', 'new')
                .append('text')
                .attr('x', 10)
                .attr('y', 10)
                .attr(
                  'transform',
                  `translate(0,${row_count * ISOFORM_HEIGHT + 20 + heightBuffer})`,
                )
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('height', ISOFORM_TITLE_HEIGHT)
                .html(link)
            }
          }
        })
      }
    }
    if (initialHighlight) {
      setHighlights(initialHighlight, viewer)
    }

    if (row_count === 0) {
      track
        .append('text')
        .attr('x', 30)
        .attr('y', ISOFORM_TITLE_HEIGHT + 10)
        .attr('fill', 'orange')
        .attr('opacity', 0.6)
        .text(
          'Overview of non-coding genome features unavailable at this time.',
        )
    }
    // Calculate total variant track height dynamically based on actual tracks used
    const totalVariantHeight = numVariantTracks * (VARIANT_HEIGHT + VARIANT_TRACK_SPACING) + LABEL_PADDING
    // we return the appropriate height function
    return row_count * ISOFORM_HEIGHT + heightBuffer + totalVariantHeight
  }

  filterVariantData(variantData: VariantFeature[], variantFilter: string[]) {
    
    if (!variantFilter || variantFilter.length === 0) {
      return variantData
    }
    
    if (!variantData || !Array.isArray(variantData)) {
      return []
    }
    
    return variantData.filter(v => {
      let returnVal = false
      
      if (
        variantFilter.includes(v.name) ||
        (v.allele_symbols?.values &&
          variantFilter.includes(
            v.allele_symbols.values[0].replace(/"/g, ''),
          )) ||
        (v.symbol?.values &&
          variantFilter.includes(v.symbol.values[0].replace(/"/g, ''))) ||
        (v.symbol_text?.values &&
          variantFilter.includes(v.symbol_text.values[0].replace(/"/g, '')))
      ) {
        returnVal = true
      }
      const ids =
        v.allele_ids?.values[0]?.replace(/"|\[|\]| /g, '').split(',') ?? []
      ids.forEach(id => {
        if (variantFilter.includes(id)) {
          returnVal = true
        }
      })
      
      return returnVal
    })
  }

  renderTooltipDescription(
    tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, undefined>,
    descriptionHtml: string,
    closeFunction: () => void,
  ): void {
    tooltipDiv
      .transition()
      .duration(200)
      .style('width', 'auto')
      .style('max-width', '700px')
      .style('height', 'auto')
      .style('overflow-wrap', 'break-word')
      .style('word-break', 'break-all')
      .style('opacity', 1)
      .style('visibility', 'visible')

    tooltipDiv
      .html(descriptionHtml)
      // @ts-expect-error
      .style('left', `${window.event!.pageX + 10}px`)
      // @ts-expect-error
      .style('top', `${window.event!.pageY + 10}px`)
      .append('button')
      .attr('type', 'button')
      .text('Close')
      .on('click', () => {
        closeFunction()
      })

    tooltipDiv
      .append('button')
      .attr('type', 'button')
      .html('&times;')
      .attr('class', 'tooltipDivX')
      .on('click', () => {
        closeFunction()
      })
  }

  setInitialHighlight(
    selectedAlleles: string[],
    svgTarget: Selection<SVGGElement, unknown, null, undefined>,
  ): void {
    const viewer_height = svgTarget.node()?.getBBox().height ?? 0

    // This code needs to be simplified and put in another function
    const highlights = svgTarget
      .selectAll<SVGGElement, VariantFeature>(
        '.variant-deletion,.variant-SNV,.variant-insertion,.variant-delins',
      )
      .filter(d => {
        let returnVal = false
        if (d.alleles) {
          const ids = d.alleles[0].replace(/"|\[|\]| /g, '').split(',')
          ids.forEach(val => {
            if (selectedAlleles.includes(val)) {
              returnVal = true
            }
          })
          d.alleles.forEach(val => {
            if (selectedAlleles.includes(val)) {
              returnVal = true
            }
          })
        }
        return returnVal
      })
      .datum((d: SimpleFeatureSerialized) => {
        d.selected = 'true'
        return d
      })
      .style('stroke', 'black')

    highlights.each(function () {
      const width_val = +(d3.select(this).attr('width') || 3)
      const x_val = +d3.select(this).attr('x') - width_val / 2
      svgTarget
        .select('.deletions.track')
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
}
