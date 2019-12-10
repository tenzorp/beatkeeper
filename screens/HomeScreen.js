import {
    StyleSheet, Text, View, TouchableOpacity,Image
} from 'react-native';
import Hexagons from '../components/Hexagons';
import React, { PropTypes, Component, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Modal from 'react-native-modal';
import cats from '../assets/cats.gif';
import {AntDesign} from "@expo/vector-icons";

export default function HomeScreen(props) {
    const [modal, setModal] = useState(false);
    const firestore = useFirestore()
    const auth = useSelector(state => state.firebase.auth);

    useFirestoreConnect([
        { collection: 'overallStats',
            where:[
                ['uid', '==', auth.uid]
            ] }
    ]);

    let userStats = useSelector(state => state.firestore.ordered.overallStats);
    //console.log(userStats)

    const createNewUserStats = () => ({
        highestLevel: 1,
        gamesPlayed: 0,
        averagePrecision: 0,
        averageLate: 0,
        averageEarly: 0,
        numTimesPlayed: [0,0,0],
    });
    if (userStats && userStats.length < 1){
        let userStats = createNewUserStats();
        userStats.uid = auth.uid;
        firestore.add({collection:'overallStats'}, userStats);
    }
    return (
        <View style={styles.container}>
        <Modal isVisible={modal}>
          <View style={styles.modal}>
          <TouchableOpacity style={{margin: 0, alignSelf: 'flex-start'}}>
              <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> {setModal(!modal)}} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>About</Text>
            <Text style={styles.modalText}>This app was created by Hamza Kiyani, Tenzin Dorjee, & Zach Levitt!</Text>
            <Image
              style={{width: '50%', top: 15}}
              source={cats}/>
          </View>
        </Modal>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>BEAT</Text>
                <Text style={styles.headerText}>KEEPER</Text>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Mode')}>
                    <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonText} onPress={() => setModal(!modal)}>About</Text>
                </TouchableOpacity>
            </View>
            <Hexagons style={styles.hexagons} />
        </View>
    );
}

HomeScreen.navigationOptions = {
    title: 'Home',
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFE632',
        justifyContent: 'center',

    },
    buttonText: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonGroup: {
        flex: 2,
    },
    headerView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25%'
    },
    modal: {
    alignItems: 'center',
    backgroundColor: '#FFE632',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
  },
  modalTitle: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 5
  },
  modalText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10
  },
    headerText: {
        fontSize: 80,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    hexagons: {
        zIndex: -1,
        flex: 2,
        width: '100%',
    },
});
