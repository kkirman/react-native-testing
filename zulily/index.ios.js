/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Image,
  ScrollView,
  AlertIOS
} from 'react-native';

var SimpleList = React.createClass({
  getInitialState: function() {
    return {
      events: []
    };
  },
  componentDidMount: function() {
    fetch('http://localhost:3030/js/newtoday.json', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((result) => {
      var Section = result.response.section;
      var OneColSections = Section.one_column_frame_v1.sections;
      var MasonryItems = OneColSections[1].event_masonry_v1.items;
      this.setState({
        events: MasonryItems
      });
    })
  },
  render: function() {
    var eventItems = this.state.events.map(function(item,idx){
        if(item.event_v1 && idx < 20){
          var FormattedImageUrl = item.event_v1.event.image_url.replace("{width}x{height}","300x300");
          var event = item.event_v1.event;
          return <StandardEvent src={FormattedImageUrl} title={event.name} description={event.event_highlights} meta={event.meta_description} key={event.id} />
        }
    });

    var eventItems2 = this.state.events.map(function(item,idx){
        if(item.event_v1 && idx > 40 && idx < 60){
          var FormattedImageUrl = item.event_v1.event.image_url.replace("{width}x{height}","300x300");
          var event = item.event_v1.event;
          return <StandardEvent src={FormattedImageUrl} title={event.name} description={event.event_highlights} meta={event.meta_description} key={event.id} />
        }
    });

    var billboardItems = this.state.events.map(function(item,idx){
        if(item.event_v1 && idx < 40 && idx > 20){
          var FormattedImageUrl = item.event_v1.event.image_url.replace("{width}x{height}","300x300");
          var event = item.event_v1.event;
          return <BillboardEvent src={FormattedImageUrl} title={event.name} description={event.event_highlights} meta={event.meta_description} key={event.id} />
        }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>zulily</Text>
        <ScrollView showsHorizontalScrollIndicator={false} style={[styles.scrollView, styles.verticalScrollView]} horizontal={false}>
          {eventItems}
          <Header title="Best Sellers" key={"1"}/>
          <ScrollView showsHorizontalScrollIndicator={false} style={[styles.scrollView, styles.horizontalScrollView]} horizontal={true}>
            {billboardItems}
          </ScrollView>
          {eventItems2}
        </ScrollView>
      </View>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    )
  }
});

var StandardEvent = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.row}>
        <Image style={styles.img} source={{uri:this.props.src}} />
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
          <Text style={styles.meta}>{this.props.meta}</Text>
        </View>
      </View>
    );
  }
});

var BillboardEvent = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {

    return (
      <View style={styles.column}>
        <Image style={styles.img} source={{uri:this.props.src}} />
        <Text style={styles.billboardTitle}>{this.props.title}</Text>
        <Text style={styles.billboardDescription}>{this.props.description}</Text>
        <Text style={styles.billboardMeta}>{this.props.meta}</Text>
      </View>
    );
  }
});

var VERTICALIMAGES = ['2016_06/2016_0623_190494_adults_keen_hp3_1466453324.jpg','2016_06/2016_0623_190496_kids_keen_hp2_1466453388.jpg','2016_06/181303_kickee_hp_2016_0622_dm3_1466541542.jpg'];
var HORITZONALIMAGES = ['2016_06/2016_0621_btscollege_boxed_hp_01_1466103877.jpg','2016_06/192824_daytimedresses_hp_2016_0622_jmb3_1466609101.jpg','2016_06/191540_cuisinart_hp_2016_0622_cw2_1466533641.jpg','2016_06/174557_littletikes_hp_2016_0621_as4_1466453796.jpg'];
var createStandardRow = (uri, i) => <StandardEvent key={i} uri={uri} />;
var createBillboardRow = (uri, i) => <BillboardEvent key={i} uri={uri} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  rowContainer: {
    flex: 1,
  },
  list: {
       flex: 1,
       flexDirection: 'column'
  },
  scrollView: {
    backgroundColor: '#EEE',
  },
  horizontalScrollView: {
    height: 200
  },
  verticalScrollView: {

  },
  header: {
    height:50
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: 3
  },
  billboardTitle: {
    textAlign: 'center',
    fontSize: 13,
    paddingTop: 2
  },
  billboardDescription: {
    fontSize: 10
  },
  billboardMeta: {
    fontSize: 10,
    color: 'maroon'
  },
  description:{
    textAlign: 'center',
    fontSize: 11
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
  meta: {
    color: 'maroon',
    textAlign: 'center',
    fontSize: 11
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginRight: 3,
    marginBottom: 3
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginBottom: 3
  },
  img: {
    width: 150,
    height: 150,
  }
});

AppRegistry.registerComponent('zulily', () => SimpleList);
