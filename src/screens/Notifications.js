import React, {Component} from 'react';

import {
  Button,
  View,
  Text
} from 'react-native';


export default class NotificationsScreen extends Component {

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View>
      <Button
        title="Go back to home tab"
        onPress={() => goBack()}
      />
      <Text > Notifications Settings Screen </Text>
      </View>
    );
  }
}