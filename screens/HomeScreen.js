import Swiper from "react-native-swiper";
import {Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Hexagons from "../components/Hexagons";
import GameMode from "../components/GameMode";
import React, { PropTypes, Component } from 'react';

export default class HomeScreen extends Component {
    render() {
        return (
            <Swiper
                loop={false}
                showsPagination={false}
                index={1}>
                <View style={styles.containerSingle}>
                    <View style={styles.singleplayer}>
                    <Text style={styles.singleplayerText}>SINGLE</Text>
                    <Text style={styles.singleplayerText}>PLAYER</Text>
                    </View>
                    <View style={styles.modeButtonGroup}>
                    <Text style={{fontSize:20,marginBottom:20}}>Choose a gameplay mode:</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Levels')}>
                    <Text style={styles.buttonText}>Tap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Text style={styles.buttonText2}>Snap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Text style={styles.buttonText2}>Shake</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <Swiper
                    showsPagination={false}
                    loop={false}
                    horizontal={false}>
                    <View style={styles.container}>
                        <View style={styles.headerText}>
                            <Text style={styles.header}>BEAT</Text>
                            <Text style={styles.header}>KEEPER</Text>
                        </View>
                        <Hexagons style={styles.hexagons} />
                    </View>
                    <View style={styles.containerProfile}>
                        <Text style={styles.player}>PROFILE</Text>
                    </View>
                </Swiper>

                <View style={styles.containerMulti}>
                    <View style={styles.multiplayer}>
                    <Text style={styles.multiplayerText}>MULTI</Text>
                    <Text style={styles.multiplayerText}>PLAYER</Text>
                    </View>
                    <View style={styles.modeButtonGroup}>
                    <Text style={{fontSize:20,marginBottom:20}}>Choose a gameplay mode:</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Levels')}>
                    <Text style={styles.buttonText}>Tap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Text style={styles.buttonText2}>Snap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Text style={styles.buttonText2}>Shake</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#FFFF99',
    },
    containerMulti: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF99',
        height: '100%',
    },
    containerProfile: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF99',
        height: '100%',
    },
    containerSingle: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFF99',
        height: '100%',
    },
    header: {
        fontSize:80,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headerText : {
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
    },
    buttonText2: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        color: 'lightgray',
        fontWeight: 'bold',
    },
    player: {
        fontSize: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    singleplayer: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    singleplayerText: {
        fontSize: 60,
        fontWeight: 'bold',
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
    },
    modeButtonGroup: {
        flex: 1,
    },
    hexagons: {
        flex: 2,
        width: '100%',
    }
});