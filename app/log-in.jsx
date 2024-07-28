import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, KeyboardAvoidingView, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import 'react-native-gesture-handler'
import { Link, router } from 'expo-router';
import axios from 'axios';
import useUserStore from './store/userStore';


// const facebook = require("../../assets/facebook.png")
// const linkedin = require("../../assets/linkedin.png")
// const tiktok = require("../../assets/tiktok.png")

const LoginPage = () => {
  const setUser = useUserStore(state => state.setUserId); 
    const [click,setClick] = useState(false);
    const [email, setEmail] =  useState("");
    const [password,setPassword] =  useState("");

    function handleSubmit() {
      const userData = {
        email,
        password,
      };
      console.log('pressed');
      axios.post("https://founderfinder-1-cfmd.onrender.com/log-in", userData)
      .then(res => {console.log(res.data);
        if (res.data.status == "ok") {
          router.replace('/home');
          return fetchUserId(email);
        } else {
          alert((res.data));
        }
      })
     
      .catch(e => console.error(e.message));
    }

    const fetchUserId = async (email) => {
      try {
        const response = await axios.get(`https://founderfinder-1-cfmd.onrender.com/getId/${email}`);
  
        console.log('User ID:', response.data.userId);
        setUser(response.data.userId);
        console.log('userId stored');
  
      } catch (error) {
        console.error('Error fetching user ID:', error.message);
        alert('Failed to fetch user ID. Please try again later.'); // Handle error in fetching user ID
      }
    };

  return (
    <SafeAreaView style={styles.container}>
        
        <Text style={styles.title}>Log in</Text>
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} autoCorrect={false}
        autoCapitalize='none' />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} autoCorrect={false}
        autoCapitalize='none'/>
        </View>
        <View style={styles.rememberView}>
            {/* <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "#4A0AFF" , false : "gray"}} />
                <Text style={styles.rememberText}>Remember Me</Text>
            </View> */}
            {/* <View>
                <Pressable onPress={() => Alert.alert("Forget Password!")}>
                    <Text style={styles.forgetText}>Forgot Password?</Text>
                </Pressable>
            </View> */}
        </View>

        <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
            {/* <Pressable style={styles.button} onPress={() => Alert.alert("Login Successfuly!")}>
                <Text style={styles.buttonText}>Log In</Text>
            </Pressable> */}
            {/* <Text style={styles.optionsText}>OR LOGIN WITH</Text> */}
        </View>
        
        {/* <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons}   />
                <Image source={tiktok} style={styles.icons}  />
                <Image source={linkedin} style={styles.icons}  />
        </View> */}

        <Text style={styles.footerText}>Don't Have Account?<Link style={styles.signup} href="/sign-up">  Sign Up</Link></Text>
        
  </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "#4A0AFF",
    top:-50,
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5,
    top:-50,
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "#4A0AFF",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8,
    top: -50,
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "#4A0AFF"
  },
  button : {
    backgroundColor : "#4A0AFF",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    top:-50,
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
    top:-45,
  },
  signup : {
    color : "#4A0AFF",
    fontSize : 13
  }
});

export default LoginPage;