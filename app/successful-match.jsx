import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserStore from './store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const MatchedPopUp = ({  visible, onClose, onMessage, profileData, }) => {
  const userId = useUserStore(state => state.userId); //my userId
  const [isVisible, setIsVisible] = useState(true);


  const handleLater = async() => {
    const updateNotif = async () => {
      try {
        const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/updateNotification/${userId}/${profileData["_id"]}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        
          console.log(json);
          console.log("notif status updated");
          
          // return handleMatchMade;
      } catch (error) {
        console.error('Error fetching profile data in successful-match:', error);
      }
    };
  
    updateNotif();
  }



  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>

          <Text style={styles.messageText}>You matched with</Text>

          <Text style={[styles.messageText, {fontSize: 24}]}> {profileData["name"]}</Text>

          {profileData["pic"] ? (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${profileData["pic"]}` }}
                        style={styles.image}
                />
                ) : (
                    <View style={styles.image}>
                        <Ionicons name="person-circle" size={90} color="#b5b5b5" />                   
                    </View>
                    )}

          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => {setIsVisible(false); handleLater(); onClose(); }} style={styles.laterButton}>
            <Text style={[styles.buttonText, {color:'#4A0AFF'}]}>Later</Text>
          </TouchableOpacity>
          
          <Link href={{pathname:'/chat-room', params:{ id: profileData["_id"]}}} asChild>
          <TouchableOpacity onPress={() => {setIsVisible(false); handleLater(); onClose(); onMessage();}} style={styles.messageButton}>
          <Text style={{color:'white'}}>Message</Text>
                
          </TouchableOpacity>
          </Link>
        </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)', 
  },
  modalContainer: {
   
    paddingVertical:50,
    paddingHorizontal:30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation:10
  },
  image: {
    width:height*0.4*0.4, 
    aspectRatio:1,    
    backgroundColor:'lightgray', 
    margin:10, 
    marginVertical:20,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },
  messageText: {
    fontSize: 20,
    fontWeight:'bold',
    lineHeight:35,
  },
  laterButton: {
    backgroundColor: 'white',
    paddingHorizontal:20,
    height:35,
    borderRadius: 5,
    borderColor:'#4A0AFF',
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    marginRight:5,

  },
  messageButton: {
    backgroundColor:'#4A0AFF',
    paddingHorizontal: 20,
    height:35,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
    top:0,
    left:0,
    marginLeft:5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default MatchedPopUp;