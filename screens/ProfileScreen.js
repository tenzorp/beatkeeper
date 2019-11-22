import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile</Text>
        </View>
    );
}

ProfileScreen.navigationOptions = {
    title: 'Profile'
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFE632',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    }
});
