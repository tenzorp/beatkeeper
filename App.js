import React, { PropTypes, Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Text, View, StyleSheet,Button } from 'react-native';
import Swiper from 'react-native-swiper'

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
   	<Swiper
        loop={false}
        showsPagination={false}
        index={1}>
        <View style={styles.container}>
          <Text style={styles.player}>SINGLE PLAYER</Text>
        </View>
    <Swiper 
    	showsPagination={false} 
    	loop={false}
    	horizontal={false}>
        <View style={styles.container}>
      		<Text style={styles.header}>BEAT KEEPER</Text>
    	</View>
    	<View style={styles.container}>
         	<Text style={styles.player}>PROFILE</Text>
        </View>
        </Swiper>

        <View style={styles.container}>
          <Text style={styles.player}>MULTIPLAYER</Text>
        </View>

      </Swiper>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize:80,
    textAlign: 'center',
  },
  player: {
  	fontSize: 30,
  	textAlign: 'center'
  }
});
