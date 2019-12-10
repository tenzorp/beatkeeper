import React from 'react';
import { GLView } from 'expo-gl';
import Expo2DContext from 'expo-2d-context';

let hexHeight;
let hexRadius;
let hexRectangleHeight;
let hexRectangleWidth;
const hexagonAngle = 0.523598776;


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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Hexagons(props) {
  let ctx;

  function renderer() {
    ctx.save(); // save the current rendering context
    // ctx.translate(ctx.width / 2, ctx.height/2); // move the origin to the middle
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

    for (var i = 0;i < 30;i++){
      drawHexagon(ctx, randomIntFromInterval(0, ctx.width), randomIntFromInterval(0, 300), randomIntFromInterval(10, 100));
    }
    
    
    //drawHexagonFill(ctx, (ctx.width / 2 - (Math.cos(0.523598776) * 200)), ctx.height - 200, 200);
    ctx.flush();
    ctx.restore(); // restore to previous state
  }

  function setup(gl) {
    ctx = new Expo2DContext(gl);
    renderer();
  }


  return (
    <GLView
      style={props.style}
      onContextCreate={setup}
    />
  );
}
