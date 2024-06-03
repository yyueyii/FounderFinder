import { ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
                                                                                    
const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;

const Profile = ( { navigation }) => {
  const profileData = {
    picture: null,
    name: 'Your Name', 
    description: 'insert description',
    interestedSectors: 'int sectors',
    skills:'skilsss',
    education: {
      institution:'nus',
      duration:'2020-present',
      description:'sch descr'
    },
    workExperience: {
      organisation:'compName',
      duration:'3030-present',
      description:'idk',
    },
    LCI:'lci',
  }  

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {profileData});
  };

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

        <TouchableOpacity onPress={() => {}} style={styles.button}>
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
    width: width * 0.9,
    height: width * 0.9,
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

