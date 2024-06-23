import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileCard from '../../components/Profile/profile-card';
import useUserStore from '../store/userStore';


const Home = () => {
  const userId = useUserStore(state => state.userId);


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


const handleMatchButtonPress = async () => {
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/match/${userId}/667040d88b96980d46246162`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json["matched"]) {
        console.log("A matched is made");
        return;
      }
      console.log("match status:", json.matched);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  fetchProfileData();
};


  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['#4A0AFF', '#5869ED', '#43B0FF']} style={styles.linearGradient}/>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <ProfileCard profileData={profileData}/>
        <View style={{height:30, backgroundColor:'transparent'}}/>

      </ScrollView>
      
      <TouchableOpacity onPress={handleMatchButtonPress} style={styles.matchButton}>
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