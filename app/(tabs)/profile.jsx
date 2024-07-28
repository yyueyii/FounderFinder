import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '../../components/Profile/profile-card';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import useUserStore from '../store/userStore';


                                                                                    
const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;

const Profile = ( ) => {
  const [profileData, setProfileData] = useState(null);
  const [verified, setVerified] = useState(null);
  const [verificationToken, setVerificationToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [uri, setURI] = useState(null);
  const userId = useUserStore(state => state.userId);

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`https://founderfinder-1-cfmd.onrender.com/send-email/${userId}`);
      console.log('Email sent successfully:', response.data);
      alert("Email resent! Remember to check your spam folder too :)")
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  const fetchProfileData = useCallback(async () => {
    try {
      console.log(userId);
        const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/profile/${userId}`); 
        const json = await response.json();

        console.log("This is json in profile: " + JSON.stringify(json, null, 2))
         
        const imageUri = `data:image/jpeg;base64,${json["pic"]}`; //converts str to URI
        setURI(imageUri);
        setProfileData(json);

        if (json.verified) {
          console.log("json verified: " + json.verified);
          setVerified(json.verified);
        }

        if (json.verificationToken) {
          console.log("json verificationToken: " + json.verificationToken);
          setVerificationToken(json.verificationToken);
        }
    } catch (error) {
        console.error('Error fetching profile data in profile:', error);
    } finally {
      setLoading(false);
    }
});

  useEffect(() => {
    fetchProfileData(); 
}, []); 

useFocusEffect(
  useCallback(() => {
    fetchProfileData();
  }, [])
);

if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
      </View>
  );
}

const handleUnpublish = async() => {
  try {
    const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/edit-profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "published" : false
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    const updatedUser = await response.json();
    console.log('Updated profileData:', updatedUser);
    
    
    router.replace('/profile');    
  } catch (error) {
    console.error('Error updating profile:', error);
    
  }
};

  return (
    <SafeAreaView style={styles.content}>

    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Profile</Text>

        <ProfileCard profileData={profileData}/> 

        <TouchableOpacity  style={styles.publishButton}>
          <Link 
            href={{
              pathname:'/edit-profile',
              params:{
                  pictureBase64:profileData["pic"],  
                  pictureURI:encodeURIComponent(uri),  // profileData["pic"] is a uri
                  name:profileData["name"], 
                  description:profileData["description"],
                  sectors:JSON.stringify(profileData["sectors"]),
                  skills:JSON.stringify(profileData["skills"]),
                  aboutMe:profileData["aboutMe"],
                  workExperience:JSON.stringify(profileData["workExperience"]),
                  education:JSON.stringify(profileData["education"]),
                  LCI:profileData["LCI"]

              }
                
            }} style={{color:'white'}}>Edit Profile</Link>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.unpublishButton} onPress={handleUnpublish}>
          <Text style={{color:'#4A0AFF'}}>Unpublish</Text>
        </TouchableOpacity>
        
        {!verified && (
          <TouchableOpacity style={styles.verifyButton} onPress={handleSendEmail}>
            <Text style={{color:'white'}}>Click here to verify your email</Text>
          </TouchableOpacity>
        )}


      
        
    </ScrollView>
    </SafeAreaView>

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
    width:'90%',
    aspectRatio:1
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
  publishButton: {
    backgroundColor: '#4A0AFF',
    width: 100,
    borderRadius:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginTop:30,
    left:0,
    marginBottom:10,
    
  },
  unpublishButton: {
    backgroundColor: 'transparent',
    borderColor:'#4A0AFF',
    borderWidth:1.5,
    width: 100,
    borderRadius:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginTop:-45,
    left: width - 150,
    marginBottom:10,
  },
  verifyButton: {
    backgroundColor: '#4A0AFF',
    width: 220,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:30,
    marginTop:20,
  },
  buttonText: {
    color: 'white',
  }, 
  verification: {
    fontSize: 18,
    paddingBottom: 50,
    fontWeight: 'bold',
  }
 
});