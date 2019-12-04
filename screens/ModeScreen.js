import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function ModeScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a gameplay mode!</Text>
      <TouchableOpacity onPress={()=> props.navigation.navigate('Level')}>
        <Text style={styles.buttonText}>Tap</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonDisabled}>Snap</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonDisabled}>Shake</Text>
      </TouchableOpacity>
    </View>
  );
}

ModeScreen.navigationOptions = {
  title: 'Single Player',
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
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonDisabled: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
    color: 'gray',
    fontWeight: 'bold',
    opacity: 0.5
  },
});
