import React, { Component } from 'react';

const rectStyle = {
	fill : 'red'
}

const Whiskers = (props) => {
  const bandwidth = props.xScale.bandwidth()-10;
  const epsilon = props.xScale.bandwidth()/2;
  return(
  		<g>
  			{props.data.data.map((item,i)=>{
  				let xpos = props.xScale(item.tissue)+2;
  				if (item.sub_tissue==="cancer")
  					xpos+=epsilon;
  				return(
  					<g>
  						<rect style={rectStyle} key={i} x={xpos} y={props.yScale(item.median)} width={bandwidth/2} height={10} />


  					</g>
  				)}
  				)}
  		</g>
  	)
}
export default Whiskers;