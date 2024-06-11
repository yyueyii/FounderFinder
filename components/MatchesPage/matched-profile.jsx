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
                <Text style={{fontSize:12}}>View Profile</Text>
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
        left: 70,
        top:15,
        position:'absolute',

    },
    picture: {
        height:50,
        width:50,
        backgroundColor:'purple',
        borderRadius:40,
        top:15,
        left:width*0.02,
        position:'absolute',
    },
    image: {

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
        top:25,
        left: width - 140,
        position:'absolute',
    }, 
    viewProfileButton:{
        height:20,
        width:90,
        borderColor:'#4A0AFF',
        borderWidth:1.5,
        borderRadius:5, 
        backgroundColor:'white',   
        justifyContent:'center',
        alignItems:'center',
        left: 70,
        top:42,
        position:'absolute',   
    }
});