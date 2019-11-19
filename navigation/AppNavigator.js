import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import DifficultyScreen from "../screens/DifficultyScreen";

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Levels: LevelScreen,
    Difficulty: DifficultyScreen
}, {
    initialRouteName: 'Home'
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
