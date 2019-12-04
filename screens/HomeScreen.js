import Swiper from "react-native-swiper";
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from "react-native";
import Hexagons from "../components/Hexagons";
import React, { PropTypes, Component } from 'react';
import feedbackBar from '../pictures/feedbackBar.png';
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
            <Swiper
                loop={false}
                showsPagination={false}
                index={1}
                showButtons={true}>
                <View style={styles.containerSingle}>
                    <View style={styles.playerView}>
                        <Text style={styles.playerText}>SINGLE</Text>
                        <Text style={styles.playerText}>PLAYER</Text>
                    </View>
                    <View style={styles.modeButtonGroup}>
                        <Text style={styles.gameplayMode}>Choose a gameplay mode!</Text>
                        <TouchableOpacity onPress={()=> props.navigation.navigate('Levels')}>
                            <Text style={styles.buttonText}>Tap</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.buttonDisabled}>Snap</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.buttonDisabled}>Shake</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Swiper
                    showsPagination={false}
                    loop={false}
                    horizontal={false}
                    showButtons={true}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>BEAT</Text>
                            <Text style={styles.headerText}>KEEPER</Text>
                        </View>
                        <Hexagons style={styles.hexagons} />
                    </View>
                    <View style={styles.containerProfile}>
                        <Text style={styles.player}>{profile.displayName}</Text>
                        <Text style={styles.player}>Current level: 1</Text>
                        <Text style={styles.player}>You have played this game 69 times</Text>
                        <Text style={styles.player}>Your Average Precision is 69%</Text>
                        <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />
                        <Button title="Log out" onPress={()=>{firebase.logout(profile)}} />
                    </View>
                </Swiper>

                <View style={styles.containerMulti}>
                    <View style={styles.playerView}>
                        <Text style={styles.playerText}>MULTI</Text>
                        <Text style={styles.playerText}>PLAYER</Text>
                    </View>
                    <View style={styles.modeButtonGroup}>
                        <Text style={styles.gameplayMode}>Choose a gameplay mode!</Text>
                        <TouchableOpacity onPress={()=> props.navigation.navigate('NumPlayers')}>
                            <Text style={styles.buttonText}>Tap</Text>
                        </TouchableOpacity>
                        <Text style={styles.buttonDisabled}>Snap</Text>
                        <Text style={styles.buttonDisabled}>Shake</Text>
                    </View>
                </View>
            </Swiper>

        );
};

HomeScreen.navigationOptions = {
    title: 'Home',
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFE632',
    },
    containerMulti: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE632',
        height: '100%',
    },
    fbar: {
        width: '90%',
        height: '1%',
        flex :0.5,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    containerProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE632',
        height: '100%',
    },
    containerSingle: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFE632',
        height: '100%',
    },
    headerText: {
        fontSize:80,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    header : {
        flex:2,
        height:'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonDisabled: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        color: 'gray',
        fontWeight: 'bold',
        opacity: 0.5
    },
    player: {
        fontSize: 40,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 20

    },
    playerView: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
    },
    modeButtonGroup: {
        flex: 1,
    },
    gameplayMode: {
        fontSize: 30,
        marginBottom: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    hexagons: {
        flex: 2,
        width: '100%',
    }
});
