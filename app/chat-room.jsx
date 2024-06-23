import React, { useState , useEffect} from 'react';
import { Text, View, ScrollView, TextInput,Keyboard, Button, StyleSheet, TouchableOpacity, Platform, Dimensions, KeyboardAvoidingView, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import OtherMessageBubble from '../components/Chat/other-message-bubble';
import UserMessageBubble from '../components/Chat/user-message-bubble';
import { useLocalSearchParams, Link } from 'expo-router';
const width = Dimensions.get('window').width;
const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatRoom = ( ) => {

const [inputHeight, setInputHeight] = useState(30); 

const params = useLocalSearchParams();
const navigation = useNavigation();
console.log("userId:", params);



const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };
  return (
    <KeyboardAvoidingView style={{backgroundColor:'white', flex:1}} behavior={Platform.OS === 'ios' ? 'padding'  : 'height'}>

        <Pressable style={styles.header} onPress={() =>{}}>
        <Link
                href={{
                    pathname:'/view-profile', 
                    params: {
                       id: new ObjectId(params)
                    }
                  }}
                 style={styles.name}> name
                </Link>
            <Pressable onPress={()=>{navigation.goBack()}}>
                <Ionicons name="chevron-back-outline" size={30} color="#4A0AFF"style={styles.back}/>   
            </Pressable>
            <View style={styles.image}/>
        </Pressable>
        

      <ScrollView contentContainerStyle={styles.messagesContainer}>
            {/* //render previous messages */}
            <OtherMessageBubble  message={'Hi Annabelle'} time={'01:22'}/>
            <OtherMessageBubble  message={'Long mes ashfskdlhf sk fslfj klsdasdfhjksf ks fhsk hfskdh fskdjh fksdhf skldh  hjkhfskj fksdhf ksdjhf skjdhf ks djk hsjk fhjkash fksjhf ksj jdsk hfjska fhksjdhf kjsdhf ksj njk djksa fnjks fjskj fksda fjksjkajkjsfd'} time={'03:12'}/>
            <UserMessageBubble message={'hey'} time={'12:23'}/>
            <UserMessageBubble message={'long message asdhfuis ish ish fshf kshf ksjhfkshf kjshfkjshf kjs kfsa jkshf ksj hfjks fkds fhjksfhkds'} time={'12:23'}/>
            <UserMessageBubble message={'long message asdhfuis ish ish fshf kshf ksjhfkshf kjshfkjshf kjs kfsa jkshf ksj hfjks fkds fhjksfhkds'} time={'12:23'}/>
            <OtherMessageBubble  message={'Long mes ashfskdlhf sk fslfj klsdasdfhjksf ks fhsk hfskdh fskdjh fksdhf skldh  hjkhfskj fksdhf ksdjhf skjdhf ks djk hsjk fhjkash fksjhf ksj jdsk hfjska fhksjdhf kjsdhf ksj njk djksa fnjks fjskj fksda fjksjkajkjsfd'} time={'03:12'}/>
            <OtherMessageBubble  message={'Long mes ashfskdlhf sk fslfj klsdasdfhjksf ks fhsk hfskdh fskdjh fksdhf skldh  hjkhfskj fksdhf ksdjhf skjdhf ks djk hsjk fhjkash fksjhf ksj jdsk hfjska fhksjdhf kjsdhf ksj njk djksa fnjks fjskj fksda fjksjkajkjsfd'} time={'03:12'}/>
            <OtherMessageBubble  message={'Long mes ashfskdlhf sk fslfj klsdasdfhjksf ks fhsk hfskdh fskdjh fksdhf skldh  hjkhfskj fksdhf ksdjhf skjdhf ks djk hsjk fhjkash fksjhf ksj jdsk hfjska fhksjdhf kjsdhf ksj njk djksa fnjks fjskj fksda fjksjkajkjsfd'} time={'03:12'}/>

            {/* if next is other person's message, add a gap */}
      </ScrollView>


      <View style={styles.bottomBar}>
        <TextInput   
          style={[styles.input, {height:Math.min(200, inputHeight)}]}
          placeholder="Type your message..."
          placeholderTextColor={'gray'}
          multiline={true}
          numberOfLines={1}
          onContentSizeChange={handleContentSizeChange}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
        <Ionicons name="send" size={18} color="white" style={{left:2}}/>       
         </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor:'purple',
    left:40,
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