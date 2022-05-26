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
  NativeModules,
  StatusBarIOS,
  PixelRatio,


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
import {RNRestart} from 'react-native-restart'; // Import package from node modules
import * as Updates from 'expo-updates';
import Modal from "react-native-modal";
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';




var lisCardView=false;
var categoryName=" ";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();


const countryData=[
  {
    code: "ae",
    name: 'United Arab Emirates'
    ,flag: '🇦🇪',
  },
  {
    code: "ar",
    name: 'Argentina'
    ,flag: '🇦🇷',
  },
  {
    code: "at",
    name: 'Austria'
    ,flag: '🇦🇹',
  },
  {
    code: "au",
    name: 'Australia'
    ,flag: '🇦🇺',
  },
  {
    code: "be",
    name: 'Belgium'
    ,flag: '🇧🇪',
  },
  {
    code: "bg",
    name: 'Bulgaria'
    ,flag: '🇧🇬',
  },
  {
    code: "br",
    name: 'Brazil'
    ,flag: '🇧🇷',
  },
  {
    code: "ca",
    name: 'Canada'
    ,flag: '🇨🇦',
  },
  {
    code: "ch",
    name: 'Switzerland'
    ,flag: '🇨🇭',
  },
  {
    code: "cn",
    name: 'China'
    ,flag: '🇨🇳',
  },
  {
    code: "co",
    name: 'Colombia'
    ,flag: '🇨🇴',
  },
  {
    code: "cu",
    name: 'Cuba'
    ,flag: '🇨🇺',
  },
  {
    code: "cz",
    name: 'Czech republic'
    ,flag: '🇨🇿',
  },
  {
    code: "de",
    name: 'Germany'
    ,flag: '🇩🇪',
  },
  {
    code: "eg",
    name: 'Egypt'
    ,flag: '🇪🇬',
  },
  {
    code: "fr",
    name: 'France'
    ,flag: '🇫🇷',
  },
  {
    code: "gb",
    name: 'United Kingdom'
    ,flag: '🇬🇧',
  },
  {
    code: "gr",
    name: 'Greece'
    ,flag: '🇬🇷',
  },
  {
    code: "hk",
    name: 'Hong Kong'
    ,flag: '🇭🇰',
  },
  {
    code: "hu",
    name: 'Hungary'
    ,flag: '🇭🇺',
    
  },
  {
    code: "id",
    name: 'Indonesia'
    ,flag: '🇮🇩',
  },
  {
    code: "ie",
    name: 'Ireland'
    ,flag: '🇮🇪',
  },
  {
    code: "in",
    name: 'India'
    ,flag: '🇮🇳',
  },
  {
    code: "it",
    name: 'Italy'
    ,flag: '🇮🇹',
  },
  {
    code: "jp",
    name: 'Japan'
    ,flag: '🇯🇵',
  },
  {
    code: "kr",
    name: 'South Korea'
    ,flag: '🇰🇷',
  },
  {
    code: "lt",
    name: 'Lithuania'
    ,flag: '🇱🇹',
  },
  {
    code: "lv",
    name: 'Latvia'
    ,flag: '🇱🇻',
  },
  {
    code: "ma",
    name: 'Morocco'
    ,flag: '🇲🇴',
  },
  {
    code: "mx",
    name: 'Mexico'
    ,flag: '🇲🇽',
  },
  {
    code: "my",
    name: 'Malaysia'
    ,flag: '🇲🇾',
  },
  {
    code: "ng",
    name: 'Nigeria'
    ,flag: '🇳🇬',
  },
  {
    code: "nl",
    name: 'Netherlands'
    ,flag: '🇳🇱',
  },
  {
    code: "no",
    name: 'Norway'
    ,flag: '🇳🇴',
  },
  {
    code: "nz",
    name: 'New Zealand'
    ,flag: '🇳🇿',
  },
  {
    code: "ph",
    name: 'Philippines'
    ,flag: '🇵🇭',
  },
  {
    code: "pl",
    name: 'Poland'
    ,flag: '🇵🇱',
  },
  {
    code: "pt",
    name: 'Portugal'
    ,flag: '🇵🇹',
  },
  {
    code: "ro",
    name: 'Romania'
    ,flag: '🇷🇴',
  },
  {
    code: "rs",
    name: 'Serbia'
    ,flag: '🇷🇸',
  },
  {
    code: "ru",
    name: 'Russia'
    ,flag: '🇷🇺',
  },
  {
    code: "sa",
    name: 'Saudi Arabia'
    ,flag: '🇸🇦',
  },
  {
    code: "se",
    name: 'Sweden'
    ,flag: '🇸🇪',
  },
  {
    code: "sg",
    name: 'Singapore'
    ,flag: '🇸🇬',
  },
  {
    code: "si",
    name: 'Slovenia'
    ,flag: '🇸🇮',
  },
  {
    code: "sk",
    name: 'Slovakia'
    ,flag: '🇸🇰',
  },
  {
    code: "th",
    name: 'Thailand'
    ,flag: '🇹🇭',
  },
  {
    code: "tr",
    name: 'Turkey'
    ,flag: '🇹🇷',
  },
  {
    code: "tw",
    name: 'Taiwan'
    ,flag: '🇹🇼',
  },
  {
    code: "ua",
    name: 'Ukraine'
    ,flag: '🇺🇦',
  },
  {
    code: "us",
    name: 'United States of America'
    ,flag: '🇺🇸',
  },
  {
    code: "ve",
    name: 'Venezuela'
    ,flag: '🇻🇪',
  },
  {
    code: "za",
    name: 'South Aftrica'
    ,flag: '🇿🇦',
  },
]




class Home_Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      activeCardColor: true,
      activeListColor: false,
      showCountryList: false,
    };
  }



  componentDidMount() {
    console.log("Console.log country_code " + country_code)
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


   showCountries = ({ item }) => {
  return (

              <SafeAreaView style={styles.country_container}>

                <TouchableOpacity onPress={()=>{
                  country_code=item.code;
                  this.setState({
                    showCountryList: false
                  });
                  this.componentDidMount();

                }}>

                  <View style={{flexDirection: 'row', borderBottomColor: 'black', borderWidth: 1, padding: 10, borderColor: 'gray'}}>
                    <Text style={{fontFamily: 'Times New Roman', fontSize: 24}}> {item.flag} </Text>
                    <Text>  </Text>
                    <Text style={{fontFamily: 'Times New Roman', fontSize: 24, color: 'white'}}> {item.name} </Text>
                  </View>

                </TouchableOpacity>
              </SafeAreaView>

            );
  
};

  


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

      <View style={{flexDirection:'row', justifyContent:'space-around'}}>


      <View style={{justifyContent: 'flex-end'}}>

      
        <TouchableOpacity onPress={()=>{
            this.setState({showCountryList: true})
          }}>
        
            <Text
                style={styles.country_change_image}>

                🌎

              </Text>
        </TouchableOpacity>

      </View>

      <View style={{flexGrow: 1}}>

        <Text style={styles.country_news_title}>NEWS</Text>

      </View>

      </View>
      

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

        <Modal isVisible={this.state.showCountryList}>
        <SafeAreaView>

        <Text> X </Text>

        <FlatList
          data={countryData}
          renderItem={
            this.showCountries
          }
          keyExtractor={(item) => item.id}
        />


        </SafeAreaView>


        </Modal>

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

      <Text>     </Text>
      <Text>     </Text>
      <Text>     </Text>
      <Text>     </Text>
      

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



      <View style={{flexGrow: 1}}>

        <Text style={styles.subCategory_news_title}> {categoryName} NEWS </Text>
        <TouchableOpacity onPress={()=>{
          category='general'
          this.props.navigation.goBack()
          }}>
        
            <Text 
                style={styles.back_image}>

                🔙

            </Text>
        </TouchableOpacity>
        

      </View>

      

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

        <Text>     </Text>
        <Text>     </Text>
        <Text>     </Text>
        <Text>     </Text>

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

      <ScrollView>


          <SafeAreaView style={styles.container}>

          <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10, color: 'blue'}}> Browse specific sections </Text>
                          <View style={styles.categories_card_container}>
                    <View style={styles.card_template}>

                    <TouchableOpacity onPress={() => {
                                category='sports'
                                categoryName= 'SPORTS'
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                          
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://newsonair.com/wp-content/uploads/2022/04/6-2.jpeg'}}
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
                                category='business'
                                categoryName="BUSINESS"
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://indianmarketview.com/wp-content/uploads/Daily-Morning-News.jpg'}}
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
                                category='entertainment'
                                categoryName="ENTERTAINMENT"
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://thumbs.dreamstime.com/b/megaphone-hand-business-concept-text-celebrity-news-megaphone-hand-business-concept-text-celebrity-news-vector-110860191.jpg'}}
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
                                category='general'
                                categoryName="GENERAL"
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtOP38wTksXWi3uU_5zSL7R2xI0QRiaUD7A&usqp=CAU'}}
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
                                category='health'
                                categoryName="HEALTH"
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://cdn4.iconfinder.com/data/icons/medical-health-set-2-glyph/33/medical_news-512.png'}}
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
                                category='science'
                                categoryName="SCIENCE"
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://cdn2.iconfinder.com/data/icons/science-navy-vol-2/64/Science_News-512.png'}}
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
                                category='technology'
                                categoryName="TECH"
                                this.props.navigation.navigate("Sub Category")
                              }}
                          >
                      <Image 
                        
                        style={styles.card_image}
                        source={{uri: 'https://matrixti.com/wp-content/uploads/2016/04/News-000047080356-cropped.jpg'}}
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

  categories_card_title: {
     fontWeight: 'bold',
     fontFamily: 'Times New Roman',
     fontSize: 20,
     justifyContent: 'center',
     color: 'black',
     padding: 10,
     textAlign: 'center',
  },

  categories_card_container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back_image: {
    top: 10,
    padding: 10,
    fontSize: 20,
    resizeMode: "contain",
    justifyContent: 'center',
    alignSelf: "left",
    borderRadius: 20,
  },

  subCategory_news_title: {
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    fontSize: "auto",
    justifyContent: 'center',
    textAlign: 'center'
  },

  country_container: {
    backgroundColor: 'black',
  },
  country_change_image: {
    top: 10,
    left: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
    justifyContent: 'center',
    alignSelf: "right",
    borderRadius: 20,
  },

  country_news_title: {
    right: 20,
    padding: 10,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
    fontSize: 40,
    justifyContent: 'center',
    textAlign: 'center'
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
            <Ionicons name="newspaper" color={color} size={20} />
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
            <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
            <Stack.Screen name="Categories" component={Categories} options={{headerShown:false}}/>
            <Stack.Screen name="Sub Category" component={SubCategory} options={{headerShown:false}}/>

          </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
};


export default App;
