import { createStackNavigator } from 'react-navigation-stack';

import ModeScreen from '../screens/ModeScreen';
import LevelScreen from '../screens/LevelScreen';
import DifficultyScreen from '../screens/DifficultyScreen';
import HexagonsLevels from '../components/HexagonsLevels';
import GameplayScreen from '../screens/GameplayScreen';
import FeedBackScreen from '../screens/FeedBackScreen';

const SPStackNavigator = createStackNavigator({
  Mode: ModeScreen,
  Levels: LevelScreen,
  Hexagons: HexagonsLevels,
  Gameplay: GameplayScreen,
  Feedback: FeedBackScreen,
},
{
  initialRouteName: 'Mode',
});

SPStackNavigator.navigationOptions = {
  header: null,
};

export default SPStackNavigator;
