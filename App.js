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
 } from "react-native";

 import { Card } from 'react-native-elements'



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


 });
