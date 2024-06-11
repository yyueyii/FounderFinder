import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity, Button, Platform, Link, Image } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';


const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;
const height = windowDimensions.height;

const EditProfile = (  { route  }) => {

  const handleSaveAndBack = () => {
    navigation.navigate('/profile', {  })
  }

  


  const [picture, setPicture] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [educationList, setEducationList] = useState([
    { institution: '', duration: '', description: '' }
  ]);
  const[workExperienceList, setWorkExperienceList] = useState([
    { organisation:'', duration: '', description:'' }
  ]);
  const [LCI, setLCI] = useState(''); //Let's Connect If...

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
      setPicture(result.assets[0].uri);
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

  //education 
  const handleInputChange = (index, field, value) => {
    const updatedEducationList = [...educationList];
    updatedEducationList[index][field] = value;
    setEducationList(updatedEducationList);
  };
  const addEducationEntry = () => {
    setEducationList([...educationList, { institution: '', duration: '', description: '' }]);
  };

  const removeEducationPrompt = (index) => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  //work exp
  const handleInputChangeWE = (index, field, value) => {
    const updatedWorkExperienceList = [...workExperienceList];
    updatedWorkExperienceList[index][field] = value;
    setWorkExperienceList(updatedWorkExperienceList);
  };
  const addWorkExperienceEntry = () => {
    setWorkExperienceList([...workExperienceList, { organisation: '', duration: '', description: '' }])
  };
  const removeWorkExperiencePrompt = (index) => {
    const updatedWorkExperienceList = [...workExperienceList];
    updatedWorkExperienceList.splice(index, 1);
    setWorkExperienceList(updatedWorkExperienceList);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <View style={styles.content}>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.subheadings}>Profile Picture</Text>

        <TouchableOpacity onPress={selectImage} style={styles.pictureContainer}>
        {picture ? (
          <Image source={{ uri: picture }} style={styles.picture} />
        ) : (
          <Text style={styles.picturePlaceholder}>Set Profile Picture</Text>
        )}
      </TouchableOpacity>

        <Text style={styles.subheadings}>Name</Text>
        <View style={styles.oneBox}></View>
        <TextInput
          style={[styles.input, {marginTop:-63}]}
          value={name}
          placeholder="Name"
          onChangeText={text => setName(text)}
        />

        <Text style={[styles.subheadings, {marginTop:7}]}>Description</Text>
        <View style={styles.threeBox}></View>
        <TextInput
          style={[styles.input, {marginTop:-120}]}
          value={description}
          placeholder="Description"
          multiline={true} 
          maxHeight={90}
          onChangeText={text => setDescription(text)}
          returnKeyType="done"
        />

        <Text style={[styles.subheadings, {marginTop: 30}]}>Interested Sector(s)</Text>
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

        <Text style={[styles.subheadings, {marginTop: 35}]}>Skill(s)</Text>
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

        <Text style={[styles.subheadings, {marginTop: 20}]}>About Me</Text>
        <View style={styles.fiveBox}></View>
        <TextInput
          style={[styles.input, {marginTop:-150}, {height:120}]}
          value={aboutMe}
          placeholder="About Me"
          multiline={true} 
          maxHeight={110}
          onChangeText={text => setAboutMe(text)}
        />

        <Text style={styles.subheadings}>Education</Text> 
      
      {educationList.map((entry, index) => ( ////////////////education 
        <View key={index} style={styles.entryContainer}>

        <View style={styles.educationContainer}> 
          <Text style={[{fontWeight:'bold'}]}>Institution:</Text>
          <TextInput
            style={[styles.input, {marginTop:-20}]}
            value={entry.institution}
            placeholder='Institution'
            onChangeText={(text) => handleInputChange(index, 'institution', text)}
          />
          <View style={[styles.oneBox, {marginTop: -62, width: width * 0.85, backgroundColor:'white'}]}></View>
          <Text style={[{fontWeight:'bold'}, {top:20}]}>Duration:</Text>
          <TextInput
              style={styles.input}
              value={entry.duration}
              placeholder='Duration'
              onChangeText={(text) => handleInputChange(index, 'duration', text)}
          /> 
          <View style={[styles.oneBox, {marginTop: -62, width: width*0.85, backgroundColor:'white'}]}></View>

          <Text style={[{fontWeight:'bold'}, {top:20}]}>Description:</Text>
          <TextInput
            style={[styles.input, {top:30}]}
            value={entry.description}
            placeholder='Description'
            multiline={true} 
            maxHeight={85}
            onChangeText={(text) => handleInputChange(index, 'description', text)}
          />  
          <View style={[styles.threeBox, {marginTop: -62, width:width*0.85, backgroundColor:'white'}]}></View>

         

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
      {workExperienceList.map((entry, index) => (      ///////////////////WorkExperience

      <View key={index} style={styles.entryContainer}>

        <View style={styles.educationContainer}> 
          <Text style={[{fontWeight:'bold'}]}>Organisation:</Text>
          <TextInput
            style={[styles.input, {marginTop:-20}]}
            value={entry.organisation}
            placeholder='Organisation'
            onChangeText={(text) => handleInputChangeWE(index, 'organisation', text)}
          />
          <View style={[styles.oneBox, {marginTop: -62, width: width * 0.85, backgroundColor:'white'}]}></View>
        

        <Text style={[{fontWeight:'bold', top:20}]}>Duration:</Text>
        <TextInput
            style={[styles.input]}
            value={entry.duration}
            placeholder='Duration'
            onChangeText={(text) => handleInputChangeWE(index, 'duration', text)}
          />
          <View style={[styles.oneBox, {marginTop: -62, width: width * 0.85, backgroundColor:'white'}]}></View>

        <Text style={[{fontWeight:'bold', top:20}]}>Description:</Text>
        <TextInput
            style={[styles.input, {marginTop:0}]}
            value={entry.description}
            placeholder='Description'
            onChangeText={(text) => handleInputChangeWE(index, 'description', text)}
          />
          <View style={[styles.threeBox, {marginTop: -62, width:width*0.85, backgroundColor:'white'}]}></View>

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
      <View style={styles.fiveBox}></View>
      <TextInput
          style={[styles.input, {marginTop:-145}, {height:120}]}
          value={LCI}
          placeholder="Let's Connect If..."
          multiline={true} 
          maxHeight={110}
          onChangeText={text => setLCI(text)}
      />
       
       <TouchableOpacity  onPress={handleGoBack}style={styles.backButton}>
          <Text style={styles.addButtonText}>Back</Text>
       </TouchableOpacity>

       <TouchableOpacity  onPress={() => {}} style={styles.saveButton}>
          <Text style={styles.addButtonText}>Save and Back</Text>
       </TouchableOpacity>

       <TouchableOpacity  onPress={() => {}} style={styles.publishButton}>
          <Text style={styles.addButtonText}>Publish</Text>
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
    marginTop:30,
    zIndex:1,
  },
  oneBox: {
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    width: width * 0.9, 
    height: 35,
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 3, 
    justifyContent:'left',
    alignItems:'center',
    zIndex: -1,
  },
  input: {
    zIndex:1,
    paddingLeft:10,
    height:90
  },
  threeBox: {
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    width: width * 0.9, 
    height: 95,
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 5, 
    justifyContent:'left',
    alignItems:'center',
    zIndex: -1,
    marginBottom:30,
    
  },
  sectors: {
    marginTop:5,
    borderWidth: 1, 
    borderRadius: 5, 
    backgroundColor: 'white', 
    width: width * 0.9, 
    height: 35,
    marginBottom:15,
  },
  skills: {
    marginTop:5,
    borderWidth: 1, 
    borderRadius: 5, 
    backgroundColor: 'white', 
    width: width * 0.9, 
    height: 35,
    marginBottom: 15,
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
    top:-10,
    marginBottom:20,

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
    backgroundColor: '#43B0FF',
    width: 90,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    marginTop:50,
  },
  saveButton: {
    backgroundColor: '#43B0FF',
    width: 140,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    marginTop:-55,
    left: 100,
  },
  publishButton:{
    backgroundColor: '#4A0AFF',
    width: 140,
    borderRadius:10,
    top:10,
    height: 35,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 20,
    marginTop:-5,
    left: 0,
  }, 
  empty: {
    height: 50
  }
  
  
})