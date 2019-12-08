import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React, { PropTypes, Component } from 'react';
import Hexagons from '../components/Hexagons';

export default function HomeScreen(props) {
  // console.log("this is what userStats is from DB:",userStats)

  /* if (userStats) {
        console.log(userStats.length)
        if (userStats.length < 1){
            //console.log("hello yeah")
        console.log("made it into the undefined section")

        //console.log("2: ",userStats)
        }

    } */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.headerText}>BEAT</Text>
          <Text style={styles.headerText}>KEEPER</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Mode')}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Hexagons style={styles.hexagons} />
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: 'Home',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFE632',
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonGroup: {
    flex: 2,
  },
  header: {
    flex: 4,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 80,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  hexagons: {
    zIndex: -1,
    flex: 2,
    width: '100%',
  },
});
