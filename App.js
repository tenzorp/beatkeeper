import React, { PropTypes, Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Text, View, StyleSheet, Button } from 'react-native';
import Swiper from 'react-native-swiper'
import Hexagons from './components/Hexagons'

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        index={1}>
          <View style={styles.containerSingle}>
            <Text style={styles.player}>SINGLE PLAYER</Text>
          </View>
      <Swiper
        showsPagination={false}
        loop={false}
        horizontal={false}>
          <View style={styles.container}>
            <View style={styles.headerText}>
              <Text style={styles.header}>BEAT</Text>
              <Text style={styles.header}>KEEPER</Text>
            </View>
            <Hexagons style={styles.hexagons} />
        </View>
        <View style={styles.containerProfile}>
            <Text style={styles.player}>PROFILE</Text>
        </View>
        </Swiper>

        <View style={styles.containerMulti}>
          <Text style={styles.player}>MULTIPLAYER</Text>
        </View>

      </Swiper>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  containerMulti: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    height: '100%',
  },
  containerProfile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    height: '100%',
  },
  containerSingle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    height: '100%',
  },
  header: {
    fontSize:80,
    textAlign: 'center',
  },
  headerText : {
  	flex:2,
  	height:'100%',
  	width: '100%',
	alignItems: 'center',
	justifyContent: 'center',
  },
  player: {
  	fontSize: 30,
  	textAlign: 'center',
  	alignItems: 'center',
	justifyContent: 'center',
  },
  hexagons: {
  	flex: 3,
  	width: '100%',
  }
});
