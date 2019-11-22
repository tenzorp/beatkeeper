import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import GameplayScreen from '../screens/GameplayScreen';
import MPStackNavigator from "./MPStackNavigator";
import HexagonsLevels from "../components/HexagonsLevels";

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    Levels: LevelScreen,
    Multiplayer: MPStackNavigator,
    Hexagons: HexagonsLevels,
    Gameplay: GameplayScreen,
}, {
    initialRouteName: 'Home'
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
