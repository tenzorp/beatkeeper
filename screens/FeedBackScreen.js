import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { MaterialIcons } from "@expo/vector-icons";

export default function FeedBackScreen(props) {
  const firestore = useFirestore()
  const auth = useSelector(state => state.firebase.auth);
  var message;

  useFirestoreConnect([
    { collection: 'overallStats',
      where:[
        ['uid', '==', auth.uid]
      ] }
  ]);

  if (props.navigation.getParam('precision') > 80){
    message = "Awesome job!"
  }

  else if (props.navigation.getParam('precision') > 60){
    message = "Nice work!"
  }

  else if (props.navigation.getParam('precision') > 40){
    message = "You did okay."
  }

  else {
    message = "Try again.."
  }

  var userStats = useSelector(state => state.firestore.ordered.overallStats);

  if (props.navigation.getParam('earlyTaps') > 0 || props.navigation.getParam('lateTaps') > 0){
    var percentEarly = (props.navigation.getParam('earlyTaps')/(props.navigation.getParam('earlyTaps')+props.navigation.getParam('lateTaps')))*100
    var percentLate = (props.navigation.getParam('lateTaps')/(props.navigation.getParam('earlyTaps')+props.navigation.getParam('lateTaps')))*100
  }

  else {
    var percentEarly = 0;
    var percentLate = 0;
  }
  


  useEffect(() => {
    //console.log(props.navigation)
    var gamePrecision = Math.random()*100

    const updateStats = () => {
      const ref = firestore.collection('overallStats').doc(userStats[0].id);
      var newLevel = userStats[0].highestLevel+1

      if (userStats[0].highestLevel == props.navigation.getParam('level')){
        let updateLevel = ref.update({highestLevel: newLevel});
      }

      var newGamesPlayed = userStats[0].gamesPlayed+1

      var newPrecision = ((userStats[0].averagePrecision*userStats[0].gamesPlayed)+props.navigation.getParam('precision'))/newGamesPlayed
      var averageEarly = ((userStats[0].averageEarly*userStats[0].gamesPlayed)+percentEarly)/newGamesPlayed
      var averageLate = ((userStats[0].averageLate*userStats[0].gamesPlayed)+percentLate)/newGamesPlayed

      if (props.navigation.getParam('numTaps') > 0){
        let updatePrecision = ref.update({averagePrecision: newPrecision})
        let updateGamesPlayed = ref.update({gamesPlayed: newGamesPlayed})
        let updateLate = ref.update({averageLate: averageLate})
        let updateEarly = ref.update({averageEarly: averageEarly})
      }
      

    }
    updateStats();

  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <MaterialIcons name={'refresh'} size={50} color={'#FFFFFF'}
             onPress={()=> {props.navigation.navigate('Gameplay', { level: props.navigation.getParam('level'), speed:7.5, song: `./../songs/easybeat${props.navigation.getParam('level')}.mp3`})}} />
        </TouchableOpacity>
      </View>
      <View style={styles.feedback}>
        <Text style={styles.text}>{message}</Text>
        <Text style={[styles.text2,{marginTop:'5%'}]}>You tapped on the screen {props.navigation.getParam('numTaps')} times and {props.navigation.getParam('numCorrectTaps')}/{props.navigation.getParam('numTaps')} taps were on beat.</Text>
        <Text style={[styles.text2,{marginTop:'5%'}]}>When you missed the beat, you were {Math.round(percentLate)}% late and {Math.round(percentEarly)}% early.</Text>
      </View>
      <View style={styles.buttons}>
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
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%'
  },
  feedback: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    width: "90%",
  },
  buttons: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: '5%',
  },
  text: {
    fontSize: 50,
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
