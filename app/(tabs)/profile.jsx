import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

                                                                                    
const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;

const Profile = ( ) => {
  const [profileData, setProfileData] = useState({
    //picture: //require placeholder
    name: 'Your Name', 
    description: 'descr test',
    interestSectors: 'int sectors', 
    skills: 'skills', 
    education: 'education',
    workExperience:'workExp',
    LCI: 'lci', 
  })


  console.log('Profile screen rendered with profile:', profileData);

  const handleEditProfile= () => {
    console.log('Navigating to EditProfile with profileData:', profileData);

    navigation.navigate('/edit-profile');
  }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Profile</Text>

        {profileData.picture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} resizeMode="cover"/>
        ) : (
          <View style={[styles.profilePicture, styles.blankProfilePicture]} />
        )}
        
        <Text style={styles.name}> {profileData.name} </Text>

        <Text style={styles.description}>{profileData.description}</Text> 

        <Text style={styles.subheadings}>Interested Sectors</Text>
        <Text style={styles.text}>{profileData.interestedSectors}</Text> 


        <Text style={styles.subheadings}>Skills</Text>

        <Text style={styles.subheadings}>Education</Text>
        <View style={styles.educationContainer}>

        </View>
          

        <Text style={styles.subheadings}>Work Experience</Text>

        <Text style={styles.subheadings}>Let's Connect If...</Text>
        <Text style={styles.text}> {profileData.LCI} </Text>
        
        <Link href="/edit-profile" style={[styles.text, {color: 'purple'}]}> click here to Edit Profile</Link>
        <Link href="successful-match" style = {[styles.text, {color:'pink'}]}>successful match pop up</Link>

        <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
          <Text style={[styles.buttonText, {color:'white', textAlign:'center'}]}>Edit Profile</Text>
        </TouchableOpacity>
        
        <View style={styles.empty}></View>

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
    marginBottom: 5,
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
  button: {
    backgroundColor: '#4A0AFF',
    width: 120,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    marginTop:50,
  },
  buttonText: {
    color: 'white',
  },
  empty: {
    height:40, 
  },
});

