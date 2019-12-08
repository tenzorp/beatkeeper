import React, { useCallback, useState } from 'react';
import { GLView } from 'expo-gl';
import Expo2DContext from 'expo-2d-context';
import { PixelRatio } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';
import { useFirestore } from 'react-redux-firebase';

let hexHeight;
let hexRadius;
let hexRectangleHeight;
let hexRectangleWidth;
const hexagonAngle = 0.523598776;
const levels = [];
const chosen = false;
let counter = 500000;

function drawHexagon(ctx, x, y, sideLength, truth) {
  hexHeight = Math.sin(hexagonAngle) * sideLength;
  hexRadius = Math.cos(hexagonAngle) * sideLength;
  hexRectangleHeight = sideLength + 2 * hexHeight;
  hexRectangleWidth = 2 * hexRadius;

  if (truth) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 20;
    counter += 1;
  } else if (counter < 450000) {
    ctx.strokeStyle = 'lightblue';
    ctx.lineWidth = 10;
  } else {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 15;
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
  ctx.lineWidth = 3;
}

const updateHex = (hexagons, ctx) => {
  for (i = 0; i < hexagons.length; i++) {
    let hexagon = hexagons[i];
    if (hexagon.radius < ctx.width / 2.5) {
      hexagon.radius *= 1.04;
      hexagon.alpha *= 1.04;
    } else {
      hexagon.radius = 0;
      hexagon.alpha = 0;
      hexagon = {
        x: ctx.width / 5,
        y: ctx.height / 3,
        radius: 5,
        alpha: 0.1,
      };
      hexagons[i] = hexagon;
    }

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = `rgb(0, 0, 0, ${hexagon.alpha})`;
    // console.log(chosen);
    drawHexagon(ctx, hexagon.x, hexagon.y, hexagon.radius);
    ctx.stroke();
  }
};

export default function HexagonsGameplay(props) {
  const firestore = useFirestore();

  const hexagons = [];
  let ctx;
  let taps = [];
  const ratio = PixelRatio.get();

  useFocusEffect(useCallback(() => {
    if (ctx) {
      requestAnimationFrame(renderer);
    }
    focus = true;
    return () => focus = false;
  }));


  function renderer() {
    // console.log("here")
    ctx.save(); // save the current rendering context
    // console.log("there")
    ctx.clearRect(0, 0, ctx.width, ctx.height);

    ctx.fillStyle = 'black';

    ctx.font = 'bold 90pt serif';
    const { width } = ctx;
    const hexagonSideLength = width / 2.5;

    for (let index = 0; index < taps.length; index++) {
      const record = taps[index];
      if ((record.x - ctx.width / 2 <= hexagonSideLength) && (record.y - ctx.height / 1.5 <= hexagonSideLength)) {
        // This is where the navigation to gameplay should go, but navigation isn't working
        var chosen = true;
        const counter = 0;
        taps = [];
      }
    }
    // console.log(counter.toString());
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';

    drawHexagon(ctx, ctx.width / 5, ctx.height / 3, hexagonSideLength, chosen);
    updateHex(hexagons, ctx);
    // drawChangingHexagon(ctx, ctx.width/5, ctx.height/2, hexagonSideLength)
    // console.log(hexagons);
    ctx.restore(); // restore to previous state
    ctx.flush();

    // I think we need something here

    if (focus) {
      requestAnimationFrame(renderer);
    }
  }

  /* const createNewGame = () => ({
        level: randValue(ghostTypes),
        age: Math.floor(Math.random() * 200 + 1),
        captured: Date.now()
    }); */

  const setup = async (gl) => {
    ctx = new Expo2DContext(gl);
    for (i = 0; i < 5; i++) {
      const hexagon = {
        x: ctx.width / 5,
        y: ctx.height / 3,
        radius: 5,
        alpha: 0.1,
      };
      hexagons.push(hexagon);
    }
    await ctx.initializeText();
    // firestore.add({ collection: 'games' }, createNewGame())
    renderer();
  };

  function truth() {
    return true;
  }

  function touchEvent(evt) {
    eventObject = {
      x: evt.nativeEvent.locationX * ratio,
      y: evt.nativeEvent.locationY * ratio,
      life: 1,
      caught: 'false',
    };

    taps.push(eventObject);
    renderer();
  }

  function updateTaps(ctx) {
    ctx.strokeStyle = 'black';
    for (let index = 0; index < taps.length; index++) {
      const record = taps[index];

      ctx.clearRect(0, 0, ctx.width, ctx.height);
      ctx.beginPath();
      ctx.arc(record.x, record.y, 30, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }


  return (
    <GLView
      style={props.style}
      onContextCreate={setup}
      onStartShouldSetResponder={truth}
      onResponderStart={touchEvent}
    />
  );
}
