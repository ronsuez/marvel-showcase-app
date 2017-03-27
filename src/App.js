import React from 'react';

import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';


import {Icon} from 'react-native-elements';

import MainScreen from './screens/Main';
import SetupScreen from './screens/Setup';
import DetailScreen from './screens/Detail';
import SettingsScreen from './screens/Settings';
import NotificationsScreen from './screens/Settings';

import ComicScreen from './screens/marvel/Comic';
import SerieScreen from './screens/marvel/Serie';


export const MainStack = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: 'Home',
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      title: ({state}) => `${state.params.name}`,
    }
  },
  ComicDetail: {
    screen: ComicScreen,
    navigationOptions: {
      title: ({state}) => `${state.params.name}`,
    }
  },
  SerieDetail: {
    screen: SerieScreen,
    navigationOptions: {
      title: ({state}) => `${state.params.name}`,
    }
  }
});


const MainTabs = TabNavigator({
  Main: {
    screen: MainStack,
    navigationOptions: {
      tabBar: {
        label: 'Home',
        icon: ({tintColor}) => <Icon  name="list" size={35} color={tintColor}/>
      }
    }
  },
  Setup: {
    screen: SetupScreen,
    navigationOptions: {
      title: 'Profile',
      tabBar: {
        label: 'Profile',
        icon: ({tintColor}) => <Icon  name="account-circle" size={35} color={tintColor}/>
      }
    }
  }
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings'
    }
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: 'Notifications'
    }
  }
});




export const RootNavigator = StackNavigator({
  Tabs: {
    screen: MainTabs
  },
  Settings: {
    screen: SettingsStack
  }
},
{
  headerMode: 'none',
  mode: 'modal'
});