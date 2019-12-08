import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import {
  useFirebase, isLoaded, isEmpty, useFirestore,
} from 'react-redux-firebase';
import AppNavigator from '../navigation/AppNavigator';
import LoginComponent from './LoginComponent';

export default function Root() {
  const firebase = useFirebase();
  const firestore = useFirestore();

  const auth = useSelector((state) => state.firebase.auth);
  var userStats = useSelector((state) => state.firestore.ordered.overallStats);

  const login = (email, password) => {
    const credentials = {
      email,
      password,
    };

    firebase.login(credentials).catch((error) => { alert('Error', 'That was an error', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]); });
  };

  const createAccount = (email, password, username) => {
    const credentials = {
      email,
      password,
    };

    const profile = {
      email,
      displayName: username,
    };


    firebase.createUser(credentials, profile).catch((error) => {
      console.log(error);
      alert('Error', 'That was an error', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
    });
  };

  if (!isLoaded(auth)) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (isEmpty(auth)) {
    return (
      <View style={styles.container}>
        <LoginComponent
          style={styles.login}
          login={login}
          createAccount={createAccount}
        />
      </View>
	    );
  }

  if (!isEmpty(auth)) {
    const createNewUserStats = () => ({
      highestLevel: 1,
      gamesPlayed: 0,
      averagePrecision: 0,
    	});
    if (userStats != undefined) {
      if (userStats.length < 1) {
    		console.log('undefined made it to it');
    		var userStats = createNewUserStats();
        	userStats.uid = auth.uid;
        	firestore.add({ collection: 'overallStats' }, userStats);
    	}
    }


    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  login: {
  	flex: 1,
  	justifyContent: 'center',
  	alignItems: 'center',
  },
});
