import React from "react";
import {
  View,
  ActivityIndicator,
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

import { Card, SearchBar } from 'react-native-elements'
import { getNewsArticles } from '../news'
import Modal from "react-native-modal";
import '../global'

import { countryData } from '../Config/country_data'
import { styles } from '../styleSheet'
import changeAPIkey from '../Config/changeAPI'

export default class Home_Page extends React.Component {

  constructor(props) {
    category='general'
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      countryDataSource: countryData.sort((a, b) => a.name.localeCompare(b.name)),
      activeCardColor: activeCard,
      activeListColor: activeList,
      showCountryList: false,
      refreshing: false,
      searchValue: '',
      showFlag: '🌎',
    };
  }

  componentDidMount() {

    getNewsArticles().then(data => {
      if (data == undefined) {
        alert("API Limit reached for the day so needed to switch to a new one. Sorry for the inconvenience.")
        changeAPIkey();
        this.componentDidMount();
        return;
      }


      this.setState({
        loading: false,
        dataSource: data,
        refreshing: false,
        activeCardColor: activeCard,
        activeListColor: activeList,
        showFlag: currentFlag,
      });
      this.arrayholder = this.state.countryDataSource
    }, error => {
      Alert.alert('Error', 'Something went wrong!')
    }

    )
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount();
  }


  showCountries = ({ item }) => {
    return (

      <SafeAreaView style={styles.country_container}>

        <TouchableOpacity onPress={() => {
          country_code = item.code;
          currentFlag = item.flag;
          this.setState({
            showCountryList: false,
            showFlag: item.flag,
            countryDataSource: countryData.sort((a, b) => a.name.localeCompare(b.name)),
            searchValue: '',
          });
          this.componentDidMount();

        }}>

          <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderWidth: 1, padding: 10, borderColor: 'gray' }}>
            <Text style={{ fontFamily: 'Times New Roman', fontSize: 24 }}> {item.flag} </Text>
            <Text>  </Text>
            <Text style={{ fontFamily: 'Times New Roman', fontSize: 24, color: 'white' }}> {item.name} </Text>
          </View>

        </TouchableOpacity>
      </SafeAreaView>

    );

  };




  checkClickCardView = () => {
    if (this.state.activeCardColor == false) {
      lisCardView = false;
      activeCard = true;
      activeList = false;

      this.setState({
        activeCardColor: true,
        activeListColor: false,
      });
    }
  }

  checkClickListView = () => {
    if (this.state.activeListColor == false) {

      lisCardView = true;
      activeCard = false;
      activeList = true;

      this.setState({
        activeListColor: true,
        activeCardColor: false,
      });
    }
  }



  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {

      var item_data = `${item.name.toUpperCase()})`;

      const text_data = text.toUpperCase();

      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ countryDataSource: updatedData, searchValue: text });
  };


  render() {


    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
          <Text> Loading.... </Text>
        </View>
      );
    }


    return (


      <SafeAreaView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


          <View style={{ justifyContent: 'flex-end' }}>


            <TouchableOpacity onPress={() => {
              this.setState({ showCountryList: true })
            }}>

              <Text
                style={styles.country_change_image}>

                {this.state.showFlag}

              </Text>
            </TouchableOpacity>

          </View>

          <View style={{ flexGrow: 1 }}>

            <Text style={styles.country_news_title}>NEWS</Text>

          </View>

        </View>


        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }


        >

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', right: 10, }}>

            <TouchableOpacity onPress={this.checkClickCardView}>
              {
                this.state.activeCardColor ? <Text style={styles.active_card_list_color}>
                  Card View </Text>
                  :
                  <Text style={styles.inactive_card_list_color}> Card View </Text>
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={this.checkClickListView}>
              {
                this.state.activeListColor ?
                  <Text style={styles.active_card_list_color}>
                    List View
                </Text>
                  :
                  <Text style={styles.inactive_card_list_color}> List View </Text>
              }
            </TouchableOpacity>
          </View>

          <Modal isVisible={this.state.showCountryList}>
            <SafeAreaView>

              <TouchableOpacity onPress={() => {
                this.setState({
                  showCountryList: false,
                  countryDataSource: countryData.sort((a, b) => a.name.localeCompare(b.name)),
                  searchValue: '',
                })
              }}>
                <SafeAreaView>
                  <Text style={styles.close_modal}> X </Text>
                </SafeAreaView>

              </TouchableOpacity>

              <ScrollView>

                <SearchBar
                  placeholder="Search Country...."
                  round
                  value={this.state.searchValue}
                  onChangeText={(text) => this.searchFunction(text)}
                  autoCorrect={false}
                />

                <FlatList
                  data={this.state.countryDataSource}
                  renderItem={
                    this.showCountries
                  }
                  keyExtractor={(item) => item.id}
                />
              </ScrollView>

            </SafeAreaView>


          </Modal>

          {
            this.state.dataSource.map(function (item, index) {

              return (

                <View>

                  {

                    lisCardView ?

                      <SafeAreaView style={styles.container} key={item[index]}>

                        <Card style={styles.card_style}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              style={styles.image_style}
                              source={{ uri: item.urlToImage }}
                            />
                            <Text>    </Text>
                            <Text style={styles.head_lines}>
                              {item.title}
                            </Text>
                          </View>

                          <Text>   </Text>

                          <View style={{ alignSelf: 'flex-end' }}>
                            <TouchableOpacity onPress={() => {
                              Linking.openURL(item.url)
                            }}
                            >
                              <Text style={styles.learn_more_text}> Learn More >
                                        </Text>
                            </TouchableOpacity>
                          </View>

                        </Card>


                      </SafeAreaView>


                      :

                      <SafeAreaView style={styles.container} key={item[index]}>
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

                  }
                </View>
              );
            })

          }

          <Text>     </Text>
          <Text>     </Text>
          <Text>     </Text>
          <Text>     </Text>


        </ScrollView>
      </SafeAreaView>

    );
  }
}
