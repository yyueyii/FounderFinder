import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileCard from '../../components/Profile/profile-card';

const Home = () => {

  const [profileData, setProfileData] = useState({
    //picture: //require placeholder
    name: 'Your Name', 
    description: 'Harvard Business School Graduate',
    sectors: ['Finance', 'Susainability', 'Tech', 'Data Science'], 
    skills: ['Communication', 'Business Analytics', 'ReactNative', 'Python', 'Teamwork','Java', 'C++'], 
    aboutMe:'abtmeee',
    education: 
      [{institution: 'MBA, Harvard University', duration:'2021-2022', 
          description:'Lorem ipsum ute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    '},
        {institution:'BBA', duration:'2017-2020', 
          description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim oe dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidant in culpa qui officia deserunt mollit anim id est laborum.  '}
      ],
    workExperience:
      [{organisation: 'Google', duration:'2020', description:'goooooooooooooooooooogle'}],
    LCI: 'You are a technical co-founder in the FinTech space looking for a non-technical co-founder to handle all things business. You are a technical co-founder in the FinTech space looking for a non-technical co-founder to handle all things business', 
  })

  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['#4A0AFF', '#5869ED', '#43B0FF']} style={styles.linearGradient}/>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <ProfileCard profileData={profileData}/>
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
    right:20,
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