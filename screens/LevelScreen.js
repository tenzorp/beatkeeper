import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import HexagonsLevels from "../components/HexagonsLevels";
import { Col, Row, Grid } from "react-native-easy-grid";
import { useSelector } from 'react-redux';

export default function LevelScreen(props) {
    const auth = useSelector(state => state.firebase.auth);

    if (auth.highestLevel){
        var highestLevel = auth.highestLevel
    }

    else {
        var highestLevel = 1;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.text}>Choose a level!</Text>
            </View>
            <Grid style={styles.grid}>
                <Col>
                    <Row style={styles.row}>
                        <TouchableOpacity onPress={()=> {
                                if (highestLevel>=1){
                                    props.navigation.navigate('Gameplay',{level:1})    
                                }
                        }}>
                            <Text style={[styles.level, highestLevel>=1 ? styles.textvalid : styles.textinvalid]}>1</Text>
                        </TouchableOpacity>
                    </Row>
                    <Row style={styles.row}>
                        <TouchableOpacity onPress={()=> {
                                if (highestLevel>=4){
                                    props.navigation.navigate('Gameplay',{level:4})    
                                }
                        }}>
                            <Text style={[styles.level, highestLevel>=4 ? styles.textvalid : styles.textinvalid]}>4</Text>
                        </TouchableOpacity>
                    </Row>
                    <Row style={styles.row}>
                            <Text style={[styles.level, highestLevel>=7 ? styles.textvalid : styles.textinvalid]}>7</Text>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=10 ? styles.textvalid : styles.textinvalid]}>10</Text>
                    </Row>
                </Col>
                <Col>
                    <Row style={styles.row}>
                    <TouchableOpacity onPress={()=> {
                                if (highestLevel>=2){
                                    props.navigation.navigate('Gameplay',{level:2})    
                                }
                        }}>
                        <Text style={[styles.level, highestLevel>=2 ? styles.textvalid : styles.textinvalid]}>2</Text>
                        </TouchableOpacity>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=5 ? styles.textvalid : styles.textinvalid]}>5</Text>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=8 ? styles.textvalid : styles.textinvalid]}>8</Text>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=11 ? styles.textvalid : styles.textinvalid]}>11</Text>
                    </Row>
                </Col>
                <Col>
                    <Row style={styles.row}>
                    <TouchableOpacity onPress={()=> {
                                if (highestLevel>=3){
                                    props.navigation.navigate('Gameplay',{level:3})    
                                }
                        }}>
                        <Text style={[styles.level, highestLevel>=3 ? styles.textvalid : styles.textinvalid]}>3</Text>
                    </TouchableOpacity>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=6 ? styles.textvalid : styles.textinvalid]}>6</Text>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=9 ? styles.textvalid : styles.textinvalid]}>9</Text>
                    </Row>
                    <Row style={styles.row}>
                        <Text style={[styles.level, highestLevel>=12 ? styles.textvalid : styles.textinvalid]}>12</Text>
                    </Row>
                </Col>
            </Grid>
        </View>
    );
}

LevelScreen.navigationOptions = {
    title: 'Levels',
    header: null
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
        color: '#ffffff'
    },
    grid: {
        width: '90%',
        flex: 5,
        marginBottom: '10%',
    },
    headerView:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    textvalid: {
        color: 'white',
    },
    textinvalid: {
        color: 'gray',
        opacity: 0.5,
    },
});
