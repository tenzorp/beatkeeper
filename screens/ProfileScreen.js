import {
  Image, StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import feedbackBar from '../pictures/feedbackBar.png';
import { AntDesign, Entypo } from "@expo/vector-icons";

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
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> {props.navigation.navigate('Home')}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name={'log-out'} size={50} color={'#FFFFFF'} onPress={()=> { firebase.logout(profile);}} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '80%', flex: 7 }}>
        <View style={styles.name}>
          <Text style={styles.title}>{profile.displayName}</Text>
        </View>
        <View style={styles.stats}>
          {userStats && (
          <Text style={styles.text}>
            Games played:
            <Text style={{ fontWeight: 'bold' }}> {userStats[0].gamesPlayed}</Text>
          </Text>
          )}
          {userStats && (
          <Text style={styles.text}>
            Current level:
            <Text style={{ fontWeight: 'bold' }}> {userStats[0].highestLevel}</Text>
          </Text>
          )}
          {userStats && (
          <Text style={[styles.text, {marginTop:'5%'}]}>
            You are on beat
            <Text style={{ fontWeight: 'bold' }}> {Math.round(userStats[0].averagePrecision)}% </Text>
            of the time.
          </Text>
          )}
          {userStats && (
          <Text style={[styles.text, {marginTop:'5%'}]}>
            When you mess up, you are 
            <Text style={{ fontWeight: 'bold' }}> {Math.round(userStats[0].averageLate)}% </Text>
            late and 
            <Text style={{ fontWeight: 'bold' }}> {Math.round(userStats[0].averageEarly)}% </Text>
            early.
          </Text>
          )}
        </View>
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
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: '5%',
    width: '90%'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '7%',
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 36,
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
