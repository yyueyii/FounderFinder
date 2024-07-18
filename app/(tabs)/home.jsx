import { View, StyleSheet, ScrollView,Text, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileCard from '../../components/Profile/profile-card';
import useUserStore from '../store/userStore';
import MatchedPopUp from '../successful-match';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



const Home = () => {
  const userId = useUserStore((state) => state.userId);
  const scrollViewRef = useRef(null);

  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMatched, setIsMatched] = useState(false);
  const [notifs, setNotifs] = useState([]);


  useEffect(() => {
    if (userId) {
    console.log("set userId on Home: ", userId);
    const fetchProfileData = async () => {
      try {
            const response = await fetch(`http://192.168.101.16:5001/getProfiles/${userId}`); 
            const json = await response.json();
            setProfiles(json);
        
      } catch (error) {
            console.error('Error fetching profile data:', error);  
        } finally {
          setLoading(false);
        }
    };

    fetchProfileData(); 
  }
},[userId]);

useEffect(() => {
  if (userId) { 
    fetchNotifs = async() => {
      const notifResponse = await fetch(`http://192.168.101.16:5001/getNotification/${userId}`);
      const notifjson = await notifResponse.json();
      setNotifs(notifjson);
    }

    fetchNotifs();
  }
}, [profiles]);

// useEffect(() => {
//   console.log("profiles: ", profiles);
// }, [profiles]);

useEffect(() => {
  console.log("notifications: ", notifs);
}, [notifs]);



if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
      </View>
  );
}


const handleMatchButtonPress = async (id) => {
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`http://192.168.101.16:5001/match/${userId}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (json["matched"]) {
        setIsMatched(true);
        console.log(json);
        console.log("A matched is made with: ", profiles[currentIndex]["name"]);
        
        // return handleMatchMade;
      }
      console.log("match status:", json.matched);
      setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== id));
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });

    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  fetchProfileData();
};

const handleNextProfile = () => {
  if (currentIndex < profiles.length - 1) {
    setCurrentIndex(currentIndex + 1);
  } if (currentIndex == profiles.length - 1) {
    setCurrentIndex(0);
  }
  console.log("Skipped");
  console.log("prev: ", profiles[currentIndex]["name"])
  scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });

};




const handleNotifPress = () => {
  setNotifs(notifs.slice(1));
};

  return (
    <View style={{flex:1}}>
      <SafeAreaView>
      <LinearGradient colors={['#4A0AFF', '#5869ED', '#43B0FF']} style={styles.linearGradient}/>
      
      
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.cardContainer} showsVerticalScrollIndicator={false}>
          {profiles.length != 0 &&
          <ProfileCard profileData={profiles[currentIndex]}/>
          }
        <View style={{height:50, backgroundColor:'transparent'}}/>
      </ScrollView>
      
      {profiles.length != 0 && (
        <>
      <TouchableOpacity style={styles.matchButton} onPress={() => {handleMatchButtonPress(profiles[currentIndex]["_id"]);}}>
        <MaterialIcons name="handshake" size={45} color={'#4A0AFF'}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={() => {handleNextProfile();}}>
        <Ionicons name="close" size={45} color={'#4A0AFF'}/>
      </TouchableOpacity>
      </>
      )}

      {profiles.length == 0 &&
        <View style={{paddingHorizontal:50, top: 120}}>
          <Text>Wow you have liked all profiles, we'll let you know when someone matches with you!</Text>
        </View>
      }


      {notifs.length != 0 && (
        <FlatList
          data={notifs}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={handleNotifPress}>
                  <MatchedPopUp profileData={item.user2} />
              </TouchableOpacity>

        )}
        keyExtractor={(item) => item.user2._id.toString()}
      />
      )}
      
     

      {isMatched && <MatchedPopUp onLater={() => setIsMatched(false)} profileData={currentIndex} />}
      </SafeAreaView>
    </View>

   
  )
}

export default Home

const styles = StyleSheet.create({  
  contentContainer: {
    paddingHorizontal: 16, 
  },
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
    top:20,
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
    elevation:5,
    justifyContent:'center',
    alignItems:'center',

  },
  image: {
    width:'100%', 
    aspectRatio:1,
    backgroundColor:'gray', 
    borderRadius:25,
    
  }, 
  nextButton: {
    height:70,
    width:70,
    borderRadius:70/2,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation:5,
    position:'absolute',
    right:20,
    bottom:120,


  }
  
})