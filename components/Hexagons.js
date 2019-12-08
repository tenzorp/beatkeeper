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

function drawHexagonFill(ctx, x, y, sideLength) {
  hexHeight = Math.sin(hexagonAngle) * sideLength;
  hexRadius = Math.cos(hexagonAngle) * sideLength;
  hexRectangleHeight = sideLength + 2 * hexHeight;
  hexRectangleWidth = 2 * hexRadius;
    	ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(x + hexRadius, y);
  ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
  ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
  ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
  ctx.lineTo(x, y + sideLength + hexHeight);
  ctx.lineTo(x, y + hexHeight);
  ctx.lineTo(x + hexRadius, y);
  ctx.fill();
}

export default function Hexagons(props) {
  let ctx;

  function renderer() {
    ctx.save(); // save the current rendering context
    // ctx.translate(ctx.width / 2, ctx.height/2); // move the origin to the middle
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'white';
    drawHexagon(ctx, -100, 10, 150);
    drawHexagon(ctx, ctx.width - 200, 10, 50);
    drawHexagon(ctx, ctx.width - 100, 50, 20);
    drawHexagon(ctx, ctx.width - 250, 120, 100);
    drawHexagon(ctx, ctx.width - 50, 175, 70);
    drawHexagon(ctx, ctx.width - 120, 300, 40);
    drawHexagon(ctx, ctx.width + 50, 100, 65);
    drawHexagon(ctx, ctx.width - 50, 100, 30);
    drawHexagonFill(ctx, (ctx.width / 2 - (Math.cos(0.523598776) * 200)), ctx.height - 200, 200);
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
