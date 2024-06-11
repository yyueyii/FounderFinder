import {  Text, View, StyleSheet, Image, Button, Pressable } from 'react-native'
import { Slot } from 'expo-router';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar' 
import 'react-native-gesture-handler'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'


export default function Index() {
  return (
    
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={{width:200, height:25}}/> 
      <StatusBar style="auto"  />
      {/* <Link href="/log-in" style={{color: 'purple', top: 50, left: -5}}> Log in </Link> */}
      <Pressable style={{color: 'purple', top: 50, left: -5}}
       onPress={() =>
        navigation.navigate('/log-in')
       }
        >Log in</Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }

});


 