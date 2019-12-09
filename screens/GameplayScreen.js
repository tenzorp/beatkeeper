import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HexagonsGameplay from "../components/HexagonsGameplay";
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

export default function GameplayScreen(props) {
    //console.log(props.navigation.getParam('level'))
    const firestore = useFirestore()
    const auth = useSelector(state => state.firebase.auth);

    useFirestoreConnect([
        { collection: 'overallStats',
          where:[
            ['uid', '==', auth.uid]
          ] } 
    ]);

    /*useFirestoreConnect([
        { collection: 'games',
          where:[
            ['uid', '==', auth.uid]
          ] } 
    ]);*/

    const userStats = useSelector(state => state.firestore.ordered.overallStats);
    const gameStats = useSelector(state => state.firestore.ordered.games);
    

    /*
    }*/

    setTimeout(() => {

        props.navigation.navigate('Feedback',{level:props.navigation.getParam('level')});
    
    }, 5000);

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.text}>Level {props.navigation.getParam('level')}</Text>
                <Text style={styles.text}>Tap on the screen when the hexagons match!</Text>
            </View>
            <HexagonsGameplay style={styles.hexagons} />
        </View>
    );
}

GameplayScreen.navigationOptions = {
  title: 'Gameplay',
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
    headerView:{
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
