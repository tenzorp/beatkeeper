import { createStackNavigator } from 'react-navigation-stack';

import ModeScreen from '../screens/ModeScreen';
import LevelScreen from '../screens/LevelScreen';
import GameplayScreen from '../screens/GameplayScreen';
import FeedBackScreen from '../screens/FeedBackScreen';

const SPStackNavigator = createStackNavigator({
  Mode: ModeScreen,
  Levels: LevelScreen,
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
