import React, { Component } from 'react';
const rectStyle = {
	fill : 'red'

}
const Whiskers = (props) => {
  console.log("ME TO BED", props)
  return(
  		<g>
  			{props.data.data.map((item,i)=><rect style={rectStyle} key={i} x={props.xScale(item.tissue)} y={props.yScale(item.median)} width={10} height={10} />)}
  		</g>
  	)
}
export default Whiskers;