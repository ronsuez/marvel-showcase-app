import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';

import {Tile, List, ListItem, Text, Card} from 'react-native-elements';


const SectionList = (props) => {
    return (
        <View>
            <Text h4 style={styles.title}>{props.title} </Text>

            <List>
                {
                    props.items.length ? props.items.map((item, key) => {
                        return (
                            <ListItem
                            key={key}
                            title={item.name}
                            subtitle={item.subtitle}
                            onPress={() => props.onPressItem(item)}
                        />
                        )
                    }) : (
                        <ListItem
                            key={0}
                            title={"No Data Available"}
                            onPress={() => null} />
                    )
                    
                }
            </List>
    </View>
    )
};


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


export default SectionList;