import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';


const width = Dimensions.get('window').width;

const ChatPreview = ( { name, image, onPressChat, lastMessage, date }) => {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.box}>
            {/* <Image source={{ uri: image }} style={styles.picture} /> */}
            <View style={styles.picture}></View>
            
            <Text style={styles.name}>Annabelle Faber</Text>
            <Text style={styles.date}> 10/06/2024</Text>
            <View style={styles.messageContainer}>
              <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
                Hi Annabelle, lets collabbb aplsplsp lsplspl spsldfsjdgjks fhdsk jdksa; f sadf sdfashfuiaasdfsdfsshdfiash ashuflisahudfil
              </Text>
            </View>


            <View style={styles.line}></View>
            </TouchableOpacity>
  
        </View>
    );
}

export default ChatPreview;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'purple',
        height: 120,
        width: '100%',
    },
    box: {
      backgroundColor:'white',
      height: 120,
      width: '100%',
      justifyContent:'flex-start',
    },
    messageContainer:{
        width:'100%',
        paddingRight:15,
        position:'absolute',
        top:98,
    },
    line:{
        height: 1,
        backgroundColor:'#E1E6E8',
        position:'absolute',
        width: '100%',
        left: 100,
        top:119,
    },
    name:{
        fontSize:20,
        fontWeight:'bold',
        left: 120,
        top:25,
        position:'absolute',
    },
    date: {
        fontSize:15,
        color:'gray',
        position:'absolute',
        right:20,
        top: 28,
    },
    picture: {
        height:80,
        width:80,
        backgroundColor:'purple',
        borderRadius:40,
        top:20,
        left:width*0.02,
    }, 
    image: {

    },
    message:{
      fontSize:16,
      left: 120,
      top:-45,
      position:'absolute',
      paddingRight:15,
          
    }, 
    viewProfileButton:{
        height:35,
        width:150,
        borderColor:'#4A0AFF',
        borderWidth:1.5,
        borderRadius:5, 
        backgroundColor:'white',   
        justifyContent:'center',
        alignItems:'center',
        left: 120,
        top:-50,   
    }, 
});