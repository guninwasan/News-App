import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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


  card_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card_template: {
    width: 250,
    height: 250,
    boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)"
  },
  card_image: {
    width: "auto",
    height: 250,
    borderRadius: 10
  },
  text_container: {
    position: "absolute",
    width: 250,
    height: "auto",
    bottom: 0,
    padding: 5,
    borderBottomLeftRadius: 10,
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

  categories_card_container: {
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

  close_modal: {
    top: "20%",
    fontWeight: 'bold',
    padding: 10,
    fontFamily: 'Times New Roman',
    fontSize: 40,
    justifyContent: 'right',
    textAlign: 'right',
    color: 'white',
  },

});
