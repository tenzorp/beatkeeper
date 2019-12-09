import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty, useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import AppNavigator from '../navigation/AppNavigator';
import LoginComponent from './LoginComponent'

export default function Root() {

  const firebase = useFirebase()
  const firestore = useFirestore()
  const auth = useSelector(state => state.firebase.auth);

  var userStats = useSelector(state => state.firestore.ordered.overallStats);
  //console.log(userStats)

  const login = (email, password) => {
    var credentials = {
      email: email,
      password: password,
    }

    firebase.login(credentials).catch((error)=>{alert('Error','That was an error',[{text: 'OK', onPress: () => console.log('OK Pressed')}])})
  }

  const createAccount = (email, password, username) => {

    var credentials = {
      email: email,
      password: password,
    }

    var profile = {
      email: email,
      displayName: username,
    }


    firebase.createUser(credentials, profile).catch((error)=>{
      console.log(error);
      alert('Error','That was an error',[{text: 'OK', onPress: () => console.log('OK Pressed')}])
    })

  }

  if (!isLoaded(auth)){
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  else if (isEmpty(auth)){
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

  else if (!isEmpty(auth)){

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
    backgroundColor: '#fff'
  },
  login:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
