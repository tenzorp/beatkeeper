import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import MPStackNavigator from './MPStackNavigator';
import SPStackNavigator from './SPStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  SinglePlayer: SPStackNavigator,
  Multiplayer: MPStackNavigator,
  Profile: ProfileScreen,
}, {
  initialRouteName: 'Home',
});

AppNavigator.path = '';

export default createAppContainer(AppNavigator);
