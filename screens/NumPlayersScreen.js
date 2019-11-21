import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


export default function NumPlayersScreen() {
  const [players, setNum] = useState(2);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>How many players?</Text>
      <TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="2"
          onChangeText={(num) => setNum(num)}
          value={players.toString()}/>
      </TouchableOpacity>
    </View>
  );
}

NumPlayersScreen.navigationOptions = {
  title: 'Number of Players',
  header: null
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
    margin: '5%'
  },
  input: {
    width: '20%',
    height: '20%',
    fontSize: 50,
    textAlign: 'center',
    margin: '5%',
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderWidth: 5,
  }
});
