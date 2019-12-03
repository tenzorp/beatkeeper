import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import AppNavigator from '../navigation/AppNavigator';
import LoginComponent from './LoginComponent'

export default function Root() {

	const firebase = useFirebase()

	const auth = useSelector(state => state.firebase.auth);

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
			highestLevel: 1,
			gamesPlayed: 0,
			averageOn: 0,
			averageOff: 0,
			averagePrecision: 0,
		}

		firebase.createUser(credentials, profile).catch((error)=>{alert('Error','That was an error',[{text: 'OK', onPress: () => console.log('OK Pressed')}])})

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