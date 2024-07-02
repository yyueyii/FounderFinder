import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ChatPreview from '../../components/Chat/chat-preview'
import { SafeAreaView } from 'react-native-safe-area-context'

const Chat  = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={{height:20}}/>
      <View style={{height:1, backgroundColor:'#E1E6E8', left: -20, width:'120%'}}/>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View >
          <ChatPreview />

          <ChatPreview />
          <ChatPreview />
          </View>
          </ScrollView>
    </SafeAreaView>
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
    marginBottom: 0,
    color:'#4A0AFF',
    fontWeight: 'bold',
    left: 15,
  }, 
  scroll: {
    flexGrow: 1,
  }, 
  
  

})