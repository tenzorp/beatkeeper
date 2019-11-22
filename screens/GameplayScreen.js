import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import HexagonsGameplay from "../components/HexagonsGameplay";

export default function GameplayScreen(props) {
    setTimeout(() => {
        props.navigation.navigate('Levels'); //this.props.navigation.navigate('Login')
    }, 20000);

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
