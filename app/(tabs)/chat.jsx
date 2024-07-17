import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState , useEffect, useRef } from 'react';
import ChatPreview from '../../components/Chat/chat-preview'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from "axios";
import useUserStore from '../store/userStore';

const Chat  = () => {

  const userId = useUserStore(state => state.userId);

    const [message, setMessage] = useState([]);
    const [chatNames, setChatNames] = useState("");
    const [chatNamesMap, setChatNamesMap] = useState({});
    const [chatPicsMap, setChatPicsMap] = useState({});

    const fetchChats = async () => {
        try {
    
          console.log("fetch Chats...")
    
          console.log("userid in fetchchat", userId)
          const response = await axios.get(`http://localhost:5001/chats`, {
            params: {
              senderId: userId,
            }
          });

          if (!response.data) {
            console.log("No response.data");
            return null;
          }

          if (!response.data.length === 0) {
            console.log("No messages found");
            return null;
          }

          console.log("This is response.data", response.data)


          const lastMessages = response.data.map(chat => {
            const messagesArray = chat.messages;
            if (Array.isArray(messagesArray) && messagesArray.length > 0) {
                return messagesArray[messagesArray.length - 1];
            }
            return null; // Handle case where messages array is empty
        });

        console.log("Last messages from fetch chats:", lastMessages);
        setMessage(lastMessages);

        const uniqueParticipantIds = new Set([
          ...lastMessages.map(item => item.senderId !== userId ? item.senderId : item.receiverId)
        ]);
  
        uniqueParticipantIds.forEach(participantId => {
          fetchName(participantId);
          fetchPic(participantId);
        });

        } catch (error) {
          console.error('Error fetching messages in useEffect fetchChats function:', error);
        }
      };

      const fetchName = async (id) => {
        try {
    
          console.log("fetch Name...")
    
          console.log("receiverid in fetchname", id)
          const response = await axios.get(`http://localhost:5001/getname`, {
            params: {
              id: id,
            }
          });
    
          console.log("response from fetch name :", response.data.name)
          // setChatNames(response.data.name);

          setChatNamesMap(prevMap => ({
            ...prevMap,
            [id]: response.data.name
          }));

        } catch (error) {
          console.error('Error fetching messages in useEffect fetchName function:', error);
        }
      };

      const fetchPic = async (id) => {
        try {
    
          console.log("fetch Pic...")
    
          console.log("receiverid in fetchpic", id)
          const response = await axios.get(`http://localhost:5001/getpic`, {
            params: {
              id: id,
            }
          });
    
          console.log("response from fetch pic :", response.data.pic)
          // setChatNames(response.data.name);

          setChatPicsMap(prevMap => ({
            ...prevMap,
            [id]: response.data.pic
          }));

        } catch (error) {
          console.error('Error fetching messages in useEffect fetchPic function:', error);
        }
      };

      useEffect(() => {
        console.log("fetchChats in useEffect")
        fetchChats();
        
        // console.log("this is chatNames array: ", chatNames);
      }, []);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={{height:20}}/>
      <View style={{height:1, backgroundColor:'#E1E6E8', left: -20, width:'120%'}}/>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View >

          {message.map((item, index) => (
            
          <ChatPreview
            pic={chatPicsMap[item.senderId !== userId ? item.senderId : item.receiverId]}
            key={index} 
            id={item.senderId !== userId ? item.senderId : item.receiverId}
            name={chatNamesMap[item.senderId !== userId ? item.senderId : item.receiverId]}
            lastMessage={item.message} 
            date={formatDate(item.createdAt)}
          />
        ))}

          {/* <ChatPreview/>
          <ChatPreview/>
          <ChatPreview/> */}
           
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