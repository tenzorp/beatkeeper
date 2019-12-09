import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React from 'react';
import { AntDesign } from "@expo/vector-icons";

export default function ModeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> {props.navigation.navigate('Home')}} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Choose a gameplay mode!</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Levels')}>
          <Text style={styles.buttonText}>Tap</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonDisabled}>Snap</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonDisabled}>Shake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

ModeScreen.navigationOptions = {
  title: 'Single Player',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: '5%'
  },
  titleView: {
    flex: 2
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flex: 2
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    margin: '2%',
    fontWeight: 'bold',
    color: 'white',
  },
  buttonDisabled: {
    fontSize: 40,
    textAlign: 'center',
    color: 'gray',
    fontWeight: 'bold',
    opacity: 0.5,
    margin: '2%',

  },
});
