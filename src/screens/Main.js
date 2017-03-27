import React, {Component} from 'react';

import {ListView, Text, View} from 'react-native';

import { List, ListItem , Button, SearchBar} from 'react-native-elements'

import MarvelApi from '../api/marvel';

import {LoadingScreen} from '../components/';

export default class MainScreen extends Component {
  
  constructor() {
    super();
    
    this.MarvelApi = new MarvelApi();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([]),
      fetching: false,
      searchText: ''
    }

  }
  

  componentWillMount() {
    this.fetchFromApi();
  }
  
  fetchFromApi() {
    this.setState({fetching: true, fecthFromApi: false});

    this.MarvelApi.fetchCharacters(this.state.searchText ).then((resp) => {
      
      let data = resp.results.map((item) => {
            return Object.assign(item, {
              name: item.name,
              avatar_url: `${item.thumbnail.path}/portrait_small.${item.thumbnail.extension}`.replace(/^http:\/\//i, 'https://'),
              subtitle: item.name,
              thumbnail: item.thumbnail,
              series: item.series,
              comics: item.comics,
              picture: {
                large: `${item.thumbnail.path}/landscape_large.${item.thumbnail.extension}`.replace(/^http:\/\//i, 'https://')
              },
              description: item.description
            })
      });

      this.setState({
        fetching: false,
        data,
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
      
    }).catch((err) => {
      console.log(err);
    })
  }
  onPressItem = (item) => {
    console.log(item);
    this.props.navigation.navigate('Detail', {...item});
  }

  renderRow(rowData, sectionID) {
    return (
        <ListItem
          roundAvatar
          key={sectionID}
          title={rowData.name}
          subtitle={rowData.subtitle}
          avatar={{uri:rowData.avatar_url}}
          onPress={() => this.onPressItem(rowData)}
        />
      )
  }

  renderSearchBar() {
    return (
          <SearchBar
            autoCorrect={false}
            lightTheme
            onChangeText={(text) => { this.filterList(text)}}
            placeholder='Search hero...' />       
    )
  }


  renderList() {
  

    if (this.state.fetching || this.state.fecthFromApi) {
      return (<LoadingScreen />);
    }

    return (
      <View>
        <List containerStyle={{marginBottom: 0}}>
            <ListView
            enableEmptySections={true}
            renderRow={this.renderRow.bind(this)}
            dataSource={this.state.dataSource}
          />
      </List>
    </View>)
  }

  filterList(searchText) {

    let text = searchText.toLowerCase();

    let filteredData = this.state.data.filter((n) => {
      let note = n.name.toLowerCase();
      return note.search(text) !== -1;
    });
    
    if(!filteredData.length) {
      this.setState({
        fecthFromApi: true,
        searchText: searchText
      });
    } else {
       this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredData)
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const {dataSource, fetching, fecthFromApi} = this.state;
    return (
      <View>
          <View>
            { this.renderSearchBar() }
          </View>
          <View>
            {fecthFromApi ? this.fetchFromApi() : this.renderList()}
          </View>
        </View>
    );
  }
}