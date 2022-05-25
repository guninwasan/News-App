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

 } from "react-native";

 import { Card } from 'react-native-elements'
 import { Portal, FAB, Provider, ProgressBar, Colors, Searchbar } from 'react-native-paper';
 import { Ionicons } from '@expo/vector-icons';

 import filter from 'lodash.filter';


 country_code='in'
 category='sports'

 import { NavigationContainer, useIsFocused } from '@react-navigation/native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 const Stack = createStackNavigator();
 const Tab = createMaterialBottomTabNavigator();
 const Drawer = createDrawerNavigator();


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

 export default class App extends React.Component {
 class Home_Page extends React.Component {

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

   FlatListItemSeparator = () => {
     return (
       <View style={{
         height: .5,
         width: "100%",
         backgroundColor: "rgba(0,0,0,0.5)",
       }}
       />
     );
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
         {
           this.state.dataSource.map(function (item, index) {

             console.log('so it is supposed to return');
             return (

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





 class Search extends React.Component { 


     constructor(props) {
     super(props);
     this.state = {
       loading: true,
       dataSource: [],
       query: '',
       fullData: [],
     };
   }

   componentDidMount() {
     getNewsArticles().then(data => {
       this.setState({
         loading: false,
         dataSource: data,
         query: '',
         fullData: []
       });
     }, error => {
       Alert.alert('Error', 'Something went wrong!')
     }

     )
   }



   handleSearch = function renderHeader(text){
   const formattedQuery = text.toLowerCase();
   const filteredData = filter(this.fullData, user => {
     return this.contains(user, formattedQuery);
   });
   this.setState({ fullData: filteredData })
   this.setState({ query: text })
 };


 contains = ({ name, email }, query) => {
   const { first, last } = name;

   if (first.includes(query) || last.includes(query) || email.includes(query)) {
     return true;
   }

   return false;
 };



   searchNews= function renderHeader(){
     return (
       <View
         style={{
           backgroundColor: '#fff',
           padding: 10,
           marginVertical: 10,
           borderRadius: 20
         }}
       >
         <TextInput
           autoCapitalize="none"
           autoCorrect={false}
           clearButtonMode="always"
           value={this.query}
           onChangeText={queryText => this.handleSearch(queryText)}
           placeholder="Search"
           style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
         />
       </View>
     );
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
         <FlatList
         ListHeaderComponent={this.searchNews}
         data={this.state.dataSource}
         keyExtractor={item => item.id}

         renderItem={({ item }) => (
           <View style={styles.listItem}>
           </View>
         )}
       />



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
  published_at: {
    flexWrap: 'wrap',
    fontWeight: 'light',
    fontFamily: 'Times New Roman',
    fontSize: 14,
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



         <Tab.Screen name="Card_View" component={Card_Page} 
         options={{
           tabBarLabel: 'News Cards',
           tabBarIcon: ({ color, size }) => (
             <Ionicons name="newspaper" color={color} size={20} />
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
