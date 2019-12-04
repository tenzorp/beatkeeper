import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import feedbackBar from '../pictures/feedbackBar.png';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

export default function ProfileScreen(props) {
  const firebase = useFirebase()
    const firestore = useFirestore()
    const profile = useSelector(state => state.firebase.profile);
    const auth = useSelector(state => state.firebase.auth);

    useFirestoreConnect([
    { collection: 'overallStats',
      where:[
        ['uid', '==', auth.uid]
      ] } 
    ]);

    
    var userStats = useSelector(state => state.firestore.ordered.overallStats);
    //console.log(userStats)
    //

  return (
    <View style={styles.container}>
    <View style={{width:'90%',flex:7}}>
      <View style={styles.name}>
        <Button color="#ffffff" title="Back" onPress={()=>{props.navigation.navigate('Home')}} />
        <Text style={styles.title}>{profile.displayName}</Text>
        <Button color="#ffffff" title="Log out" onPress={()=>{firebase.logout(profile)}} />
      </View>
      <View style={styles.stats}>
        {userStats && <Text style={styles.text}>You have kept the beat {userStats[0].gamesPlayed} times</Text>}
        {userStats && <Text style={styles.text}>Current level: {userStats[0].highestLevel}</Text>}
        <Text style={styles.text}>Your Average Precision is 78%</Text>
        <Image style={styles.fbar} source={feedbackBar} alt="feedbackBar" />
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
    flex: 7,
    height: '100%',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  fbar: {
    width: '90%',
    height: '1%',
    flex :0.5,
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  stats: {
    flex: 5,
  },
  name: {
    marginTop: '10%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logout: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});
