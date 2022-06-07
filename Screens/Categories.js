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
} from "react-native";

import { getNewsArticles } from '../news'
import { styles } from '../styleSheet'
import changeAPIkey from '../Config/changeAPI'
import '../global'

export default class Categories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
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

        <Text style={styles.news_title}> NEWS </Text>

        <ScrollView>


          <SafeAreaView style={styles.container}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, color: 'blue' }}> Browse specific sections </Text>
            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'sports'
                  categoryName = 'SPORTS'
                  this.props.navigation.navigate("Sub Category")
                }}
                >

                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://newsonair.com/wp-content/uploads/2022/04/6-2.jpeg' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={styles.categories_card_title}>
                      SPORTS
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>


            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'business'
                  categoryName = "BUSINESS"
                  this.props.navigation.navigate("Sub Category")
                }}
                >
                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://indianmarketview.com/wp-content/uploads/Daily-Morning-News.jpg' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={{

                      fontWeight: 'bold',
                      fontFamily: 'Times New Roman',
                      fontSize: 20,
                      justifyContent: 'center',
                      color: 'white',
                      padding: 10,
                      textAlign: 'center',
                      backgroundColor: 'black'

                    }}>
                      BUSINESS
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>

            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'entertainment'
                  categoryName = "ENTERTAINMENT"
                  this.props.navigation.navigate("Sub Category")
                }}
                >
                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://thumbs.dreamstime.com/b/megaphone-hand-business-concept-text-celebrity-news-megaphone-hand-business-concept-text-celebrity-news-vector-110860191.jpg' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={{

                      fontWeight: 'bold',
                      fontFamily: 'Times New Roman',
                      fontSize: 20,
                      justifyContent: 'center',
                      color: 'white',
                      padding: 10,
                      textAlign: 'center',
                      backgroundColor: 'black'

                    }}>
                      ENTERTAINMENT
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>


            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'general'
                  categoryName = "GENERAL"
                  this.props.navigation.navigate("Sub Category")
                }}
                >
                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtOP38wTksXWi3uU_5zSL7R2xI0QRiaUD7A&usqp=CAU' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={styles.categories_card_title}>
                      GENERAL
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>

            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'health'
                  categoryName = "HEALTH"
                  this.props.navigation.navigate("Sub Category")
                }}
                >
                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://cdn4.iconfinder.com/data/icons/medical-health-set-2-glyph/33/medical_news-512.png' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={{

                      fontWeight: 'bold',
                      fontFamily: 'Times New Roman',
                      fontSize: 20,
                      justifyContent: 'center',
                      color: 'white',
                      padding: 10,
                      textAlign: 'center',
                      backgroundColor: 'black'

                    }}>
                      HEALTH
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>


            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'science'
                  categoryName = "SCIENCE"
                  this.props.navigation.navigate("Sub Category")
                }}
                >
                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://cdn2.iconfinder.com/data/icons/science-navy-vol-2/64/Science_News-512.png' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={styles.categories_card_title}>
                      SCIENCE
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>


            <View style={styles.categories_card_container}>
              <View style={styles.card_template}>

                <TouchableOpacity onPress={() => {
                  category = 'technology'
                  categoryName = "TECH"
                  this.props.navigation.navigate("Sub Category")
                }}
                >
                  <Image

                    style={styles.card_image}
                    source={{ uri: 'https://matrixti.com/wp-content/uploads/2016/04/News-000047080356-cropped.jpg' }}
                  />
                  <View style={styles.text_container}>
                    <Text style={{

                      fontWeight: 'bold',
                      fontFamily: 'Times New Roman',
                      fontSize: 20,
                      justifyContent: 'center',
                      color: 'white',
                      padding: 10,
                      textAlign: 'center',
                      backgroundColor: 'black'

                    }}>
                      TECHNOLOGY
                      </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
            <Text>     </Text>
            <Text>     </Text>
            <Text>     </Text>
            <Text>     </Text>

          </SafeAreaView>

        </ScrollView>

      </SafeAreaView>

    );
  }
}
