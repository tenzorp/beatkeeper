import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function LevelScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Levels</Text>
        </View>
    );
}

LevelScreen.navigationOptions = {
    title: 'Levels',
    header: null
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});