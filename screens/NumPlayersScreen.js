import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Button,
} from 'react-native';
import React, { useState } from 'react';


export default function NumPlayersScreen(props) {
  const [players, setNum] = useState(2);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>How many players?</Text>
      <TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="2"
          onChangeText={(num) => setNum(num)}
          value={players.toString()}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.next} onPress={() => props.navigation.navigate('Difficulty')}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

NumPlayersScreen.navigationOptions = {
  title: 'Number of Players',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '5%',
    color: 'white',
  },
  input: {
    width: '20%',
    height: '20%',
    fontSize: 50,
    textAlign: 'center',
    margin: '5%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
    color: 'lightblue',
  },
  next: {
    textAlign: 'center',
    margin: 20,
    top: '15%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  nextText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
