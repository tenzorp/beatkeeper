import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import DifficultyScreen from "../screens/DifficultyScreen";
import MPStackNavigator from "./MPStackNavigator";
import NumPlayersScreen from '../screens/NumPlayersScreen'

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Levels: LevelScreen,
    Difficulty: DifficultyScreen,
    NumPlayers: NumPlayersScreen  // note: i just learned the left side has to be the right side minus 'screen'
}, {
    initialRouteName: 'Home'
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
