import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HexagonsLevels from "../components/HexagonsLevels";

export default function LevelScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerText>
            <Text style={styles.text}>Levels</Text>
            </View>
            <HexagonsLevels style={styles.hexagons} />
        </View>
    );
}

LevelScreen.navigationOptions = {
    title: 'Levels',
    header: null
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFF99',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 6,

    },
    headerText:{
        flex: 1,
    },
    hexagons: {
        flex: 5,
        width: '100%',
        backgroundColor: 'green',
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});