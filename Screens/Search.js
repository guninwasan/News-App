import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Linking,
  RefreshControl,

} from "react-native";

import { SearchBar } from 'react-native-elements'
import { getNewsArticles } from '../news'
import { styles } from '../styleSheet'
import changeAPIkey from '../Config/changeAPI'
import '../global'


const Item = ({ title, url, urlToImage }) => {
  return (

    <SafeAreaView style={styles.container}>


      <View style={styles.card_container}>
        <View style={styles.card_template}>

          <TouchableOpacity onPress={() => {
            Linking.openURL(url)
          }}
          >
            <Image

              style={styles.card_image}
              source={{ uri: urlToImage }}
            />
            <View style={styles.text_container}>
              <Text style={styles.card_title}>
                {title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
      <Text>     </Text>

    </SafeAreaView>

  );
};

const renderItem = ({ item }) => {
  return (

    <SafeAreaView style={styles.container}>


      <View style={styles.card_container}>
        <View style={styles.card_template}>

          <TouchableOpacity onPress={() => {
            Linking.openURL(item.url)
          }}
          >
            <Image

              style={styles.card_image}
              source={{ uri: item.urlToImage }}
            />
            <View style={styles.text_container}>
              <Text style={styles.card_title}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
      <Text>     </Text>

    </SafeAreaView>

  );

};

var allData = [];
var generalData = [];
var sportsData = [];
var entertainmentData = [];
var healthData = [];
var scienceData = [];
var techData = [];


export default class Search extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      searchValue: '',
    };

  }

  componentDidMount() {
    category = 'general'
    getNewsArticles().then(data => {

      if (data == undefined) {
        alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
        changeAPIkey();
        this.componentDidMount();
        return;
      }

      this.setState({
        generalSource: data,
      });
      generalData = data

      category = 'sports'
      getNewsArticles().then(data => {


        if (data == undefined) {
          alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
          changeAPIkey();
          this.componentDidMount();
          return;
        }

        this.setState({
          sportsSource: data,
          dataSource: data,
        });
        sportsData = data

      }, error => {
        Alert.alert('Error', 'Something went wrong!')
      }
      )

      category = 'entertainment'
      getNewsArticles().then(data => {


        if (data == undefined) {
          alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
          changeAPIkey();
          this.componentDidMount();
          return;
        }

        this.setState({
          sportsSource: data,
          dataSource: data,
        });
        entertainmentData = data

      }, error => {
        Alert.alert('Error', 'Something went wrong!')
      }
      )


      category = 'health'
      getNewsArticles().then(data => {


        if (data == undefined) {
          alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
          changeAPIkey();
          this.componentDidMount();
          return;
        }

        this.setState({
          sportsSource: data,
          dataSource: data,
        });
        healthData = data

      }, error => {
        Alert.alert('Error', 'Something went wrong!')
      }
      )


      category = 'science'
      getNewsArticles().then(data => {


        if (data == undefined) {
          alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
          changeAPIkey();
          this.componentDidMount();
          return;
        }

        this.setState({
          sportsSource: data,
          dataSource: data,
        });
        scienceData = data

      }, error => {
        Alert.alert('Error', 'Something went wrong!')
      }
      )


      category = 'technology'
      getNewsArticles().then(data => {


        if (data == undefined) {
          alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
          changeAPIkey();
          this.componentDidMount();
          return;
        }

        this.setState({
          loading: false,
          sportsSource: data,
          dataSource: data,
          refreshing: false,
        });
        techData = data

      }, error => {
        Alert.alert('Error', 'Something went wrong!')
      }
      )

      category = 'general'

      this.arrayholder = data;
    }, error => {
      Alert.alert('Error', 'Something went wrong!')
    }

    )
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount();
  }

  renderData = () => {
    allData = generalData.concat(sportsData, entertainmentData, healthData, scienceData, techData)
    this.arrayholder = allData;
  }
  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {

      var item_data = `${item.title.toUpperCase()})`;
      item_data += ' ';

      if (item.content != null) {
        item_data += `${item.content.toUpperCase()})`;
      }

      item_data += ' ';
      if (item.description != null) {
        item_data += `${item.description.toUpperCase()})`;
      }

      const text_data = text.toUpperCase();

      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ dataSource: updatedData, searchValue: text });
  };

  render() {
    this.renderData();
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.news_title}> NEWS </Text>
        <SearchBar
          placeholder="Search News Articles...."
          round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <FlatList
            data={this.state.dataSource}
            renderItem={
              renderItem
            }
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
