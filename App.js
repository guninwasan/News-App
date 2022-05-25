import React from "react";
import {
  StyleSheet,
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
  TextInput,
  StatusBar,
  Appbar,
  Menu,


} from "react-native";

import { Card, SearchBar } from 'react-native-elements'
import { Portal, FAB, Provider, ProgressBar, Colors, Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import filter from 'lodash.filter';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getNewsArticles } from './news'
import {
  ListItem,
  Left,
  Thumbnail,
  Container,
  Content,
  List,
  NativeBaseProvider,
} from 'native-base'

import {connect} from 'react-redux'



// country_code='us'
category='general'

var lisCardView=false;

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();



class Home_Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      activeCardColor: true,
      activeListColor: false,
    };
  }

  componentDidMount() {
    getNewsArticles().then(data => {
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
    if(this.state.activeCardColor==false){
      lisCardView=false;
      this.setState({
        activeCardColor: true,
        activeListColor: false,
      });
    }
  }

  checkClickListView= () => {
    if(this.state.activeListColor==false){
      lisCardView=true;
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

      <Text style={styles.news_title}> NEWS </Text>

      

      <ScrollView>

      <View style={{flexDirection:'row', justifyContent: 'flex-end', right: 10,}}>

          <TouchableOpacity onPress={this.checkClickCardView}>
              {
                this.state.activeCardColor?<Text style={styles.active_card_list_color}> 
                Card View </Text>
                :
                <Text style={styles.inactive_card_list_color}> Card View </Text>
              }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.checkClickListView}>
              {
                this.state.activeListColor?
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

                  lisCardView?

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
                        source={{uri: item.urlToImage}}
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

      </ScrollView>
      </SafeAreaView>

    );


  }

}



class Card_Page extends React.Component { 

    constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    getNewsArticles().then(data => {
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

      <ScrollView
      bounces={false}
      >
        {
          this.state.dataSource.map(function (item, index) {

            return (

              <SafeAreaView style={styles.container} key={item[index]}>


                <View style={styles.card_container}>
          <View style={styles.card_template}>

          <TouchableOpacity onPress={() => {
                      Linking.openURL(item.url)
                    }}
                >
            <Image 
              
              style={styles.card_image}
              source={{uri: item.urlToImage}}
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
          })

        }

      </ScrollView>
      </SafeAreaView>

    );


  }

}


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
              source={{uri: urlToImage}}
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
              source={{uri: item.urlToImage}}
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

class Search extends React.Component { 


    constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      searchValue: '',
    };
     
    }

    componentDidMount() {
    getNewsArticles().then(data => {
      this.setState({
        loading: false,
        dataSource: data
      });
      this.arrayholder = data;
    }, error => {
      Alert.alert('Error', 'Something went wrong!')
    }

    )
  }


  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ dataSource: updatedData, searchValue: text });
  };
  
  render() {
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
        <FlatList
          data={this.state.dataSource}
          renderItem={
            renderItem
          }
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}



class SubCategory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      activeCardColor: true,
      activeListColor: false,
    };
  }

  componentDidMount() {
    getNewsArticles().then(data => {
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
    if(this.state.activeCardColor==false){
      lisCardView=false;
      this.setState({
        activeCardColor: true,
        activeListColor: false,
      });
    }
  }

  checkClickListView= () => {
    if(this.state.activeListColor==false){
      lisCardView=true;
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

      <Text style={styles.news_title}> NEWS </Text>

      

      <ScrollView>

      <View style={{flexDirection:'row', justifyContent: 'flex-end', right: 10,}}>

          <TouchableOpacity onPress={this.checkClickCardView}>
              {
                this.state.activeCardColor?<Text style={styles.active_card_list_color}> 
                Card View </Text>
                :
                <Text style={styles.inactive_card_list_color}> Card View </Text>
              }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.checkClickListView}>
              {
                this.state.activeListColor?
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

                  lisCardView?

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
                        source={{uri: item.urlToImage}}
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

      </ScrollView>
      </SafeAreaView>

    );


  }

}


class Categories extends React.Component { 

    constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    getNewsArticles().then(data => {
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

      <ScrollView
      bounces={false}
      >
        {
          this.state.dataSource.map(function (item, index) {

            return (

              <SafeAreaView style={styles.container} key={item[index]}>


                <View style={styles.card_container}>
          <View style={styles.card_template}>

          <TouchableOpacity onPress={() => {
                      Linking.openURL(item.url)
                    }}
                >
            <Image 
              
              style={styles.card_image}
              source={{uri: item.urlToImage}}
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
          })

        }

      </ScrollView>
      </SafeAreaView>

    );


  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8EAED',
  },
  card_style: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 10
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  image_style: {
    width: null,
    height: null,
    resizeMode: 'contain',
    flex: 1,
    flexWrap: 'wrap',
  },

  news_title: {
    padding: 10,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    fontSize: 40,
    justifyContent: 'center',
    textAlign: 'center'
  },

  head_lines: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    fontSize: "auto",
    justifyContent: 'center',
  },


  learn_more_text: {
    color: 'blue',
    fontFamily: 'Times New Roman',
    fontSize: 16,
  },


  card_container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card_template:{
    width: 250,
    height: 250,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
  },
  card_image: {
    width: "auto",
    height: 250,
    borderRadius : 10
  },
  text_container:{
    position: "absolute",
    width: 250,
    height: "auto",
    bottom:0,
    padding: 5,
    borderBottomLeftRadius : 10,
    borderBottomRightRadius: 10
  },
  card_title: {
     flex: 1,
     flexWrap: 'wrap', 
     fontWeight: 'bold',
     fontFamily: 'Times New Roman',
     fontSize: "auto",
     justifyContent: 'center',
     color: 'white',
     backgroundColor: 'black',

  },
  active_card_list_color: {
    flex: 1,
    fontFamily: 'Times New Roman',
    color: "blue",
    fontWeight: 'bold',
    textAlign: 'right',
  },

  inactive_card_list_color: {
    flex: 1,
    fontFamily: 'Times New Roman',
    justifyContent: 'right',
  },

});



function BottomTabs() {
  return (
    <Tab.Navigator
          initialRouteName="Home"
          activeColor="#f24c0a"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#f2f2f2' }}>
        <Tab.Screen name="Home" component={Home_Page} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={20} />
          ),
          }}
         />

         <Tab.Screen name="Search" component={Search} 
        options={{
          tabBarLabel: 'Search News',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={20} />
          ),
          }}
         />

         <Tab.Screen name="Categories" component={Categories} 
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="category" color={color} size={20} />
          ),
          }}
         />

      </Tab.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
        <Provider>
          <Stack.Navigator initialRouteName="Home_Page">

            <Stack.Screen name="Home_Page" component={BottomTabs} options={{headerShown:false}}/>
            <Stack.Screen name="Card_Page" component={Card_Page} options={{headerShown:false}}/>
            <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
            <Stack.Screen name="Categories" component={Categories} />

          </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
};


export default App;
