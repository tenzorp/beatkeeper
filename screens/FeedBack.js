import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image } from 'react-native';
import React, { useState } from 'react';
import feedbackBar from '../pictures/feedbackBar.png';
import stars from '../pictures/stars.png'

export default function FeedBack(props) {

    return (
        <View style={StyleSheet.container}>
            <Image style={styles.stars} src={stars} alt={"3 stars"} />
            <Text style={styles.text}>You did great!</Text>
            <Text style={styles.text}></Text>
            <Image style={styles.fbar} src={feedbackBar} alt="feedbackBar" />

        </View>

    );


};


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFE632',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    nextText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '5%',
        color: 'white',
    },
    fbar: {
        width: 20, 
        height: 50,
    },
    stars: {
        width: 50,
        height: 50,
    }


});
