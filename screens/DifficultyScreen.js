import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function DifficultyScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Difficulty</Text>
        </View>
    );
}

DifficultyScreen.navigationOptions = {
    title: 'Difficulty',
    header: null
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFE632',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});
