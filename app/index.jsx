import {  Text, View, StyleSheet, Image, Button, Pressable, TouchableOpacity} from 'react-native'
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar' 
import 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient';


// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'


export default function Index() {
  return (
    
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/favicon.png')}
        style={{width:200, height:25}}/> 
      <StatusBar style="auto"  />
      {/* <Link href="/log-in" style={{color: 'purple', top: 50, left: -5}}> Log in </Link> */}
      <TouchableOpacity style={styles.button}>
      <LinearGradient colors={['#4A0AFF', '#5869ED']} style={styles.linearGradient}/>

        <Link href="log-in" style={{color:'white', fontWeight:'bold', top:-28}}>Log In</Link>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }, button: {
    borderRadius:10,
    marginTop:30,
    backgroundColor:'transparent',
    alignItems:'center'
  }, linearGradient: {
    width:100,
    height:40,
    borderRadius:10,
    zIndex:-10,

  }

});


 