import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import HexagonsGameplay from '../components/HexagonsGameplay';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { Button } from 'react-native';
import Modal from 'react-native-modal';

export default function GameplayScreen(props) {
  // console.log(props.navigation.getParam('level'))
  const [modal, setModal] = useState(false);
  const firestore = useFirestore();
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: 'overallStats',
      where: [
        ['uid', '==', auth.uid],
      ],
    },
  ]);


  const userStats = useSelector((state) => state.firestore.ordered.overallStats);

  const updateStats = () => {
    const ref = firestore.collection('overallStats').doc(userStats[0].id);
    // console.log(ref);
    const levelNew = userStats[0].highestLevel + 1;
    console.log(userStats[0].highestLevel);
    console.log(props.navigation.getParam('level'));
    if (userStats[0].highestLevel == props.navigation.getParam('level')) {
      const updateTimestamp = ref.update({ highestLevel: levelNew });
      console.log('made it to the updating');
    }
  };

  setTimeout(() => {
    // firebase.auth().currentUser.updateProfile({highestLevel: props.navigation.getParam('level')+1});
    updateStats();
    props.navigation.navigate('Feedback', { level: props.navigation.getParam('level') });
  }, 5000);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'}  />
        <Foundation name={'pause'} size={50} color={'#FFFFFF'}  />
      </View>
      <View style={styles.titleView}>
        <Text style={styles.text}>Tap on the screen when the hexagons match!</Text>
      </View>
      <HexagonsGameplay style={styles.hexagons} />
    </View>
  );
}


GameplayScreen.navigationOptions = {
  title: '',
  header: null
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%'
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  hexagons: {
    flex: 8,
    width: '100%',
  },
});
