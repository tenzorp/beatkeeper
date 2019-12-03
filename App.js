import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useScreens } from "react-native-screens";
import AppNavigator from './navigation/AppNavigator';
import { store, rrfProps } from './store/store';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, ReduxFirestoreProvider } from 'react-redux-firebase';
import Root from './components/Root'


useScreens();

export default function App() {
  return (
    <Provider store={store} >
    	<ReactReduxFirebaseProvider {...rrfProps}>
  		<ReduxFirestoreProvider {...rrfProps}>
    		<View style={styles.container}>
      			<Root />
    		</View>
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
