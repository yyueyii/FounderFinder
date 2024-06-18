import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '../../components/Profile/profile-card';
import axios from 'axios';

                                                                                    
const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;

const Profile = ( ) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const response = await fetch('http://localhost:5001/profile/667040d88b96980d46246162'); 
            const json = await response.json();
            setProfileData(json); 
            console.log("profileData:", profileData);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        } finally {
          setLoading(false);
        }
    };

    fetchProfileData(); 
}, []); 

if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
      </View>
  );
}


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

