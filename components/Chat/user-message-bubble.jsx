import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width;

// if next message is other person's or null, dont render triangle

const UserMessageBubble = ( { message, time, lastMessage } ) => {
    return (
    <View style={styles.container}>
        <View style={[styles.bubble]}>
            <Text style={styles.messageText}>
                {message}
            </Text>
            <Text style={[styles.time]}>{time}</Text>
            <View style={styles.triangle}/>
        </View>
    </View>
  )
}

export default UserMessageBubble

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingRight:10,
        paddingTop:2,
        paddingBottom:2,
        maxWidth:'70%',
        left:'30%',
        alignItems:'flex-end',

        
    },
    bubble: {
        backgroundColor:'#4A0AFF',
        borderRadius:15,
        padding:10,
        paddingRight:30,
        maxWidth:'100%',
        alignItems:'flex-start'
    }, 
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#4A0AFF',
        position: 'absolute',
        bottom:3,
        right: -2,
        marginLeft: -8,
    }, 
    messageText: {
        color:'white',
        paddingLeft:2,
        marginRight:20,
        fontSize:14,
        padding:2,
        marginBottom:-10,
        lineHeight:17,
        paddingBottom:25,
    }, 
    time: {
        fontSize: 11,
        bottom:-5,
        color:'lightgray',
        right: 12,
        bottom:5,
        position:'absolute',
    }
})