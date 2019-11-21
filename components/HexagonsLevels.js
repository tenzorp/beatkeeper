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

export default function HexagonsLevels(props){
	let ctx = undefined;
    let taps = [];

	function renderer(){

		ctx.save(); // save the current rendering context
        ctx.clearRect(0, 0, ctx.width, ctx.height);
		//ctx.translate(ctx.width / 2, ctx.height/2); // move the origin to the middle
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'black';
        //drawBoard(ctx, ctx.width, ctx.height);
        //drawHexagon(ctx,0,10,150);
        //drawHexagon(ctx,100,10,150);
        //
        ctx.fillStyle = "black";
        ctx.font = "bold 70pt serif";
        var width = ctx.width;
        var hexagonSideLength = width/8
        drawHexagon(ctx,0,0,hexagonSideLength);
        ctx.fillText("1",hexagonSideLength*0.5, hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*2,0,hexagonSideLength);
        ctx.fillText("2",hexagonSideLength*2.5, hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*4,0,hexagonSideLength);
        ctx.fillText("3",hexagonSideLength*4.5, hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*6,0,hexagonSideLength);
        ctx.fillText("4",hexagonSideLength*6.5, hexagonSideLength);

        drawHexagon(ctx,0,hexagonSideLength*2,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*2,hexagonSideLength*2,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*4,hexagonSideLength*2,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*6,hexagonSideLength*2,hexagonSideLength);

        drawHexagon(ctx,0,hexagonSideLength*4,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*2,hexagonSideLength*4,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*4,hexagonSideLength*4,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*6,hexagonSideLength*4,hexagonSideLength);

        drawHexagon(ctx,0,hexagonSideLength*6,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*2,hexagonSideLength*6,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*4,hexagonSideLength*6,hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*6,hexagonSideLength*6,hexagonSideLength);
        /*for(var i = 0; i < ctx.width; i++) {
            for(var j = 0; j < ctx.height; j++) {
                
                drawHexagon(ctx,i*10,j*10);
            }
        }*/
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

	const setup = async (gl) => {
		ctx = new Expo2DContext(gl);
        await ctx.initializeText();
		renderer();
	}

    function truth(){
        return true;
    }

    function touchEvent(evt){
        eventObject = {
            x: evt.nativeEvent.locationX,
            y: evt.nativeEvent.locationY,
            life: 1,
            caught: 'false',
        }

        taps.push(eventObject)
    }


	
	return (<GLView 
				style={props.style}
				onContextCreate={setup}
                onStartShouldSetResponder={truth}
                onResponderStart={touchEvent}
			/>);
}
