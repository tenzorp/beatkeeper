import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useScreens } from "react-native-screens";
import AppNavigator from './navigation/AppNavigator';

useScreens();

export default function App() {
  return (
      <View style={styles.container}>
        <AppNavigator/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});
