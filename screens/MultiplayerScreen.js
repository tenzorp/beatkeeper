import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function MultiplayerScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Multiplayer</Text>
        </View>
    );
}

MultiplayerScreen.navigationOptions = {
    title: 'Multiplayer'
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