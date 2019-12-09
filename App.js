import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider, ReduxFirestoreProvider } from 'react-redux-firebase';
import { PersistGate } from 'redux-persist/integration/react';
import persistentStore, { store, rrfProps } from './store/store';
import Root from './components/Root';

useScreens();

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ReduxFirestoreProvider {...rrfProps}>
          <PersistGate
            loading={<View><Text style={{ textAlign: 'center', marginTop: 100 }}>Loading</Text></View>}
            persistor={persistentStore}
          >
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
