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

import '../global'
import { Card } from 'react-native-elements'
import { getNewsArticles } from '../news'

import { styles } from '../styleSheet'
import changeAPIkey from '../Config/changeAPI'


export default class SubCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      activeCardColor: activeCard,
      activeListColor: activeList,
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
        dataSource: data
      });
    }, error => {
      Alert.alert('Error', 'Something went wrong!')
    }

    )
  }


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



        <View style={{ flexGrow: 1 }}>

          <Text style={styles.subCategory_news_title}> {categoryName} NEWS </Text>
          <TouchableOpacity onPress={() => {
            category = 'general'
            this.props.navigation.goBack()
          }}>

            <Text
              style={styles.back_image}>

              🔙

            </Text>
          </TouchableOpacity>


        </View>



        <ScrollView>

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
