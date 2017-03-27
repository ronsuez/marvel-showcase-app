import React, {Component} from 'react';

import {
  Button,
  View,
  Text
} from 'react-native';


export default class SettingScreen extends Component {

  render() {
    const { goBack, navigate} = this.props.navigation;
    return (
      <View>
      <Button
        title="Go back to home tab"
        onPress={() => goBack()}
      />
      <Text > Settings Screen </Text>

      <Button
        title="Notifications"
        onPress={() => navigate('Notifications')}
      />
      </View>
    );
  }
}