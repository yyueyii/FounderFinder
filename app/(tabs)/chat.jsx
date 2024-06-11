import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ChatPreview from '../../components/MatchesPage/chat-preview'
import { ScrollView } from 'react-native-gesture-handler'

const Chat  = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={{height:20}}/>
      <View style={{height:1, backgroundColor:'#E1E6E8', left: -20, width:'120%'}}/>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View >
          <ChatPreview/>
          <ChatPreview/>
          <ChatPreview/>
          <ChatPreview/>
          <ChatPreview/>
          <ChatPreview/>
          <ChatPreview/>  
          </View>
          </ScrollView>
    </View>
  )
}

export default Chat 


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',paddingTop: 30,
    paddingLeft:20,
    backgroundColor:'white',
  }, 
  title: {
    fontSize: 24,
    marginBottom: 5,
    color:'#4A0AFF',
    fontWeight: 'bold',
  }, 
  scroll: {
    flexGrow: 1,
  }, 
  
  

})