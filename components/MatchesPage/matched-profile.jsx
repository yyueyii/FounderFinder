import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';


const width = Dimensions.get('window').width;

const MatchedProfileDisplay = ( { name, image, onPressMessage, onPressViewProfile }) => {
    return (
        <View style={styles.container}>
            {/* <Image source={{ uri: image }} style={styles.picture} /> */}
            <View style={styles.picture}></View>
            
            <Text style={styles.name}>Annabelle Faber</Text>

            <TouchableOpacity onPress={onPressMessage} style={styles.messageButton}>
                <Text style={{color:'white'}}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressViewProfile} style={styles.viewProfileButton}>
                <Text>View Profile</Text>
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
        height: 120,
        width: '100%',
        justifyContent:'center',
        paddingRight:20,
        paddingRight:20,
    },
    line:{
        height: 1,
        backgroundColor:'#E1E6E8',
        width: '100%',
        left: 100,
        top:0,
        position:'absolute',
        top:119,
    },
    name:{
        fontSize:20,
        fontWeight:'bold',
        left: 120,
        top:30,
        position:'absolute',

    },
    picture: {
        height:80,
        width:80,
        backgroundColor:'purple',
        borderRadius:40,
        top:20,
        left:width*0.02,
        position:'absolute',
    },
    image: {

    },
    messageButton:{
        left: '100%' - 120,
        height:35,
        width:120,
        borderColor:'#4A0AFF',
        borderWidth:1.5,
        borderRadius:5, 
        borderColor:'#4A0AFF',
        backgroundColor:'#4A0AFF',   
        justifyContent:'center',
        alignItems:'center', 
        top:60,
        left: 300,
        position:'absolute',
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
        top:60,
        position:'absolute',   
    }
});