import React, { Component } from 'react';
import {scaleLinear,scaleBand} from "d3-scale";

import Whiskers from './Whiskers';
import XYAxis from './XYAxis';

const yScale = (props) => {
  return scaleLinear().domain([props.data.min_expression, props.data.max_expression]).range([props.height - props.padding, props.padding]);
};

const xScale = (props) => {
  console.log("Need to work on debugging", props)
  let x = scaleBand()
    .domain(props.data.tissues)
    .range([props.padding, props.width - props.padding])
  console.log(x('lung'))
  return x
};


const BoxPlot = (props) => {
  console.log("I WANT TO BE RENDERED", props);
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
           <Whiskers {...props} {...scales} />
           <XYAxis {...props} {...scales} />
          </svg>
}

export default BoxPlot;