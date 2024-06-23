import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import ProfileCard from '../components/Profile/profile-card'
import { useLocalSearchParams } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;


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
            const response = await fetch(`http://localhost:5001/profile/${id}`); 
            const json = await response.json();
            setBase64Pic(json["pic"]);
            const imageUri = `data:image/jpeg;base64,${json["pic"]}`; //converts str to URI
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

console.log("data fetched: ", profileData);



  return (
    <View style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.cardContainer}>
      <ProfileCard profileData={profileData}/>
      <View style={{height:30, backgroundColor:'transparent'}}/>

    </ScrollView>
    
    <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
      <Text style={{color:'white'}}>Back</Text>
    </TouchableOpacity>
  </View>
  );
}

export default ViewProfile

const styles = StyleSheet.create({
  container: {
    paddingBottom:50,
    alignItems:'flex-start'

  }, 
  cardContainer: {
    flex:1,
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

  }, 
  header: {
    flexDirection:'row',
    alignItems:'center',
  }
})