import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const MatchedPopUp = ({ name, image, visible, onLater, onMessage }) => {
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
          
          <TouchableOpacity onPress={onLater} style={styles.laterButton}>
            <Text style={[styles.buttonText, {color:'#4A0AFF'}]}>Later</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onMessage} style={styles.messageButton}>
            <Text style={[styles.buttonText, {color:'white'}]}>Message</Text>
          </TouchableOpacity>
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
    width: width*0.7,
    height:height*0.8,
    height:500,
    paddingTop:50,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width:height*0.8*0.4, 
    height:height*0.8*0.4, 
    backgroundColor:'gray', 
    margin:10, 
    marginBotton:30,
    borderRadius:5,
  },
  messageText: {
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: 10,
  },
  laterButton: {
    backgroundColor: 'white',
    paddingLeft:30,
    paddingRight:30,
    height:35,
    borderRadius: 5,
    borderColor:'#4A0AFF',
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    top:15,
    left:75,
  },
  messageButton: {
    backgroundColor:'#4A0AFF',
    paddingLeft: 30,
    paddingRight: 30,
    height:35,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
    top:-20,
    left:-65,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default MatchedPopUp;
