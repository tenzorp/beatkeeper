import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import HexagonsLevels from "../components/HexagonsLevels";

export default function LevelScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.text}>Choose a level!</Text>
            </View>
            <HexagonsLevels style={styles.hexagons} />
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.next} onPress={()=> props.navigation.navigate('Gameplay')}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

LevelScreen.navigationOptions = {
    title: 'Levels',
    header: null
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFE632',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 7,

    },
    headerView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hexagons: {
        flex: 4,
        width: '100%',
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    next: {
        flex: 2,
        textAlign: 'center',
        margin: 20,
        top: '15%',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
});
