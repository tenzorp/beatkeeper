import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, Dimensions, View } from "react-native";
import { GameLoop } from "react-native-game-engine";
import { useFocusEffect } from 'react-navigation-hooks';

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;
const baseState = {
  x: WIDTH / 2 - RADIUS,
  y: HEIGHT / 2 - RADIUS,
  size: RADIUS*12,
  growing: false,
  running: true,
  startTime: 0,
  color: 'white',
  width: 2,
  showRed: false,
  counter: 0,
  numTaps: 0,
  correctTaps: 0,
};

export default class GameEngine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: WIDTH / 2 - RADIUS,
      y: HEIGHT / 2 - RADIUS,
      size: RADIUS*12,
      growing: false,
      running: this.props.paused,
      startTime: 0,
      color: 'white',
      width: 2,
      showRed: false,
      counter: 0,
      numTaps: 0,
      correctTaps: 0,
    };
    this.gameEngine = null;
  }

  sendData = () => {
    var data = [this.state.numTaps, this.state.correctTaps]
    this.props.parentCallback(data);
  }


  onEvent = (e) => {
    if (e.type === "game-over"){
      this.setState({
          running: false
      });
    }
  };

  updateHandler = ({ touches, screen, time }) => {
    if (this.props.paused !== this.state.running) {
      this.setState({running: this.props.paused});
    }

    if (this.props.reset) {
      this.props.setReset(false);
      this.setState(baseState);
    }

    if (this.state.startTime == 0){
      this.setState({
          startTime: time.current,
          running: true,
        });
    }

    if (time.current > (this.state.startTime + 10000)){
      //this.gameEngine.dispatch({ type: "game-over"});
      this.setState({
        running: false,
      });
      this.sendData();
    }
    if (this.state.running == true){

    let move = touches.find(x => x.type === "press");
    //console.log(time.current)
    if (move) {
      this.setState({
        numTaps: this.state.numTaps + 1,
      })
      if (this.state.showRed == false){
        if (this.state.size > (RADIUS*12 - 50)){

          this.setState({
          color: 'blue',
          width: 10,
          showRed: true,
          correctTaps: this.state.correctTaps + 1,
        });
        }
          else {
            this.setState({
              color: 'red',
              width: 10,
              showRed: true,
            });
          }
      }
        
    }

      // if time.current is somewhere close to the time we calculat for the song.
      // add some value to the precision, and then return it

    else {
      this.setState({
        counter: this.state.counter + 16,
      })

      if (this.state.counter >= 750){
        this.setState({
          color: 'white',
          width: 2,
          showRed: false,
          counter: 0,
        });
      }
    }
    
    if (this.state.growing){
      if (this.state.size >= RADIUS*12){
        this.setState({
          growing: false,
        })
      }
      else {
        this.setState({
          size: this.state.size + this.props.dataFromParent,
        })
      }
      
    }

    else {
      if (this.state.size <= 1){
        this.setState({
          growing: true,
        })
      }
      else {
        this.setState({
          size: this.state.size - this.props.dataFromParent,
        })
      }
    }
    }
    
  };

  render() {
    //console.log(WIDTH)
    //console.log(HEIGHT)
    return (
      <GameLoop 
        style={styles.container}
        onUpdate={this.updateHandler}
        running={this.state.running}
        onEvent={this.onEvent}>

        <View style={styles.circle} />
        <View style={[styles.circle, {borderRadius: this.state.size, width:this.state.size, height:this.state.size}]} />
        <View style={[styles.circle, {borderColor: this.state.color, borderWidth: this.state.width}]} />


      </GameLoop>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: "#FFE632",
    borderColor: "#000000",
    width: '100%',
  },
  circle: {
    position: 'absolute',
    width: RADIUS * 12,
    height: RADIUS * 12,
    borderRadius: RADIUS * 12,
    borderWidth: 2,
    borderColor: 'white',
    left: WIDTH / 2 - (RADIUS*6),
    top: HEIGHT / 2 - (RADIUS*12),
  }
});

AppRegistry.registerComponent("GameEngine", () => GameEngine);