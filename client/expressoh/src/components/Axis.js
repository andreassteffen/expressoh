import React from 'react';
import {axisBottom, axisLeft}  from 'd3-axis';
import {select} from 'd3-selection';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    console.log('I AM HERE', this.props)
    let node  = this.refs.axis;
    let axis = null;
    if (this.props.orient === 'bottom'){
      axis = axisBottom().scale(this.props.scale);
      select(node).call(axis).selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-2em")
            .attr("dy", "-0.6em")
            .style("font-size",12)
            .attr("transform", function(d) {
                return "rotate(-90)" 
                });

    }
    else{
      axis = axisLeft().scale(this.props.scale);
      select(node).call(axis)
    }
    console.log("Axis", axis)

  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}