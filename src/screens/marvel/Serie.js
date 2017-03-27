import React, {Component} from 'react';

import {
  Button,
  View,
  Text
} from 'react-native';


export default  class DetailScreen extends Component {

  render() {
    const { goBack , navigate} = this.props.navigation;
    return (
      <View>
        <Text> Profile </Text>
      <Button
        title="Go back to home tab"
        onPress={() => goBack()}
      />

      <Button
        title="Go settings!! tab"
        onPress={() =>  navigate('Settings')}
      />

      </View>
    );
  }
}