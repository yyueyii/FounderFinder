import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Link} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useGetConversations from '../../app/hooks/useGetConversation';
const width = Dimensions.get('window').width;



const MatchedProfileDisplay = ( { profileData }) => {
    
    console.log("Received data: ", profileData);
    const receiverId = profileData["_id"];
    console.log("receiverID: ", profileData["_id"])
    // const { loading, conversations } = useGetConversations();

    return (
        <View style={styles.container}>

            {profileData["pic"] ? (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${profileData["pic"]}` }}
                        style={styles.picture}
                />
                ) : (
                    <View >
                        <Ionicons name="person-circle" size={59} color="#b5b5b5" style={{}}/>                   
                    </View>
                    )}
           
            
            <Text style={styles.name}>{profileData["name"]}</Text>

            <TouchableOpacity onPress={() =>{}} style={styles.messageButton}>
            <Link
                href={{
                    pathname:'/chat-room', 
                    params: {
                        id:receiverId
                    }
                }}
                 style={{color:'white'}}>Start Messaging
                </Link>
            </TouchableOpacity>

            

            <TouchableOpacity onPress={() => {}} style={styles.viewProfileButton}>
            <Link
                href={{
                    pathname:'/view-profile', 
                    params: {
                        id:receiverId
                    }
                }}
                 > View Profile
                </Link>
            </TouchableOpacity>
            <View style={styles.line}></View>
            <View style={{height:3}}></View>

        </View>
    );
}

export default MatchedProfileDisplay;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        height: 80,
        width: '100%',
        justifyContent:'center',
        paddingRight:20,
    },
    line:{
        height: 1,
        backgroundColor:'#E1E6E8',
        width: '100%',
        left: 100,
        top:0,
        position:'absolute',
        top:79,
    },
    name:{
        fontSize:18,
        fontWeight:'bold',
        left: width*0.02+60,
        top:15,
        position:'absolute',

    },
    picture: {
        height:50,
        width:50,
        backgroundColor:'pink',
        borderRadius:25,
        top:15,
        left:width*0.02,
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
    },
    image: {

    },
    messageButton:{
        // left:50,
        height:30,
        width:120,
        borderColor:'#4A0AFF',
        borderWidth:1.5,
        borderRadius:5, 
        borderColor:'#4A0AFF',
        backgroundColor:'#4A0AFF',   
        justifyContent:'center',
        alignItems:'center', 
        top:35,
        left: width - 170,
        position:'absolute',
    }, 
    viewProfileButton:{
        height:25,
        width:90,
        borderColor:'#4A0AFF',
        borderWidth:1.5,
        borderRadius:5, 
        backgroundColor:'white',   
        justifyContent:'center',
        alignItems:'center',
        left: width*0.02 + 60,
        top:42,
        position:'absolute',   
    }
});