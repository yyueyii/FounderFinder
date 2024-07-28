import { View, StyleSheet, ScrollView,Text, ActivityIndicator, TouchableOpacity, FlatList} from 'react-native'
import React, {useState, useEffect, useRef, useCallback } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ProfileCard from '../../components/Profile/profile-card';
import useUserStore from '../store/userStore';
import MatchedPopUp from '../successful-match';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import useNotificationStore from '../store/notificationStore';



const Home = () => {
  const userId = useUserStore((state) => state.userId);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const notifications = useNotificationStore((state) => state.notifications);

  const scrollViewRef = useRef(null);

  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMatched, setIsMatched] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [isNotifVisible, setIsNotifVisible] = useState(true)

  console.log("userId in Home: ", userId);

  const fetchNotifs = useCallback(async () => {
    try {
      // setUserId(useUserStore((state) => state.userId));
      console.log("userId in fetch notifs in home: ", userId)
      const notifResponse = await fetch(`https://founderfinder-1-cfmd.onrender.com/getNotification/${userId}`);
      const notifjson = await notifResponse.json();

      if (Array.isArray(notifjson)) {
        notifjson.forEach((notif) => {
          useNotificationStore.getState().addNotification(notif);
        });
  
      }

      
      setNotifs(notifjson);
      setIsNotifVisible(true);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [userId]);

  const fetchProfiles = useCallback(async () => {
      try {
            // setUserId(useUserStore((state) => state.userId));
            console.log("userId in fetch profiles in home: ", userId)
            const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/getProfiles/${userId}`); 
            const json = await response.json();
            setProfiles(json);
        
      } catch (error) {
            console.error('Error fetching profile data:', error);  
        } finally {
          setLoading(false);
        }
    }
    ,[userId]);

  useFocusEffect(
    useCallback(() => {
      fetchNotifs();
      fetchProfiles();
    }, [fetchNotifs, fetchProfiles, userId])
  );


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
  console.log("Match button pressed")

  if (!id) {
    console.log("No id found in home.jsx")
    return;
  }

  const fetchProfileData = async() => {
    try {
      console.log("patching... other Id: ", id)
      console.log("userId: ", userId)
      const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/match/${userId}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      if (json["matched"]) {
        setIsMatched(true);
        console.log("show notif? ", isMatched);
        console.log(json);
        console.log("A matched is made!");
        
       } else {
      //isMatch shld be false
        console.log("match status:", json.matched);
      
        setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== id));
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
       }

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
    setProfiles([]);
    setCurrentIndex(0);
  }
  console.log("Skipped");
  console.log("prev: ", profiles[currentIndex]["name"])
  scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });

};


const handlePopUpClose = (id) => {
  setProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== id));
  scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      
}

const handleNotifPress = () => {
  setNotifs(notifs.slice(1));
};

const onMessagePress = () => {
  setIsNotifVisible(false);
  setIsMatched(false);
  console.log(isNotifVisible);
}

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <SafeAreaView> */}
      <LinearGradient colors={['#4A0AFF', '#5869ED', '#43B0FF']} style={styles.linearGradient}/>
      
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.cardContainer} showsVerticalScrollIndicator={false}>
          {profiles.length != 0 &&
          <ProfileCard profileData={profiles[currentIndex]}/>
          }
        <View style={{height:50, backgroundColor:'transparent'}}/>
      </ScrollView>

      {isMatched && <MatchedPopUp visible={isMatched} onClose={() => {setIsMatched(false); handlePopUpClose(profiles[currentIndex]["_id"]);}} onMessage={onMessagePress} profileData={profiles[currentIndex]} /> }

      
      {profiles.length != 0 && (
        <>
      <TouchableOpacity style={styles.matchButton} onPress={() => {
  const profileId = profiles[currentIndex]?.["_id"];
  if (profileId) {
    handleMatchButtonPress(profileId);
  } else {
    console.log("Profile _id is null or undefined");
  }
}}>
        <MaterialIcons name="handshake" size={45} color={'#4A0AFF'}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={() => {handleNextProfile();}}>
        <Ionicons name="close" size={45} color={'#4A0AFF'}/>
      </TouchableOpacity>
      </>
      )}

      {(profiles.length == 0 || profiles == null)&& 
        <View style={{paddingHorizontal:50, top: 120}}>
          <Text>Wow you have liked all profiles, we'll let you know when someone matches with you!</Text>
        </View>
      }


      {notifs.length != 0 && isNotifVisible && (
        <FlatList
          data={notifs}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={handleNotifPress}>
                  <MatchedPopUp profileData={item.user2} onMessage={onMessagePress} onClose={() => {setNotifs(notifs.slice(0, -1))}} />
              </TouchableOpacity>

        )}
        keyExtractor={(item) => item.user2._id.toString()}
      />
      )}
      
     

      </SafeAreaView>
    // </View>

   
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
    paddingTop: 20,
    paddingBottom: 20,
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