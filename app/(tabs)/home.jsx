import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileCard from '../../components/Profile/profile-card';
const Home = () => {
  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['#4A0AFF', '#5869ED', '#43B0FF']} style={styles.linearGradient}/>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <ProfileCard/>
        <View style={{height:30, backgroundColor:'transparent'}}/>

      </ScrollView>
      
      <TouchableOpacity style={styles.matchButton}>
        <MaterialIcons name="handshake" size={45} color={'#4A0AFF'}/>
      </TouchableOpacity>
    </View>

   
  )
}

export default Home

const styles = StyleSheet.create({
  linearGradient: {
    width:'100%', 
    height:300,
    borderRadius:100,
    top: -120,
    zIndex:-10,
    position:'absolute',
  }, 
  cardContainer: {
    flexGrow:1,
    width:'100%',
    backgroundColor:'transparent',
    top:40,
    paddingLeft:'5%',
    paddingRight:'5%',
    alignItem:'center',
  },
  matchButton: {
    height:70,
    width:70,
    borderRadius:35,
    backgroundColor:'white',
    position:'absolute',
    bottom:30,
    right:10,
    shadowColor:'#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    justifyContent:'center',
    alignItems:'center',

  },
  image: {
    width:'100%', 
    aspectRatio:1,
    backgroundColor:'gray', 
    borderRadius:25,
  }
  
})