import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import MPStackNavigator from "./MPStackNavigator";

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Levels: LevelScreen,
    Multiplayer: MPStackNavigator
}, {
    initialRouteName: 'Home'
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
