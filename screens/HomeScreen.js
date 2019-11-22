import Swiper from "react-native-swiper";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Hexagons from "../components/Hexagons";
import React, { PropTypes, Component } from 'react';
import feedbackBar from '../pictures/feedbackBar.png';

export default class HomeScreen extends Component {
    render() {
        return (
            <Swiper
                loop={false}
                showsPagination={false}
                index={1}>
                <View style={styles.containerSingle}>
                    <View style={styles.singlePlayer}>
                        <Text style={styles.singlePlayerText}>SINGLE</Text>
                        <Text style={styles.singlePlayerText}>PLAYER</Text>
                    </View>
                    <View style={styles.modeButtonGroup}>
                        <Text style={styles.gameplayMode}>Choose a gameplay mode!</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Levels')}>
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
                    horizontal={false}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>BEAT</Text>
                            <Text style={styles.headerText}>KEEPER</Text>
                        </View>
                        <Hexagons style={styles.hexagons} />
                    </View>
                    <View style={styles.containerProfile}>
                        <Text style={styles.player}>John Doe</Text>
                        <Text style={styles.player}>You have played this game 117 times</Text>
                        <Text style={styles.player}>Your over all progress</Text>
                        <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />

                    </View>
                </Swiper>

                <View style={styles.containerMulti}>
                    <View style={styles.multiplayer}>
                        <Text style={styles.multiplayerText}>MULTI</Text>
                        <Text style={styles.multiplayerText}>PLAYER</Text>
                    </View>
                    <View style={styles.modeButtonGroup}>
                        <Text style={styles.gameplayMode}>Choose a gameplay mode!</Text>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('NumPlayers')}>
                            <Text style={styles.buttonText}>Tap</Text>
                        </TouchableOpacity>
                        <Text style={styles.buttonDisabled}>Snap</Text>
                        <Text style={styles.buttonDisabled}>Shake</Text>
                    </View>
                </View>
            </Swiper>

        );
    }
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
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
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
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 20

    },
    singlePlayer: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    singlePlayerText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
    },
    multiplayer: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    multiplayerText: {
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
