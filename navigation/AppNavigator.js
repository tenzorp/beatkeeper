import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import GameplayScreen from '../screens/GameplayScreen';
import MPStackNavigator from "./MPStackNavigator";
import HexagonsLevels from "../components/HexagonsLevels";
import FeedBackScreen from '../screens/FeedBackScreen';

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Levels: LevelScreen,
    Multiplayer: MPStackNavigator,
    Hexagons: HexagonsLevels,
    Gameplay: GameplayScreen,
    Feedback: FeedBackScreen
}, {
    initialRouteName: 'Home'
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
