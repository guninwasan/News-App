import React from "react";
import './global'
import { Provider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home_Page from './Screens/Home_Page'
import Search from './Screens/Search'
import Categories from './Screens/Categories'
import SubCategory from './Screens/SubCategory'


const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

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

          <Stack.Screen name="Home_Page" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
          <Stack.Screen name="Sub Category" component={SubCategory} options={{ headerShown: false }} />

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
