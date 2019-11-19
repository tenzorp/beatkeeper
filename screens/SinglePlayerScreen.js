import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

export default function SinglePlayerScreen(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Single Player</Text>
            <Button onPress={()=> props.navigation.navigate('Levels')} title={'Tap'}/>
        </View>
    );
}

SinglePlayerScreen.navigationOptions = {
    title: 'Single Player'
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