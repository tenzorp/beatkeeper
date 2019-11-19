import React, { useCallback, useState } from 'react';
import { GLView } from 'expo-gl';
import Expo2DContext from 'expo-2d-context';

var hexHeight,
	hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776


function drawHexagon(ctx, x, y, sideLength) {  
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;  

        ctx.beginPath();
        ctx.moveTo(x + hexRadius, y);
        ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
        ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
        ctx.lineTo(x, y + sideLength + hexHeight);
        ctx.lineTo(x, y + hexHeight);
        ctx.lineTo(x + hexRadius, y);
        ctx.stroke();
}

export default function Hexagons(props){
	let ctx = undefined;

	function renderer(){
		ctx.save(); // save the current rendering context
		//ctx.translate(ctx.width / 2, ctx.height/2); // move the origin to the middle
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
		drawHexagon(ctx,-100,100,200);
		drawHexagon(ctx,ctx.width-200,100,50);
		drawHexagon(ctx,ctx.width-100,175,20);
		drawHexagon(ctx,ctx.width-250,225,100);
		drawHexagon(ctx,ctx.width-50,300,70);
		drawHexagon(ctx,ctx.width-120,400,40);
		drawHexagon(ctx,ctx.width+50,300,65);
		drawHexagon(ctx,ctx.width-50,225,30);
		ctx.flush()
		ctx.restore(); // restore to previous state
	}

	function setup(gl){
		ctx = new Expo2DContext(gl);
		renderer();
	}


	
	return (<GLView 
				style={props.style}
				onContextCreate={setup}
			/>);
}
