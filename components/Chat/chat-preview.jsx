import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {Link} from 'expo-router';


const width = Dimensions.get('window').width;

const ChatPreview = ( { pic, id, name, lastMessage, date }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.box}>

            {pic ? (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${pic}` }}
                    style={styles.picture}
                />
                ) : (
                    <View style={styles.anonymousIcon}>
                        <Ionicons name="person-circle" size={59} color="#b5b5b5" />
                    </View>
                    )}
            
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date}</Text>
            <View style={styles.messageContainer}>
              <Text style={styles.message} numberOfLines={2} ellipsizeMode="tail">
                {lastMessage}
              </Text>
            </View>
            <TouchableOpacity onPress={() =>{}} style={styles.messageButton}>
            <Link
                href={{
                    pathname:'chat-room', 
                    params: {
                        id:id
                    }
                }}
                 style={{color:'white'}}>Message
                </Link>
            </TouchableOpacity>


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
        left: 90,
        top:12,
        position:'absolute',
    },
    date: {
        fontSize:14,
        color:'gray',
        position:'absolute',
        right:20,
        top: 10,
    },
    picture: {
        height:50,
        width:50,
        backgroundColor:'transparent',
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
      left: 90,
      top:-60,
      position:'absolute',
      paddingRight:120,
          
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
    anonymousIcon: {
      width: 59,
      height: 59,
      borderRadius: 29.5,
      backgroundColor: 'transparent', 
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageButton:{
        left:30,
        height:30,
        width:90,
        borderColor:'#4A0AFF',
        borderWidth:1.5,
        borderRadius:5, 
        borderColor:'#4A0AFF',
        backgroundColor:'#4A0AFF',   
        justifyContent:'center',
        alignItems:'center', 
        top:35,
        left: width - 140,
        position:'absolute',
    }, 
});