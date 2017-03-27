import React, {Component} from 'react';

import {
  Button,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import {Tile, List, ListItem, Text, Card} from 'react-native-elements';

import {SectionList} from '../components';

export default  class DetailScreen extends Component {

  onPressItem(item) {
    console.log(item);
    this.props.navigation.navigate('ComicDetail', {...item});
  }

  render() {
    const { goBack, state } = this.props.navigation;
    const {name, avatar_url, picture, description, comics, series} = state.params;
    console.log(state.params);
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: picture.large}}
          featured
          title={name}
          caption={description}
        />

        <SectionList 
            title={"Comics"} 
            items={comics.items.slice(0, 5)} 
            onPressItem={(item) => this.onPressItem(item)}/>

        <SectionList 
            title={"Series"} 
            items={series.items.slice(0, 5)} 
            onPressItem={(item) => this.onPressItem(item)}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 10,
    marginLeft: 10
  }
});
