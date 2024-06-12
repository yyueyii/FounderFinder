import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '../../components/Profile/profile-card';
import axios from 'axios';
                                                                                    
const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;

const Profile = ( ) => {
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

  // const [profileData, setProfileData] = useState(null);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //       try {
  //           const response = await axios.get('/profile');

  //           setProfileData(response.data.profileData);
  //       } catch (error) {
  //           console.error('Error fetching profile data:', error);
  //       }
  //   };
  //   fetchProfileData();
  //       return () => {
  //       };
  //   }, []); 


  const handleEditProfile= () => {
    console.log('Navigating to EditProfile with profileData:', profileData);

    navigation.navigate('/edit-profile');
  }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Profile</Text>

        <ProfileCard profileData={profileData}/> 

        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={[styles.buttonText, {color:'white', textAlign:'center'}]}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={styles.publisButton}>
          <Text style={[styles.buttonText, {color:'white', textAlign:'center'}]}>Publish Profile</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

export default Profile 


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    paddingBottom: 10,
    color:'#4A0AFF',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    justifyContent:'center',
    marginBottom:40,
    zIndex:1,
    top:10,
    left:15,
  },
  profilePicture: {
    width: '100%' * 0.9,
    aspectRatio: 1,    
    borderRadius: 20, 
    marginBottom: 20,
  }, 
  blankProfilePicture: {
    backgroundColor: '#D9D9D9',
  },
  name: {
    fontSize:24,
    fontWeight: 'bold',
    color: '#4A0AFF',
    marginBottom:20,
  },
  description: {
    fontSize:20,
    marginBottom:25,
  },
  text: {
    fontSize: 18,
    marginBottom: 18,
  },
  subheadings: {
    fontSize:20,
    color:'#4A0AFF',
    fontWeight: 'bold', 
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#4A0AFF',
    width: 110,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
    marginTop:20,
  },
  publisButton: {
    backgroundColor: '#4A0AFF',
    width: 120,
    borderRadius:10,
    top:-65,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:0,
    marginTop:20,
    left: width-170,
  },
  buttonText: {
    color: 'white',
  },
 
});

