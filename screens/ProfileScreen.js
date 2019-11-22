import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

// make state for text
const [text, setText] = useState("");

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>Statistics</Text>
            <TextInput
                style={{height: 40}}
                placeholder="Enter your Name!"
                onChangeText={(text) => setText({text})}
                value={text}
            />
            <Text style={styles.text}>You have played 1 game!</Text>
        </View>
    );
}

ProfileScreen.navigationOptions = {
    title: 'Profile'
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