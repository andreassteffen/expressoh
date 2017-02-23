import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';

const setStyle = function(color){
	return {
		fill : color,
        stroke :'black',
        strokeWidth: 1
	}
}

const lineStyle = function(){
    return {
        stroke: 'black',
        strokeWidth: '1'
    }
}
const Whiskers = (props) => {
  const bandwidth = props.xScale.bandwidth()-10;
  const epsilon = props.xScale.bandwidth()/2;
  return(
  		<g>
  			{props.data.data.map((item,i)=>{
  				let xpos = props.xScale(item.tissue)+2;
  				let color = 'blue';
  				if (item.sub_tissue==="cancer") {
  					color = 'red';
                    xpos += epsilon;

                }

  				return(
  					<g key={uuidV4()}>
                        <line style={lineStyle()}  key={uuidV4()} x1={xpos - 2 + bandwidth/4} x2={xpos + 2 + bandwidth/4} y1={props.yScale(item.high)} y2={props.yScale(item.high)}  />
                        <line style={lineStyle()}  key={uuidV4()} x1={xpos - 2 + bandwidth/4} x2={xpos + 2 + bandwidth/4} y1={props.yScale(item.low)} y2={props.yScale(item.low)}  />
                        <line style={lineStyle()}  key={uuidV4()} x1={xpos+ bandwidth/4} x2={xpos + bandwidth/4} y1={props.yScale(item.high)} y2={props.yScale(item.low)}  />
  						<rect style={setStyle(color)} key={uuidV4()} x={xpos} y={props.yScale(item.close)} width={bandwidth/2} height={props.yScale(item.open)-props.yScale(item.close)} />
                        <line style={lineStyle()} key={uuidV4()} x1={xpos} x2={xpos + bandwidth/2} y1={props.yScale(item.median)} y2={props.yScale(item.median)}  />
  					</g>
  				)}
  				)}
  		</g>
  	)
}
export default Whiskers;