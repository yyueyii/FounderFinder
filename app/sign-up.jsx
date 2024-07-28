import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler'
import { Link } from 'expo-router';
import axios from 'axios';


// const facebook = require("../../assets/facebook.png")
// const linkedin = require("../../assets/linkedin.png")
// const tiktok = require("../../assets/tiktok.png")


const SignUpPage = () => {

  const [register, setRegister] = useState(false);
    const [email, setEmail] =  useState("");
    // const [token, setToken] =  useState("");
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [password,setPassword] =  useState("");
    const [verifyPassword, setVerifyPassword] = useState(false);
    const navigation = useNavigation();

    // const token = useTokenStore(state => state.token);

    async function handleSubmit() {
      const userData = {
        email,
        password,
        pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", 
        name: "",
        description: "",
        skills: [],
        sectors: [],
        education: "",
        verificationToken: "",
        verified: false,
      };

      try {
        const res = await axios.post("https://founderfinder-1-cfmd.onrender.com/sign-up", userData);
        console.log(res.data);
        console.log(res.data.status);
        
        if (res.data.status == "ok") {
          alert("Registered successfully! Please check your email for the verification email (Please check your spam too).If you have not received anything, go to the bottom of your profile to be resent an email.");
          // navigation.navigate('/log-in');
        } else {
          alert(JSON.stringify(res.data));
          Alert.alert(JSON.stringify(res.data));
        }
      } catch (error) {
        console.log(error.message);
      }

    }

    function handleEmail(e) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmail(e);
      if (emailRegex.test(e)) {
        setVerifyEmail(true);
      } else {
        setVerifyEmail(false);
      }
    }

    function handlePassword(e) {
      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+}{":?><`~';,.=-]{8,}$/;
      setPassword(e);
      if (passwordRegex.test(e)) {
        setVerifyPassword(true);
      } else {
        setVerifyPassword(false);
      }
    }

  return (
    <SafeAreaView style={styles.container}>
        
        <Text style={styles.title}>Sign up</Text>
        <View style={styles.inputView}>
            <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={e => handleEmail(e)} autoCorrect={false}
        autoCapitalize='none' />
        {verifyEmail ? <Text style={styles.forgetText}>This is alright!</Text> : <Text style={styles.forgetText1}>This is not a valid email address :(</Text>}
            <TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={e => handlePassword(e)} autoCorrect={false}
        autoCapitalize='none'/>
        {verifyPassword ? <Text style={styles.forgetText}>This is alright!</Text> : <Text style={styles.forgetText1}>Password must contain at least 8 characters, 1 upper case letter, 1 lower case letter, a digit and a special character</Text>}
          {/* <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry value={password} onChange={e => handlePassword(e)} autoCorrect={false}
        autoCapitalize='none'/> */}
        </View>

        <View style={styles.buttonView}>
        <Pressable style={[styles.button, (!verifyEmail || !verifyPassword) && styles.disabledButton]} onPress={() => handleSubmit()} disabled={!verifyEmail || !verifyPassword}>
              <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
        
        {/* <View style={styles.mediaIcons}>
                <Image source={facebook} style={styles.icons}   />
                <Image source={tiktok} style={styles.icons}  />
                <Image source={linkedin} style={styles.icons}  />
        </View> */}

        <Text style={styles.footerText}>Already have an account?<Link style={styles.signup} href="/log-in">  Log in</Link></Text>
        
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
    color : "#4A0AFF"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
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
    marginBottom : 8
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
  forgetText1 : {
    fontSize : 11
  },
  button : {
    backgroundColor : "#4A0AFF",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
  },
  disabledButton: {
    backgroundColor: 'gray',
    opacity: 0.6,
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
  },
  signup : {
    color : "#4A0AFF",
    fontSize : 13
  }
});

export default SignUpPage;