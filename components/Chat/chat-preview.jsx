import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


const width = Dimensions.get('window').width;

const ChatPreview = ( { id, name, lastMessage, date }) => {

    const navigation = useNavigation();

    const toChatRoom = () => {
        navigation.navigate('ChatRoom', id);
    };

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => toChatRoom()} style={styles.box}>
            {/* <Image source={{ uri: image }} style={styles.picture} /> */}
            <View style={styles.picture}></View>
            
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}> {date}</Text>
            <View style={styles.messageContainer}>
              <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
                {lastMessage}
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
        backgroundColor:'white',
        height: 80,
        width: '100%',
    },
    box: {
      backgroundColor:'white',
      height: 80,
      width: '100%',
      justifyContent:'center',
    },
    messageContainer:{
        width:'100%',
        paddingRight:100,
        position:'absolute',
        top:98,
    },
    line:{
        height: 1,
        backgroundColor:'#E1E6E8',
        position:'absolute',
        width: '130%',
        left: 100,
        top:79,
    },
    name:{
        fontSize:18,
        fontWeight:'bold',
        left: 70,
        top:12,
        position:'absolute',
    },
    date: {
        fontSize:14,
        color:'gray',
        position:'absolute',
        right:20,
        top: 16,
    },
    picture: {
        height:50,
        width:50,
        backgroundColor:'purple',
        borderRadius:25,
        top:15,
        left:width*0.02,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
    },
    image: {

    },
    message:{
      fontSize:14,
      left: 70,
      top:-63,
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