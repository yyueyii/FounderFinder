import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ProfileCard from '../components/Profile/profile-card'
import { useLocalSearchParams } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;
import { SafeAreaView } from 'react-native-safe-area-context';


const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [base64Pic, setBase64Pic] = useState(null);
  const navigation = useNavigation();
  const params = useLocalSearchParams();  
  console.log("userId: ", params);
  const id = new ObjectId(params)

  
  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            console.log("Fetching profile data for ID:", id);
            const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/profile/${id}`); 
            const json = await response.json();

            if (!json) {
              throw new Error('Profile data not found');
            }

            if (!json["pic"]) {
              json["pic"] = '/9j/4AAQSkZJRgABAQAAZABkAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAMgBAREA/8QAGwABAAMAAwEAAAAAAAAAAAAAAAQFBgECAwf/2gAIAQEAAAAA+zAAAAAAAAAAAAAAAAAAIsDpMsAAAOtDWCTezQAAz9YDtpZgABGyoCRqwACpogDVyAAFLTAGplAAKugAdtf2AAQM2A508sAB4ZTgD11vIABm4AOb21AAHnlPMLa9AABT0gaSeAACNlQ0s4AAFbngtb4AAPDM+Ic6KwAAR6yp6gc2l16AHFRVeIAO1jaTAdM5CAACdofQZuAAABM03KvzgAABf2jO1wAABM0//8QAMxAAAgECAwYEBAUFAAAAAAAAAQIDBBEABSESMDFAQVEgIlJxECMyYRMUgZHBM2BictH/2gAIAQEAAT8A/u6ozGmprh5Lt6V1OHz4D+nBf/ZsDPnv5oFt9mxT5xTzEK942Pq4fvjjybusaFnICgXJOK7NnmJjgJSPhfqfDBmFTT2CSkr6TqMUOYR1i2PllHFe/tyWbVxnlMCH5aHW3U+NHaNw6EhhqCMZfWisgubCRdGH88hXz/l6OSQHzWsPc7mhqTS1SSX8vBvbANxcb/PXtBEndr/tuqFzJQwseOzv8+veDtrusuUrl8IPpvv88jLUqOB9Da/ruUXbdVHU2wihEVBwUW3+bymOgYAX2zs+25BIIINiMZa8klDG0pJY31Pbf1kAqaWSMjW1x74IsSDxG4poGqahIl4k6nsMKoRFUcALDkM0pGp6kuB8uQ3B+/bxgFiABcngBjKcveAmaXRiLBew5GaJZ4mjcXDC3tiaJoJmicaqbeLJKYPK07DRNF9+Tzumuq1CjUeVv48WTps5ep9RJ5PMVDZfMD6b+LKHDZeg9JIPJ5zOI6T8IHzSG36eLJakRzNAx0fVffkqqripI9qQ69F6nFTUvVTGR+vAdh4lJVgymxGoOMvzJKpAjkLMOI77+aupoPrlW/YanFTnjNdadLf5N/zEkjyuXkYsx6ncAkG4Njijzl47JUAuvRhxGIZ4qhNqJww+26ZgqlmIAHEnFXnQUlKZQx9Z4Ylqp5yTJKx+19N6kjxsGRipHUHEGdzR2EyiQd+BxT5nTVGgfYb0tp45ZUhjaSRrKOJxXZhJVuQLrEOC9/fkqPM5qVgrEvF6T09sQzR1EQkja6nw5pXGqm2EPykOn3PflMvrWpJtbmJvqH84BDKGBuDqD8c3qTBS7CmzSafp15bJakyQNCxuY+Ht8c6l263Y6IoHLZXP+BXJc+V/Kfh//9k=';
            }
            
            setBase64Pic(json["pic"]);
            const imageUri = `data:image/jpeg;base64,${json["pic"]}`; //converts str to URI
            setProfileData(json); 
            console.log("profileData:", profileData);
        } catch (error) {
            console.error('Error fetching profile data in view-profile:', error);
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

console.log("data fetched: ", profileData);



  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <ProfileCard profileData={profileData}/>
      <View style={{height:30, backgroundColor:'transparent'}}/>

    </ScrollView>
    
    <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
      <Text style={{color:'white'}}>Back</Text>
    </TouchableOpacity>
  </SafeAreaView>
  );
}

export default ViewProfile

const styles = StyleSheet.create({
  container: {
    paddingBottom:50,
    alignItems:'flex-start',
    flex:1

  }, 
  cardContainer: {
    paddingVertical:20,
    padding:20,
  }, 
  title: {
    fontSize: 24,
    paddingVertical: 10,
    color:'#4A0AFF',
    fontWeight: 'bold',
    marginVertical:10,
  }, 
  backButton: {
    height:70,
    width:70,
    borderRadius:35,
    borderColor:'#4A0AFF',
    backgroundColor:'#4A0AFF',
    position:'absolute',
    bottom:30,
    right:20,
    shadowColor:'#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    justifyContent:'center',
    alignItems:'center',
    zIndex:150,
    elevation: 5

  }, 
  header: {
    flexDirection:'row',
    alignItems:'center',
  }
})