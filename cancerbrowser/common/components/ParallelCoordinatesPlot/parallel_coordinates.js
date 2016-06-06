import d3 from 'd3';
import _ from 'lodash';

class ParallelCoordinates {
  /**
   * Constructor. Sets up container location and scales for visual.
   *
   * @param {Object} container Container DOM element. Expected to be a table.
   */
  constructor(container) {
    this.svg = d3.select(container)
     .append('svg')
     .classed('parallel-coordinates', true);

    this.g = this.svg.append('g');

    this.margins = {
      left: 50,
      right: 50,
      top: 25,
      bottom: 10
    };

    this.xAxisGroup = this.g.append('g')
      .attr('transform', 'translate(0,-10)')
      .classed('x axis', true);

    this.yAxisGroup = this.g.append('g')
      .attr('transform', 'translate(0,0)')
      .classed('y axis', true);

    this.referenceLinesGroup = this.g.append('g')
      .classed('reference-lines', true);

    this.linesGroup = this.g.append('g')
      .classed('lines-group', true);

  }

  /**
   *
   */
  updateScales(dataset, props) {
    const { dataExtent, colorScale } = props;

    // scales recomputed each draw
    const xScale = d3.scale.ordinal()
      .domain(d3.range(props.pointLabels.length))
      .rangePoints([0, this.width]);


    const yScale = d3.scale.linear()
      .range([0, this.height]);

    if(dataExtent) {
      yScale.domain(dataExtent);
    } else {
      yScale.domain(d3.extent(_.flatten(dataset.map(d => d.values))));
    }

    return { x: xScale, y: yScale, color: colorScale };
  }

  /**
   *
   */
  update(props) {
    const { dataset, pointLabels, width, height } = props;

    // Early out
    if(!dataset) {
      return;
    }

    this.width = width - (this.margins.left + this.margins.right);
    this.height = height - (this.margins.top + this.margins.bottom);

    this.svg
      .attr('width', this.width + (this.margins.left + this.margins.right))
      .attr('height', this.height + (this.margins.top + this.margins.bottom));

    this.g
      .attr('transform', `translate(${this.margins.left},${this.margins.top})`);

    const transitionDuration = 300;

    const scales = this.updateScales(dataset, props);
    const line = d3.svg.line()
      .x((d, i) => scales.x(i))
      .y(d => scales.y(d));

    const xAxis = d3.svg.axis()
      .scale(scales.x)
      .orient('top')
      .tickFormat(d => pointLabels[d])
      .tickSize(-20);

    this.xAxisGroup
      .call(xAxis);

    const yAxis = d3.svg.axis()
      .scale(scales.y)
      .orient('left')
      .ticks(10);

    this.yAxisGroup
      .call(yAxis);


    // draw additional axis lines
    const refLines = this.referenceLinesGroup.selectAll('.y-reference-line')
      .data(pointLabels.slice(0));

    refLines.enter()
      .append('line')
      .classed('y-reference-line reference-line', true)
      .attr('y1', 0)
      .attr('y2', this.height);

    refLines
      .attr('x1', (d, i) => scales.x(i))
      .attr('x2', (d, i) => scales.x(i));

    // draw the lines
    const lines = this.linesGroup.selectAll('.series')
      .data(dataset, d => d.id);

    // ENTER lines
    lines.enter()
      .append('path')
      .classed('series', true)
      .attr('d', d => line(d.values));

    // UPDATE lines
    lines
      .transition()
      .duration(transitionDuration)
      .attr('d', d => line(d.values));

    // EXIT lines
    lines.exit().remove();
  }

  /**
  * Subscribe to an event from this component
  * @param  {String}   name     Name of event. select|highlight|unhighlight
  * @param  {Function} callback
  */
  on(name, callback) {
    this.dispatch.on(name, callback);
  }

  /**
  * Function to handle resizing on window change
  */
  handleResize() {
    this.updateScales();
    this.render();
  }
}

export default ParallelCoordinates;
