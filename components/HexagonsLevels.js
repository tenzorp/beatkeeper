import React, { useCallback, useState } from 'react';
import { GLView } from 'expo-gl';
import Expo2DContext from 'expo-2d-context';
import { PixelRatio } from 'react-native';
import { withNavigation } from 'react-navigation';

var hexHeight,
	hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776,
    levels = [],
    chosen = false

function drawHexagon(ctx, x, y, sideLength, level,truth) {  
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    ctx.lineWidth = 5;
    if (levels.length >= level){
        //console.log(truth);
        if (truth){
            //console.log("red");
            ctx.strokeStyle = 'red'; 
            ctx.lineWidth = 10;
            ctx.fillStyle = 'red';
        }
        else {
            //console.log("black");
            ctx.strokeStyle = 'black'; 
            ctx.fillStyle = 'black';
            ctx.lineWidth = 5;
        }
        ctx.beginPath();
        ctx.moveTo(x + hexRadius, y);
        ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
        ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
        ctx.lineTo(x, y + sideLength + hexHeight);
        ctx.lineTo(x, y + hexHeight);
        ctx.lineTo(x + hexRadius, y);
        ctx.stroke();
        ctx.fillText(level.toString(),sideLength*0.6, sideLength*1.1);
    }

    else {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
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
}

export default function HexagonsLevels(props){
	let ctx = undefined;
    let taps = [];
    const ratio = PixelRatio.get();

    const that = this;

	function renderer(){

		ctx.save(); // save the current rendering context
        ctx.clearRect(0, 0, ctx.width, ctx.height);
		//ctx.translate(ctx.width / 2, ctx.height/2); // move the origin to the middle
        //drawBoard(ctx, ctx.width, ctx.height);
        //drawHexagon(ctx,0,10,150);
        //drawHexagon(ctx,100,10,150);
        //
        ctx.fillStyle = "black";
        ctx.font = "bold 90pt serif";
        var width = ctx.width;
        var hexagonSideLength = width/8;

        if (levels.length < 1){
            var level1 = {x: hexagonSideLength, y: hexagonSideLength, radius: 30}
            levels.push(level1)
        }

        for (var index = 0; index < taps.length; index++) { 
            var record = taps[index];
            if ((record.x-levels[0].x <= hexagonSideLength) && (record.y-levels[0].y <= hexagonSideLength)){
                //This is where the navigation to gameplay should go, but navigation isn't working
                var chosen = true; 
                
            }
        }
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';

        drawHexagon(ctx,0,0,hexagonSideLength,1,chosen);

        drawHexagon(ctx,hexagonSideLength*2,0,hexagonSideLength,2);
        //ctx.fillText("2",hexagonSideLength*2.5, hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*4,0,hexagonSideLength,3);
        //ctx.fillText("3",hexagonSideLength*4.5, hexagonSideLength);
        drawHexagon(ctx,hexagonSideLength*6,0,hexagonSideLength,4);
        //ctx.fillText("4",hexagonSideLength*6.5, hexagonSideLength);

        drawHexagon(ctx,0,hexagonSideLength*2,hexagonSideLength,5);
        drawHexagon(ctx,hexagonSideLength*2,hexagonSideLength*2,hexagonSideLength,6);
        drawHexagon(ctx,hexagonSideLength*4,hexagonSideLength*2,hexagonSideLength,7);
        drawHexagon(ctx,hexagonSideLength*6,hexagonSideLength*2,hexagonSideLength,8);

        drawHexagon(ctx,0,hexagonSideLength*4,hexagonSideLength,9);
        drawHexagon(ctx,hexagonSideLength*2,hexagonSideLength*4,hexagonSideLength,10);
        drawHexagon(ctx,hexagonSideLength*4,hexagonSideLength*4,hexagonSideLength,11);
        drawHexagon(ctx,hexagonSideLength*6,hexagonSideLength*4,hexagonSideLength,12);

        drawHexagon(ctx,0,hexagonSideLength*6,hexagonSideLength,13);
        drawHexagon(ctx,hexagonSideLength*2,hexagonSideLength*6,hexagonSideLength,14);
        drawHexagon(ctx,hexagonSideLength*4,hexagonSideLength*6,hexagonSideLength,15);
        drawHexagon(ctx,hexagonSideLength*6,hexagonSideLength*6,hexagonSideLength,16);

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
            x: evt.nativeEvent.locationX*ratio,
            y: evt.nativeEvent.locationY*ratio,
            life: 1,
            caught: 'false',
        };

        taps.push(eventObject);
        renderer();
    }

    function updateTaps(ctx) {
        ctx.strokeStyle = 'black';
        for (var index = 0; index < taps.length; index++) { 
            var record = taps[index];

            ctx.clearRect(0, 0, ctx.width, ctx.height);
            ctx.beginPath();
            ctx.arc(record.x, record.y,30,0,2*Math.PI);
            ctx.stroke()
        }
    }


	
	return (<GLView 
				style={props.style}
				onContextCreate={setup}
                onStartShouldSetResponder={truth}
                onResponderStart={touchEvent}
			/>);
}

HexagonsLevels.navigationOptions = {
    title: 'Hexagons',
    header: null
};
