import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const MatchedPopUp = ({ name, image, visible, onLater, onMessage }) => {
  const navigation = useNavigation();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onLater}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>

          <Text style={styles.messageText}>You matched with</Text>

          <Text style={[styles.messageText, {fontSize: 24}]}>Annabelle Farber</Text>

          {/* temp image */}
          <View style={styles.image}></View>

          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.laterButton}>
            <Text style={[styles.buttonText, {color:'#4A0AFF'}]}>Later</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {navigation.navigate('/chat-room')}} style={styles.messageButton}>
            <Text style={[styles.buttonText, {color:'white'}]}>Message</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContainer: {
   
    paddingVertical:50,
    paddingHorizontal:30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width:height*0.4*0.4, 
    aspectRatio:1,    
    backgroundColor:'gray', 
    margin:10, 
    marginVertical:30,
    borderRadius:10,
  },
  messageText: {
    fontSize: 20,
    fontWeight:'bold',
    lineHeight:28,
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
