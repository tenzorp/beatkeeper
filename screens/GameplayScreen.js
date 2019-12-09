import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState,useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import HexagonsGameplay from '../components/HexagonsGameplay';
import GameEngine from '../components/GameEngine';
import { AntDesign, Foundation } from '@expo/vector-icons';
import Modal from 'react-native-modal';


export default function GameplayScreen(props) {
  // console.log(props.navigation.getParam('level'))
  const [modal, setModal] = useState(false);
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

  /*useFirestoreConnect([
    { collection: 'games',
      where:[
        ['uid', '==', auth.uid]
      ] }
  ]);*/

  //const userStats = useSelector(state => state.firestore.ordered.overallStats);
  //const gameStats = useSelector(state => state.firestore.ordered.games);

  /*
  }*/
  //console.log(data)

  //<HexagonsGameplay style={styles.hexagons} />
  
  callbackFunction = (childData) => {
      var data = childData;
      if (test == true){
        props.navigation.navigate('Feedback', { level: props.navigation.getParam('level'), numTaps: data[0],numCorrectTaps: data[1],precision:(data[1]/data[0])*100 });
        test = false;
      }
      //this.setState({message: childData})
      //console.log("hello")
      //console.log(childData)
      //console.log(props.navigation)
      //console.log("callback")
      //console.log(data);
      
      //console.log(props.navigation)
  }

  /*useEffect(() => {
    console.log(data);
    props.navigation.navigate('Feedback', { level: props.navigation.getParam('level'), numTaps: data[0],numCorrectTaps: data[1],precision:(data[1]/data[0])*100 });
  },[data])*/


  return (
    <View style={styles.container}>
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>PAUSED</Text>
          <TouchableOpacity>
            <Text style={styles.text} onPress={() => setModal(!modal)}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text} onPress={() => props.navigation.navigate('Home')}>Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> {props.navigation.navigate('Levels')
            console.log("levels")}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Foundation name={'pause'} size={50} color={'#FFFFFF'}  onPress={ () => setModal(!modal) } />
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.text}>Level {props.navigation.getParam('level')}</Text>
        <Text style={styles.text2}>Tap on the screen when the circles match!</Text>
      </View>
      <GameEngine 
        style={styles.hexagons}
        parentCallback = {this.callbackFunction}
        dataFromParent = {props.navigation.getParam('speed')}
        paused={!modal}
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
