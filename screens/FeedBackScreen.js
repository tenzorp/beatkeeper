import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import feedbackBar from '../pictures/feedbackBar.png';
import stars from '../pictures/stars.png'
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

export default function FeedBackScreen(props) {
  const firestore = useFirestore()
  const auth = useSelector(state => state.firebase.auth);

  useFirestoreConnect([
    { collection: 'overallStats',
      where:[
        ['uid', '==', auth.uid]
      ] }
  ]);

  var userStats = useSelector(state => state.firestore.ordered.overallStats);
  //console.log("numTaps: ",props.navigation.getParam('numTaps'))

  useEffect(() => {

    console.log("updating!")

    var gamePrecision = Math.random()*100

    const createNewGame = () => ({
      level: props.navigation.getParam('level'),
      precision: props.navigation.getParam('precision'),
    });

    const updateGames = () => {
      var newGameStats = createNewGame();
      newGameStats.uid = auth.uid;
      firestore.add({collection:'games'}, newGameStats);
    }

    const updateStats = () => {
      const ref = firestore.collection('overallStats').doc(userStats[0].id);
      var newLevel = userStats[0].highestLevel+1

      if (userStats[0].highestLevel == props.navigation.getParam('level')){
        let updateLevel = ref.update({highestLevel: newLevel});
      }

      var newGamesPlayed = userStats[0].gamesPlayed+1
      //var newPrecision = userStats[0].averagePrecision+1

      var newPrecision = ((userStats[0].averagePrecision*userStats[0].gamesPlayed)+props.navigation.getParam('precision'))/newGamesPlayed

      if (props.navigation.getParam('numTaps') > 0){
        let updatePrecision = ref.update({averagePrecision: newPrecision})
        let updateGamesPlayed = ref.update({gamesPlayed: newGamesPlayed})
      }
      

    }

    updateGames();
    updateStats();

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.feedback}>
        <Text style={styles.text}>Nice job!</Text>
        <Text style={styles.text2}>You tapped on the screen {props.navigation.getParam('numTaps')} times.</Text>
        <Text style={styles.text2}>Only {props.navigation.getParam('numCorrectTaps')} taps were on beat.</Text>
      </View>
      <View style={styles.buttons}>
        <Button color="#000000" title="Retry" onPress={()=>{props.navigation.navigate('Gameplay',{level:1})}} />
        <Button color="#000000" title="Change Level" onPress={()=>{props.navigation.navigate('Levels')}} />
        <Button color="#000000" title="Main Menu" onPress={()=>{props.navigation.navigate('Home')}} />
      </View>
    </View>
  );
};

FeedBackScreen.navigationOptions = {
  title: 'Feedback',
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },
  feedback: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttons: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: '5%',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  text2:{
    fontSize: 30,
    textAlign: 'left',
    color: 'white',
  },
  fbar: {
    flex : 2,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  stars: {
    flex: 2,
    width: '70%',
    justifyContent: 'center',
    resizeMode: 'contain',
  }


});
