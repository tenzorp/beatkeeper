import {
  Image, StyleSheet, Text, View, Button,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import feedbackBar from '../pictures/feedbackBar.png';

export default function ProfileScreen(props) {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const profile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: 'overallStats',
      where: [
        ['uid', '==', auth.uid],
      ],
    },
  ]);


  const userStats = useSelector((state) => state.firestore.ordered.overallStats);
  // console.log(userStats);

  return (
    <View style={styles.container}>
      <View style={{ width: '90%', flex: 7 }}>
        <View style={styles.buttons}>
          <Button color="#000000" title="Back" onPress={() => { props.navigation.navigate('Home'); }} />
          <Button color="#000000" title="Log out" onPress={() => { firebase.logout(profile); }} />
        </View>
        <View style={styles.name}>
          <Text style={styles.title}>{profile.displayName}</Text>
        </View>
        <View style={styles.stats}>
          {userStats && (
          <Text style={styles.text}>
            Games played:
            <Text style={{ fontWeight: 'bold' }}>{userStats[0].gamesPlayed}</Text>
          </Text>
          )}
          {userStats && (
          <Text style={styles.text}>
            Current level:
            <Text style={{ fontWeight: 'bold' }}>{userStats[0].highestLevel}</Text>
          </Text>
          )}
          {userStats && (
          <Text style={styles.text}>
            Average accuracy:
            <Text style={{ fontWeight: 'bold' }}>{userStats[0].highestLevel}</Text>
          </Text>
          )}
          <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />
        </View>
      </View>
      <View style={styles.stats}>
        {userStats && <Text style={styles.text}>Games played: <Text style={{fontWeight:'bold'}}>{userStats[0].gamesPlayed}</Text></Text>}
        {userStats && <Text style={styles.text}>Current level: <Text style={{fontWeight:'bold'}}>{userStats[0].highestLevel}</Text></Text>}
        {userStats && <Text style={styles.text}>Average accuracy: <Text style={{fontWeight:'bold'}}>{Math.round(userStats[0].averagePrecision)}%</Text></Text>}
        <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />
      </View>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
    height: '100%',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '7%',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    textAlign: 'left',
    color: 'white',
  },
  fbar: {
    width: '90%',
    height: '1%',
    flex: 0.5,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  stats: {
    flex: 6,
  },
  name: {
    flex: 1,
  },
  logout: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
