import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity, Button, Platform, Link, Image, FlatListComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;
const height = windowDimensions.height;

const EditProfile = (  {   }) => {
    const [user, setUser]  = useState([])



  const [profileData, setProfileData] = useState({
    picture:null,
    name: '',
    description:'',
    aboutMe:'',
    educationList:[ 
      {institution:'', duration:'', description:''}
    ],
    workExperienceList:[
      {organisation:'', duration:'', description:''}
    ],
    sectors:[],
  })



  //navigation 
  const handleGoBack = () => {
    navigation.navigate('/profile');
  };

  //profile pic
  const selectImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData({...profileData, picture:(result.assets[0].uri)});
    }
  };

  //interested sectors - dropdown picker
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState([]);
  const [items1, setItems1] = useState([
   
    {label: 'Tech', value: 'tech'},
    {label: 'Finance', value: 'finance'},
    {label: 'Semiconductors', value: 'semiconductor'},
    {label: 'Sustainability', value: 'sustainability'},

  ]);
  

  //dropdown picker - skills
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState([]);
  const [items2, setItems2] = useState([
    { label: 'React Native', value: 'react-native' },
    { label: 'Data Analytics', value: 'data-analytics' },
    { label: 'Software Development', value: 'software-development' },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedEducationList = [...profileData.educationList];
    updatedEducationList[index][field] = value;
    setProfileData({...profileData, educationList:(updatedEducationList)});
  }

  const addEducationEntry = () => {
    setProfileData({...profileData, educationList: [...profileData.educationList, {institution:'', duration:'', description:''}]})
  }


  const removeEducationPrompt = (index) => {
    const updatedEducationList = [...profileData.educationList];
    updatedEducationList.splice(index, 1);
    setProfileData({...profileData, educationList:updatedEducationList});
  }

  //work exp
  const handleInputChangeWE = (index, field, value) => {
    const updatedWorkExperienceList = [...profileData.workExperienceList];
    updatedWorkExperienceList[index][field] = value;
    setProfileData({...profileData, workExperienceList:updatedWorkExperienceList});
  };


  const addWorkExperienceEntry = () => {
    setProfileData({...profileData, workExperienceList: [...profileData.educationList, { organisation: '', duration: '', description: '' }]})
  };

  const removeWorkExperiencePrompt = (index) => {
    const updatedWorkExperienceList = [...profileData.workExperienceList];
    updatedWorkExperienceList.splice(index, 1);
    setProfiledata({...profileData, workExperienceList:(updatedWorkExperienceList)});
  };



  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <View style={styles.content}>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.subheadings}>Profile Picture</Text>

        <TouchableOpacity onPress={selectImage} style={styles.pictureContainer}>
        {profileData.picture ? (
          <Image source={{ uri: profileData.picture }} style={styles.picture} />
        ) : (
          <Text style={styles.picturePlaceholder}>Set Profile Picture</Text>
        )}
      </TouchableOpacity>

        <Text style={styles.subheadings}>Name</Text>
        <TextInput
          style={[styles.input, {marginTop:0, height:30, borderColor:'black'}]}
          value={user.name}
          placeholder="Name"
          onChangeText={text => setProfileData({...profileData, name:(text)})}

        />

        <Text style={[styles.subheadings, {}]}>Description</Text>
        <TextInput
          style={[styles.input, {height:90}]}
          value={profileData.description}
          placeholder="Description"
          multiline={true} 
          maxHeight={90}
          onChangeText={text => setProfileData({...profileData, description:(text)})}
          returnKeyType="done"
        />

        <Text style={[styles.subheadings, {}]}>Interested Sector(s)</Text>
        <DropDownPicker
          open={open1}
          value={value1}
          items={items1}
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setItems1}
          multiple={true}
          style={styles.sectors}
          mode="BADGE"
          maxHeight={200}
          stickyHeader={true}
          zIndex={3000}
          zIndexInverse={1000}
          //badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        
          />

        <Text style={[styles.subheadings, {}]}>Skill(s)</Text>
        <DropDownPicker
          open={open2}
          value={value2}
          items={items2}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems2}
          multiple={true}
          style={styles.skills}
          mode="BADGE"
          maxHeight={200}
          zIndex={1000}
          zIndexInverse={3000}
          //badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        
          />

        <Text style={[styles.subheadings, {}]}>About Me</Text>
        <TextInput
          style={[styles.input, , {height:120}]}
          value={profileData.aboutMe}
          placeholder="About Me"
          multiline={true} 
          maxHeight={110}
          onChangeText={text => setProfileData({...profileData, aboutMe:(text)})}
        />

        <Text style={styles.subheadings}>Education</Text> 
      
      {profileData.educationList.map((entry, index) => ( ////////////////education 
        <View key={index} style={styles.entryContainer}>

        <View style={styles.educationContainer}> 
          <Text style={[{fontWeight:'bold', paddingBottom:5}]}>Institution:</Text>
          <TextInput
            style={[styles.input, {}]}
            value={entry.institution}
            placeholder='Institution'
            onChangeText={(text) => handleInputChange(index, 'institution', text)}
          />
          <Text style={[{fontWeight:'bold'}, {paddingTop:15, paddingBottom:5}]}>Duration:</Text>
          <TextInput
              style={styles.input}
              value={entry.duration}
              placeholder='Duration'
              onChangeText={(text) => handleInputChange(index, 'duration', text)}
          /> 

          <Text style={[{fontWeight:'bold'}, {paddingTop:15, paddingBottom:5}]}>Description:</Text>
          <TextInput
            style={[styles.input, {height:120}]}
            value={entry.description}
            placeholder='Description'
            multiline={true} 
            maxHeight={120}
            onChangeText={(text) => handleInputChange(index, 'description', text)}
          />  

          <TouchableOpacity onPress={() => removeEducationPrompt(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
        </View>
      ))}
      

      <TouchableOpacity onPress={addEducationEntry} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Education</Text>
      </TouchableOpacity>

      <Text style={styles.subheadings}>Work Experience</Text> 
      {profileData.workExperienceList.map((entry, index) => (      ///////////////////WorkExperience

      <View key={index} style={styles.entryContainer}>

        <View style={styles.educationContainer}> 
          <Text style={[{fontWeight:'bold', paddingBottom:5}]}>Organisation:</Text>
          <TextInput
            style={[styles.input, {}]}
            value={entry.organisation}
            placeholder='Organisation'
            onChangeText={(text) => handleInputChangeWE(index, 'organisation', text)}
          />
        

        <Text style={[{fontWeight:'bold', paddingBottom:5, paddingTop:15}]}>Duration:</Text>
        <TextInput
            style={[styles.input]}
            value={entry.duration}
            placeholder='Duration'
            onChangeText={(text) => handleInputChangeWE(index, 'duration', text)}
          />

        <Text style={[{fontWeight:'bold', paddingTop:15, paddingBottom:5}]}>Description:</Text>
        <TextInput
            style={[styles.input, {height:120}]}
            value={entry.description}
            placeholder='Description'
            maxHeight={120}
            multiline={true}
            onChangeText={(text) => handleInputChangeWE(index, 'description', text)}
          />

          <TouchableOpacity onPress={() => removeWorkExperiencePrompt(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
        </View>
      ))}
      

      <TouchableOpacity onPress={addWorkExperienceEntry} style={styles.addWEButton}>
          <Text style={styles.addButtonText}>+ Add Work Experience</Text>
      </TouchableOpacity>


      <Text style={styles.subheadings}>Let's Connect If...</Text>
      <TextInput
          style={[styles.input, {}, {height:120}]}
          value={profileData.LCI}
          placeholder="Let's Connect If..."
          multiline={true} 
          maxHeight={110}
          onChangeText={text => setProfileData({...profileData, LCI:(text)})}
      />
       
       <TouchableOpacity  onPress={handleGoBack}style={styles.backButton}>
          <Text style={[styles.addButtonText, {color:'#4A0AFF'}]}>Back</Text>
       </TouchableOpacity>

       <TouchableOpacity  onPress={() =>{}} style={styles.saveButton}>
          <Text style={styles.addButtonText}>Save and Back</Text>
       </TouchableOpacity>

        <View style={styles.empty}></View>
      </View>
    </ScrollView>
    )
  }

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  educationContainer: {
    backgroundColor:'#C9E8FF',
    zIndex:-1,
    borderRadius:10,
    width:width * 0.9,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
  
    height: 370,
    marginBottom: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor:'white',
  }, 
  title: {
    fontSize: 24,
    color:'#4A0AFF',
    fontWeight: 'bold',
  },
  pictureContainer: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#e0e0e0',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:15,
  },
  picture: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius:5,
  },
  picturePlaceholder: {
    borderRadius:5,
    textAlign:'center',
  },
  subheadings: {
    fontSize:18, 
    marginBottom:10, 
    colour: 'black',
    fontWeight:'bold',
    marginTop:20,
  },
  input: {
    padding:10,
    borderColor:'black', 
    borderWidth:1,
    borderRadius:5,
  },
  sectors: {
    marginTop:5,
    borderWidth: 1, 
    borderRadius: 5, 
    backgroundColor: 'white', 
    width: width * 0.9, 
    height: 35,
    marginBottom:10,
  },
  skills: {
    marginTop:5,
    borderWidth: 1, 
    borderRadius: 5, 
    backgroundColor: 'white', 
    width: width * 0.9, 
    height: 35,
    marginBottom: 10,
  }, 
  fiveBox: {
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    width: width * 0.9, 
    height: 120,
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 5, 
    justifyContent:'left',
    alignItems:'center',
    zIndex: -1,
    marginBottom:30,
  },
  addButton: { //add education button
    backgroundColor: '#4A0AFF',
    width: 130,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: "white",
  
  },
  removeButton: {
    backgroundColor:'gray',
    opacity:0.7, 
    width: 75,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    marginBottom:10,
    top:15,


  }, 
  removeButtonText: {
    color:"white",
  },
  addWEButton: {  //add work exp button 
    backgroundColor: '#4A0AFF',
    width: 180,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'white',
    width: 90,
    borderRadius:10,
    borderWidth:1.5,
    borderColor:'#4A0AFF',
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    marginTop:20,
  },
  saveButton: {
    backgroundColor: '#4A0AFF',
    width: 140,
    borderRadius:10,
    borderWidth:1.5,
    borderColor:'#4A0AFF',
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    marginTop:-55,
    left: 100,
  },
  
  empty: {
    height: 40
  }
  
  
})