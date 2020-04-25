import React,{Component} from 'react';
import {StyleSheet, Text, View, StatusBar } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {createStore} from 'redux'
import AddCard from './components/AddCard';
import { Constants } from 'react-native-unimodules';
import {black} from './utils/colors'
import StartQuiz from './components/StartQuiz';

const MaterialBottomTabs = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TopStatusBar({backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor,height:Constants.statusBarHeight}}>
      <StatusBar
        translucent backgroundColor={backgroundColor} {...props} />
      
    </View>
  )

}



export default class App extends Component{
  render(){
      createBottomTab  = () => {
        return <MaterialBottomTabs.Navigator>
          <MaterialBottomTabs.Screen name = 'DeckList' component= {DeckList}/>
          <MaterialBottomTabs.Screen name = 'AddDeck' component= {AddDeck}/>
        </MaterialBottomTabs.Navigator>
      }

      // createHomeStack = () => {
      //   <Stack.Navigator>
      //     <Stack.Screen name = 'Home' child = {}/>
      //   </Stack.Navigator>
      // }


  return (
      <Provider store = {createStore(reducer)}>
      <TopStatusBar backgroundColor={black} barStyle ='light-content'/>
        <NavigationContainer>
          <Stack.Navigator>
             <Stack.Screen name='Home' children = {createBottomTab}/>
             <Stack.Screen name="DeckView" component = {DeckView} />
             <Stack.Screen name="AddCard" component = {AddCard} />
             <Stack.Screen name="StartQuiz" component = {StartQuiz} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}
}


const styles = StyleSheet.create({
	container: {
    flex:1,
		justifyContent: "center",
		alignItems: "center",
	},
});