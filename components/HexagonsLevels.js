import React, { useCallback, useState } from 'react';
import { GLView } from 'expo-gl';
import Expo2DContext from 'expo-2d-context';

var hexHeight,
	hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776

    hexHeight = Math.sin(hexagonAngle) * 20;
    hexRadius = Math.cos(hexagonAngle) * 20;
    hexRectangleHeight = 20 + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;  


function drawHexagon(ctx, x, y) {  
        ctx.beginPath();
        ctx.moveTo(x + hexRadius, y);
        ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
        ctx.lineTo(x + hexRectangleWidth, y + hexHeight + 20);
        ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
        ctx.lineTo(x, y + 20 + hexHeight);
        ctx.lineTo(x, y + hexHeight);
        ctx.lineTo(x + hexRadius, y);
        ctx.stroke();
}

export default function HexagonsLevels(props){
	let ctx = undefined;

	function renderer(){
		ctx.save(); // save the current rendering context
        ctx.clearRect(0, 0, ctx.width, ctx.height);
		//ctx.translate(ctx.width / 2, ctx.height/2); // move the origin to the middle
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
        //drawBoard(ctx, ctx.width, ctx.height);
        //drawHexagon(ctx,0,10,150);
        //drawHexagon(ctx,100,10,150);
        drawHexagon(ctx,200,10,150);
        console.log("ehloo");
        for(var i = 0; i < ctx.width; i++) {
            for(var j = 0; j < ctx.height; j++) {
                
                drawHexagon(ctx,i*10,j*10);
            }
        }
        //drawHexagon(ctx,(i * hexRectangleWidth + ((j % 2) * hexRadius)),(j * (20 + hexHeight)));
        /*var i,
            j;
        for(i = 0; i < ctx.width; i++) {
            for(j = 0; j < ctx.height; j++) {
                drawHexagon(ctx,(i * hexRectangleWidth + ((j % 2) * hexRadius)),(j * (20 + hexHeight)));
            }
        }*/
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
