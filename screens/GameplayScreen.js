import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import GameEngine from '../components/GameEngine';
import { AntDesign, Foundation } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import {Audio} from 'expo-av';
import { set } from 'gl-matrix/src/gl-matrix/vec2';


export default function GameplayScreen(props) {
  const [modal, setModal] = useState(false);
  const [play, setPlay] = useState("play");
  const [reset, setReset] = useState(false);
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);
  var test = true;

  useFirestoreConnect([
    {
      collection: 'overallStats',
      where: [
        ['uid', '==', auth.uid],
      ],
    },
  ]);

  Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    staysActiveInBackground: false

  })  

  /*useFirestoreConnect([
    { collection: 'games',
      where:[
        ['uid', '==', auth.uid]
      ] }
  ]);*/

  const soundObject = new Audio.Sound();


  
  //console.log(songName);
  async function playSong() {

    const level = props.navigation.getParam('level');
    //const songName = props.navigation.getParam('song');
    
    console.log(level);
      //const soundObject = new Audio.Sound();
    if (level === 1){ 
      try {
        await soundObject.loadAsync(require('./../songs/easybeat1.mp3'));
        await soundObject.playAsync();
      }  catch (error) {
        console.log("error0");
      }
    }

    if (level === 2){ 
      try {
        await soundObject.loadAsync(require('./../songs/mediumbeat.mp3'));
        await soundObject.playAsync();
      }  catch (error) {
        console.log("error0");
      }
    }

    if (level === 3){ 
      try {
        await soundObject.loadAsync(require('./../songs/hardbeat.mp3'));
        await soundObject.playAsync();
      }  catch (error) {
        console.log("error0");
      }
    }

  }

    async function pauseSong() {
        soundObject.pauseAsync();

    }; 

    /*async function unPauseSong() {
      try {
        soundObject.playAsync();
        console.log("unpause")
      }  catch (error) {
        console.log("error4");
      }
      
    }; */

    async function stopSong() {
      soundObject.stopAsync();

    }; 

  if (play === "play"){

    playSong();

  }; 

  if (play == "unpause"){
    unPauseSong();

  }

  if (play === "pause") {
    
    pauseSong();

  }


  if (play === "stop") {
    stopSong();
  }
  


  callbackFunction = (childData) => {
      var data = childData;
      setPlay("stop");
      //stopSong();
      if (test == true){
        //console.log(data)
        props.navigation.navigate('Feedback', { level: props.navigation.getParam('level'), numTaps: data[0],numCorrectTaps: data[1],precision:(data[1]/data[0])*100,earlyTaps:data[2],lateTaps:data[3]});
        test = false;
      }
  }


  return (
    <View style={styles.container}>
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>PAUSED</Text>
          <TouchableOpacity>
            <Text style={styles.text} 
                  onPress={() => {setModal(!modal);
                                  setPlay("play");
                                  }}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text} onPress={() => setReset(!reset)}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text} onPress={() => props.navigation.navigate('Home')}>Main Menu</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> {props.navigation.navigate('Levels')
            console.log("levels")}} />
        </TouchableOpacity>
        <TouchableOpacity>
          { !modal && <Foundation 
                          name={'pause'} 
                          size={50} color={'#FFFFFF'}  
                          onPress={()=> {
                            setModal(!modal);
                            setPlay("pause");
                            pauseSong();
                          }} /> }
          { modal && <Foundation 
                        name={'play'} 
                        size={50} color={'#FFFFFF'}  
                        onPress={()=> {
                          setModal(!modal)
                          }} /> }
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.text}>Level {props.navigation.getParam('level')}</Text>
        <Text style={styles.text2}>Tap on the screen when the circles match!</Text>
      </View>
      <GameEngine 
        style={styles.hexagons}
        parentCallback = {this.callbackFunction}
        speed = {props.navigation.getParam('speed')}
        duration = {props.navigation.getParam('duration')}
        paused={!modal}
        reset={reset}
        setReset={() => {setReset(false); setModal(false);}}
      />
    </View>
  );
}


GameplayScreen.navigationOptions = {
  title: 'Gameplay',
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%'
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  hexagons: {
    flex: 8,
    width: '100%',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#FFE632',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 20
  },
  modalTitle: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10
  },
  modalText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10
  }
});
