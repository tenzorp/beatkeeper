import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Hexagons from "../components/Hexagons";
import React, { PropTypes, Component } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

export default function HomeScreen(props) {
    const firebase = useFirebase()
    const firestore = useFirestore()
    const profile = useSelector(state => state.firebase.profile);
    const auth = useSelector(state => state.firebase.auth);

    useFirestoreConnect([
    { collection: 'overallStats',
      where:[
        ['uid', '==', auth.uid]
      ] } 
    ]);

    

    var userStats = useSelector(state => state.firestore.ordered.overallStats);
    //console.log("this is what userStats is from DB:",userStats)

    /*if (userStats) {
        console.log(userStats.length)
        if (userStats.length < 1){
            //console.log("hello yeah")
        console.log("made it into the undefined section")
        
        //console.log("2: ",userStats)
        }
        
    }*/
    
        return (
          <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>BEAT</Text>
                <Text style={styles.headerText}>KEEPER</Text>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={()=> props.navigation.navigate('Mode')}>
                        <Text style={styles.buttonText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> props.navigation.navigate('Profile')}>
                        <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Hexagons style={styles.hexagons} />
        </View>
    );
};

HomeScreen.navigationOptions = {
    title: 'Home',
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFE632',
    },
    buttonText: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonGroup: {
        flex: 2
    },
    header: {
        flex: 1,
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize:80,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    hexagons: {
        zIndex: -1,
        flex: 1,
        width: '100%',
    }
});