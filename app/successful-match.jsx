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
          <View style={{width:styles.modalContainer.height*0.5, height:styles.modalContainer.height*0.5, backgroundColor:'white', margin:10, marginBotton:30}}></View>
          <TouchableOpacity onPress={onLater} style={styles.closeButton}>
            <Text style={styles.buttonText}>Later</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onMessage} style={styles.closeButton}>
            <Text style={styles.buttonText}>Message</Text>
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
    backgroundColor: 'rgba(255, 100, 255, 0.5)', 
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
  messageText: {
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default MatchedPopUp;
