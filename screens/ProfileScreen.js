import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import feedbackBar from '../pictures/feedbackBar.png';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>John Doe</Text>
      <Text style={styles.text}>You have played this game 117 times</Text>
      <Text style={styles.text}>Your Average Precision is 78%</Text>
      <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />

    </View>
  );
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginVertical: '10%'
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  fbar: {
    width: '90%',
    height: '1%',
    flex :0.5,
    justifyContent: 'center',
    resizeMode: 'contain',
  },

});
