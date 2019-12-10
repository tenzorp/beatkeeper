import {
    StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import Hexagons from '../components/Hexagons';
import React, { PropTypes, Component } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';

export default function HomeScreen(props) {

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
                    <Text style={styles.buttonText}>About</Text>
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
