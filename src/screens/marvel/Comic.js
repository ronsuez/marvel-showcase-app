import React, {Component} from 'react';

import MarvelApi from '../../api/marvel';

import {SectionList, LoadingScreen}  from '../../components';

import {Tile, List, ListItem, Text, Card} from 'react-native-elements';


import {
  Button,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';


export default  class ComicScreen extends Component {

  constructor(props) {
    super(props);
    const {resourceURI} = this.props.navigation.state.params;
    
    this.MarvelApi = new MarvelApi();

    console.log(this.props.navigation.state.params);

    this.identificator = resourceURI.substring(resourceURI.lastIndexOf('/') + 1);

    this.state = {
      fetching: false,
      data: {}
    }
    
  }
  componentWillMount(){
    console.log('component will mount');
    
    this.setState({fetching: true});

    this.MarvelApi.fetchComics(this.identificator).then((resp) => {
    
    let item = resp.results[0];

    this.setState({
      data: {
        name: item.title,
        description: item.description,
        picture: {
              large: `${item.thumbnail.path}/landscape_large.${item.thumbnail.extension}`.replace(/^http:\/\//i, 'https://')
        },
        creators: item.creators,
        characters: item.characters
      }
    })

    console.log(item);
   }).catch((err) => {
     console.log(err);
   }).finally(() => {
      this.setState({fetching: false});
   });

  }

  _renderComicDetail () {

    const {data} = this.state;
  
    return (
        <ScrollView>
        <Tile
          imageSrc={{ uri: data.picture.large}}
          featured
          title={data.name}
          caption={data.description}
        />

        <SectionList 
            title={"Characters"} 
            items={data.characters.items.slice(0, 5)} 
            onPressItem={() => null}/>

        <SectionList 
            title={"Creators"} 
            items={data.creators.items.map((item) => {
              return {name: item.name, subtitle: item.role};
            })} 
            onPressItem={() => null}/>
      
      </ScrollView>
    )
  }
  render() {
    const { goBack , navigate, state} = this.props.navigation;
    const {name} = state.params;
    const {fetching} = this.state;
    return (
      <View>
      {fetching ? (<LoadingScreen />): this._renderComicDetail()}
      </View>
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
