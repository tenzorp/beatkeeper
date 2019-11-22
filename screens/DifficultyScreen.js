import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function DifficultyScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your difficulty!</Text>
            <TouchableOpacity>
                <Text style={styles.gameplayMode}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.gameplayMode}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.gameplayMode}>Hard</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 60,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        marginVertical: '10%'
    },
    gameplayMode: {
        fontSize: 40,
        textAlign: 'center',
        margin: 20,
        fontWeight: 'bold',
        color: 'white',
    }
});
