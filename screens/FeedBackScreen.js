import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image,
} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import feedbackBar from '../pictures/feedbackBar.png';
import stars from '../pictures/stars.png';

export default function FeedBackScreen(props) {
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: 'overallStats',
      where: [
        ['uid', '==', auth.uid],
      ],
    },
  ]);
  // <Image style={styles.stars} source={stars} alt={"3 stars"} />
  // <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />
  const userStats = useSelector((state) => state.firestore.ordered.overallStats);
  console.log(userStats);
  const { highestLevel } = userStats[0];

  return (
    <View style={styles.container}>
      <View style={styles.feedback}>
        <Text style={styles.text}>Nice job!</Text>
      </View>
      <View style={styles.buttons}>
        <Button color="#000000" title="Retry" onPress={() => { props.navigation.navigate('Gameplay', { level: 1 }); }} />
        <Button color="#000000" title="Change Level" onPress={() => { props.navigation.navigate('Levels'); }} />
        <Button color="#000000" title="Main Menu" onPress={() => { props.navigation.navigate('Home'); }} />
      </View>
    </View>
  );
}

FeedBackScreen.navigationOptions = {
  title: 'Feedback',
  header: null,
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
  fbar: {
    flex: 2,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  stars: {
    flex: 2,
    width: '70%',
    justifyContent: 'center',
    resizeMode: 'contain',
  },


});
