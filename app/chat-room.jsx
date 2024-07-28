import React, { useState , useEffect, useRef } from 'react';
import { Text, View, Image, ScrollView, TextInput, StatusBar, Keyboard, Button, StyleSheet, TouchableOpacity, Platform, Dimensions, KeyboardAvoidingView, Pressable, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import OtherMessageBubble from '../components/Chat/other-message-bubble';
import UserMessageBubble from '../components/Chat/user-message-bubble';
import { useLocalSearchParams, Link } from 'expo-router';
const width = Dimensions.get('window').width;
const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;
import { useNavigation } from '@react-navigation/native';


import { uniqBy } from "lodash";
import axios from "axios";
import io from "socket.io-client";
import useUserStore from './store/userStore';
import useGetMessages from './hooks/useGetMessages';
import useSendMessage from './hooks/useSendMessages';

const ChatRoom = () => {

const userId = useUserStore(state => state.userId);
const [inputHeight, setInputHeight] = useState(30); 
const [socket, setSocket] = useState(null);
const [selectedUserId,setSelectedUserId] = useState(null);
const [messages, setMessages] = useState([]);
const [receiverName, setReceiverName] = useState('');
const [receiverPic, setReceiverPic] = useState(null);

const [onlinePeople,setOnlinePeople] = useState({});
const [offlinePeople,setOfflinePeople] = useState({});
const [typedMessage, setTypedMessage] = useState('');

const { messages: fetchedMessages, loading: fetchingMessages } = useGetMessages();
const { sendMessage, loading: sendingMessage } = useSendMessage();

const params = useLocalSearchParams();
const navigation = useNavigation();
const msgRef = useRef();



const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  console.log("Right before useEffect in chat-room")

  useEffect(() => {

    console.log("In useEffect in chat-room");
    const newSocket = io('http://localhost:8000'); 

    console.log("newSocket is instantiated")

    setSocket(newSocket);

    console.log("setSocket works")

    newSocket.on("connect", () => {
      console.log("Connected to the Socket.IO server");
    });

    newSocket.on("receiveMessage", (newMessage) => {
      console.log("new Message", newMessage);
  
      //update the state to include new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Event listeners
    // newSocket.on('message', handleMessage);

    console.log("newSocket on works")

    newSocket.on('disconnect', () => {
      setTimeout(() => {
        console.log('Oh no it is disconnected. Trying to reconnect.');
        // Reconnect logic
        newSocket.connect();
      }, 1000);
  });

  return () => newSocket.disconnect(); // Cleanup on component unmount
    
  }, [params.id]);

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({userId,username}) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  }

  // Function to handle messages from the server
  // function handleMessage(data) {
  //   console.log('Received message:', data);
  //   // Handle different types of messages (online status, text messages, etc.)
  //   if ('online' in data) {
  //     showOnlinePeople(data.online);
  //   } else if ('text' in data) {
  //     if (data.sender === selectedUserId) {
  //       setMessages(prev => ([...prev, {...data}]));
  //     }
  //   }
  // }

  const sendMessage1 = async (senderId, receiverId) => {
    console.log("button pressed")
    if (!typedMessage.trim() || !params) return;
    console.log("userId in chat-room:", params.id);
    // Or maybe it is just messages instead of message: typedMessage
    socket.emit("sendMessage1", { senderId : userId, receiverId : params.id , message: typedMessage });

    setMessages(prevMessages => [
      ...prevMessages,
      { senderId: userId, receiverId: params.id, message: typedMessage, timestamp: new Date() }
    ]);

    console.log("testing out date", new Date())

    setTypedMessage('');

    // call the fetchMessages() function to see the UI update
    setTimeout(() => {
        fetchMessages();
    },200)
  };

  const handleSendMessage = (message) => {
    sendMessage(message);
    setTypedMessage('');
  };

  useEffect(() => {
    const div = msgRef.current;
    if (div) {
      div.scrollIntoView({behavior:'smooth', block:'end'});
    }
  }, [messages]);

  const fetchName = async () => {
    try {

      console.log("fetch Name...")

      console.log("receiverid in fetchname", params.id)
      const response = await axios.get(`https://founderfinder-1-cfmd.onrender.com/getname`, {
        params: {
          id: params.id,
        }
      });

      console.log("response from fetch name :", response.data.name)
      setReceiverName(response.data.name);
    } catch (error) {
      console.error('Error fetching messages in useEffect fetchName function:', error);
    }
  };

  const fetchPic = async () => {
    try {

      console.log("fetch Pic...")

      console.log("receiverid in fetchPic", params.id)
      const response = await axios.get(`https://founderfinder-1-cfmd.onrender.com/getpic`, {
        params: {
          id: params.id,
        }
      });
      

      console.log("response from fetch pic :", response.data.pic)
      setReceiverPic(response.data.pic);
    } catch (error) {
      console.error('Error fetching messages in useEffect fetchName function:', error);
    }
  };






  const fetchMessages = async () => {
    try {

      console.log("fetch Messages...")

      console.log("senderid in fetchmsgs", userId)
      console.log("receiverid in fetchmsgs", params.id)
      const response = await axios.get(`https://founderfinder-1-cfmd.onrender.com/messages`, {
        params: {
          senderId: userId,
          receiverId: params.id,
        }
      });


      if (!response.data) {
        return ;
      }

      console.log("response from fetch msgs :", response)
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages in useEffect fetchMessages function:', error);
    }
  };

  useEffect(() => {
    console.log("fetchmessages in useEffect")
    fetchName();
    fetchMessages();
    fetchPic();
  }, []);

  const formatTime = (timeString) => {
    const options = { hour: "numeric", minute: "numeric" };
    // Ensure timeString is a valid string format or Date object
    const parsedDate = new Date(timeString);
    if (isNaN(parsedDate.getTime())) {
      // Handle invalid date
      return "Invalid Date";
    }
    return parsedDate.toLocaleString("en-US", options);
  };

  // const formatTime = (time) => {
  //   const options = { hour: "numeric", minute: "numeric" };
  //   return new Date(time).toLocaleString("en-US", options);
  // };

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor:'white'}}>
    <KeyboardAvoidingView style={{backgroundColor:'white', flex: 1}} behavior={Platform.OS === 'ios' ? 'padding'  : 'height'}>
        
        <Pressable style={styles.header} onPress={() =>{}}>
        <Link
                href={{
                    pathname:'/view-profile', 
                    params: {
                       id: new ObjectId(params)
                    }
                  }}
                 style={styles.name}> {receiverName}
                </Link>
            <Pressable onPress={()=>{navigation.goBack()}}>
                <Ionicons name="chevron-back-outline" size={30} color="#4A0AFF"style={styles.back}/>   
            </Pressable>
            {receiverPic ? (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${receiverPic}` }}
                    style={styles.image}
                />
                ) : (
                    <View style={styles.image}>
                        <Ionicons name="person-circle" size={44} color="#b5b5b5" />
                    </View>
                    )}
        </Pressable>
        

      <ScrollView contentContainerStyle={styles.messagesContainer}>
      {messages?.map((item, index) => {
        // console.log(`Rendering message ${index}:`, item);
        // console.log(`text ${index}:`, item.message);
        if (item.senderId === params.id) {
          // Messages from the other person
          return (
            <OtherMessageBubble
              key={index}
              message={item.message}
              time={formatTime(item.createdAt)}
            />
          );
        } else {
          // Messages from the current user
          return (
            <UserMessageBubble
              key={index}
              message={item.message}
              time={formatTime(item.createdAt)}
            />
          );
        }
      })}
            
      </ScrollView>


      <View style={styles.bottomBar}>
        <TextInput   
          value={typedMessage}
          onChangeText={(text) => setTypedMessage(text)}
          style={[styles.input, {height:Math.min(200, inputHeight)}]}
          placeholder="Type your message..."
          placeholderTextColor={'gray'}
          multiline={true}
          numberOfLines={1}
          onContentSizeChange={handleContentSizeChange}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage1()}>
        <Ionicons name="send" size={18} color="white" style={{left:2}}/>       
         </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'white'
  },
  header: {
    width:width,
    height:60,
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#E1E6E8'
  },
  name: {
    fontSize:20,
    fontWeight:'bold',
    position:'absolute',
    left:130,
    letterSpacing:0.2,
  },
  back:{
    left: 20,

  },
  image: {
    height:40,
    width:40,
    borderRadius:20,
    backgroundColor:'white',
    left:40,
    justifyContent:'center',
    alignItems:'center'
  },
  messagesContainer: {
    flexGrow: 1,
    paddingBottom:5,
    backgroundColor:'white',

    
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C5',
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth:1,
    borderTopColor:'#ccc',
  },
  input: {
    width:width - 60,
    backgroundColor:'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal:10,
    paddingVertical:10,
    fontSize:15,
  },
  sendButton: {
    height:35, 
    width:35,
    backgroundColor:'#4A0AFF',
    borderRadius:35/2,
    left: width - 45,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:12

  }
});

export default ChatRoom;