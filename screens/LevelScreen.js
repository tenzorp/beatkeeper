import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import {AntDesign} from "@expo/vector-icons";


export default function LevelScreen(props) {
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: 'overallStats',
      where: [
        ['uid', '==', auth.uid],
      ],
    },
  ]);

  var userStats = useSelector(state => state.firestore.ordered.overallStats);
  //console.log(userStats)
  var highestLevel = 1
  if (userStats){
    if (userStats != []){
      var highestLevel = userStats[0].highestLevel
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <AntDesign name={'arrowleft'} size={50} color={'#FFFFFF'} onPress={()=> {props.navigation.navigate('Mode')}} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.text}>Choose a level!</Text>
      </View>
      <Grid style={styles.grid}>
        <Col>
          <Row style={styles.row}>
            <TouchableOpacity onPress={() => {
              if (highestLevel >= 1) {
                props.navigation.navigate('Gameplay', { level: 1, speed:7.5,duration:10000});
              }
            }}
            >
              <Text style={[styles.level, highestLevel >= 1 ? styles.textvalid : styles.textinvalid]}>1</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <TouchableOpacity onPress={() => {
              if (highestLevel >= 4) {
                props.navigation.navigate('Gameplay', { level: 4,speed:5 });
              }
            }}
            >
              <Text style={[styles.level, highestLevel >= 4 ? styles.textvalid : styles.textinvalid]}>4</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
          <TouchableOpacity onPress={() => {
              if (highestLevel >= 7) {
                props.navigation.navigate('Gameplay', { level: 7,speed:8 });
              }
            }}
            >
            <Text style={[styles.level, highestLevel >= 7 ? styles.textvalid : styles.textinvalid]}>7</Text>
          </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <Text style={[styles.level, highestLevel >= 10 ? styles.textvalid : styles.textinvalid]}>10</Text>
          </Row>
        </Col>
        <Col>
          <Row style={styles.row}>
            <TouchableOpacity onPress={() => {
              if (highestLevel >= 2) {
                props.navigation.navigate('Gameplay', { level: 2,speed:10,duration:10000 });
              }
            }}
            >
              <Text style={[styles.level, highestLevel >= 2 ? styles.textvalid : styles.textinvalid]}>2</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
          <TouchableOpacity onPress={() => {
              if (highestLevel >= 5) {
                props.navigation.navigate('Gameplay', { level: 5,speed:6});
              }
            }}
            >
            <Text style={[styles.level, highestLevel >= 5 ? styles.textvalid : styles.textinvalid]}>5</Text>
          </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
          <TouchableOpacity onPress={() => {
              if (highestLevel >= 8) {
                props.navigation.navigate('Gameplay', { level: 8, speed:9 });
              }
            }}
            >
            <Text style={[styles.level, highestLevel >= 8 ? styles.textvalid : styles.textinvalid]}>8</Text>
          </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <Text style={[styles.level, highestLevel >= 11 ? styles.textvalid : styles.textinvalid]}>11</Text>
          </Row>
        </Col>
        <Col>
          <Row style={styles.row}>
            <TouchableOpacity onPress={() => {
              if (highestLevel >= 3) {
                props.navigation.navigate('Gameplay', { level: 3,speed:2.994 , duration: 17500});
              }
            }}
            >
              <Text style={[styles.level, highestLevel >= 3 ? styles.textvalid : styles.textinvalid]}>3</Text>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
          <TouchableOpacity onPress={() => {
              if (highestLevel >= 6) {
                props.navigation.navigate('Gameplay', { level: 6,speed:7 });
              }
            }}
            >
            <Text style={[styles.level, highestLevel >= 6 ? styles.textvalid : styles.textinvalid]}>6</Text>
          </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
          <TouchableOpacity onPress={() => {
              if (highestLevel >= 9) {
                props.navigation.navigate('Gameplay', { level: 9,speed:10 });
              }
            }}
            >
            <Text style={[styles.level, highestLevel >= 9 ? styles.textvalid : styles.textinvalid]}>9</Text>
          </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <Text style={[styles.level, highestLevel >= 12 ? styles.textvalid : styles.textinvalid]}>12</Text>
          </Row>
        </Col>
      </Grid>
    </View>
  );
};

LevelScreen.navigationOptions = {
  title: 'Levels',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE632',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 7,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: '#ffffff',
  },
  level: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  grid: {
    width: '90%',
    flex: 5,
    marginBottom: '10%',
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%'
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  textvalid: {
    color: 'white',
  },
  textinvalid: {
    color: 'gray',
    opacity: 0.5,
  },
});
