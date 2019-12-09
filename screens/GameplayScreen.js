import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      <Modal isVisible={modal}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>PAUSED</Text>
          <TouchableOpacity>
            <Text style={styles.text} onPress={() => setModal(!modal)}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text} onPress={() => props.navigation.navigate('Home')}>Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> props.navigation.navigate('Levels')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Foundation name={'pause'} size={50} color={'#FFFFFF'}  onPress={()=> setModal(!modal)}/>
        </TouchableOpacity>
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
  },
  hexagons: {
    flex: 8,
    width: '100%',
  },
  modal: {
    alignItems: 'center',
    backgroundColor: '#FFE632',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 20
  },
  modalTitle: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 10
  },
  modalText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10
  }
});
