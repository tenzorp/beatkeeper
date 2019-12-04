import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { useScreens } from "react-native-screens";
import AppNavigator from './navigation/AppNavigator';
import persistentStore, { store, rrfProps } from './store/store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, ReduxFirestoreProvider } from 'react-redux-firebase';
import Root from './components/Root'
import { PersistGate } from 'redux-persist/integration/react'

useScreens();

export default function App() {
  return (
    <Provider store={store} >
    	<ReactReduxFirebaseProvider {...rrfProps}>
  		<ReduxFirestoreProvider {...rrfProps}>
      <PersistGate 
        loading={<View><Text style={{textAlign:'center',marginTop:100}}>Loading</Text></View>} 
        persistor={persistentStore}>
    		<View style={styles.container}>
      			<Root />
    		</View>
        </PersistGate>
  		</ReduxFirestoreProvider>
  		</ReactReduxFirebaseProvider>
	</Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});
