import { createStackNavigator } from 'react-navigation-stack';

import DifficultyScreen from '../screens/DifficultyScreen';
import NumPlayersScreen from '../screens/NumPlayersScreen';

const MPStackNavigator = createStackNavigator({
    NumPlayers: NumPlayersScreen,
    Difficulty: DifficultyScreen
  },
  {
    initialRouteName: 'NumPlayers'
  });

MPStackNavigator.navigationOptions = {
  header: null
}

export default MPStackNavigator;
