import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HexagonsGameplay from "../components/HexagonsGameplay";
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

export default function GameplayScreen(props) {
    const firestore = useFirestore()
    const auth = useSelector(state => state.firebase.auth);

    useFirestoreConnect([
        { collection: 'overallStats',
          where:[
            ['uid', '==', auth.uid]
          ] } 
    ]);

    const userStats = useSelector(state => state.firestore.ordered.overallStats);

    const createNewUserStats = () => ({
            highestLevel: 1,
            gamesPlayed: 1,
            averagePrecision: 0,
    });

    const updateStats = () => {
    
        //console.log(userStats[0].id)
        //CHECK IF A USER DB EXISTS WITH THAT ID
        //console.log(userStats)
        if (userStats.length > 0){
            console.log("hello")
            const ref = firestore.collection('overallStats').doc(userStats[0].id);
            //console.log(ref);
            var levelNew = userStats[0].highestLevel+1
            let updateTimestamp = ref.update({highestLevel: levelNew});
        }
        else {
            console.log("hello2")
            const userStats = createNewUserStats();
            userStats.uid = auth.uid;
            firestore.add({collection:'overallStats'}, userStats);
        }
        
    }



    setTimeout(() => {
        //firebase.auth().currentUser.updateProfile({highestLevel: props.navigation.getParam('level')+1});
        updateStats();q
        props.navigation.navigate('Feedback');
    }, 5000);

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
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
        textAlign: 'center'
    },
    hexagons: {
        flex: 8,
        width: '100%',
    },
});
