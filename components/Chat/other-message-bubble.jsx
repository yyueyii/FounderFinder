import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width;

const OtherMessageBubble = ( { message, time, lastMessage } ) => {
    return (
    <View style={styles.container}>
        <View style={[styles.bubble]}>
            <Text style={styles.messageText}>
                {message}
            </Text>
            <Text style={styles.time}>{time}</Text>
            <View style={styles.triangle}/>
        </View>
    </View>
  )
}

export default OtherMessageBubble

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        paddingLeft:10,
        paddingTop:2,
        paddingBottom:2,
        maxWidth:'70%',
        alignItems:'flex-start'
        
    },
    bubble: {
        backgroundColor:'#f2f2f2',
        borderRadius:15,
        padding:10,
        maxWidth:'100%',
        paddingLeft:30,
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
        borderBottomColor: '#f2f2f2',
        position: 'absolute',
        bottom:3,
        left: 2,
        marginLeft: -8,
    }, 
    messageText: {
        color:'black',
        paddingLeft:2,
        marginRight:20,
        fontSize:14,
        padding:2,
        marginBottom:-10,
        lineHeight:17,
        paddingBottom:20,
    }, 
    time: {
        fontSize: 11,
        bottom:-5,
        color:'gray',
        right: 12,
        bottom:5,
        position:'absolute',
    }
})