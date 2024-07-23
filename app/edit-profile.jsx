import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Button, Platform, Link, Image, FlatListComponent, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import useUserStore from './store/userStore';






const windowDimensions = Dimensions.get('window');
const width = windowDimensions.width;

const EditProfile = () => {
  const userId = useUserStore(state => state.userId);

  const params = useLocalSearchParams();

  const [profileData, setProfileData] = useState({
    picture:params.pictureURI,
    name:params.name,
    description:params.description, 
    aboutMe:params.aboutMe,
    educationList:JSON.parse(params.education),
    workExperienceList:JSON.parse(params.workExperience),
    LCI: params.LCI
  });
  const [base64Image, setBase64Image] = useState(params.pictureBase64); //params.picture is BASE64

  console.log(profileData);
  console.log(base64Image)
    const [sectors, setSectors] = useState(JSON.parse(params.sectors));
    const [skills, setSkills] = useState(JSON.parse(params.skills));
     //interested sectors - dropdown picker
  const [open1, setOpen1] = useState(false);
  const [items1, setItems1] = useState([
   
    {label: 'Tech', value: 'Tech'},
    {label: 'Finance', value: 'Finance'},
    {label: 'Semiconductors', value: 'Semiconductor'},
    {label: 'Sustainability', value: 'Sustainability'},
    {label: 'Clean Energy', value: 'Clean Energy'},
    {label: 'Healthcare', value: 'Healthcare'},
    {label: 'Education', value: 'Education'},
    {label: 'Non-profit', value: 'Non-profit'},

  ]);

  //dropdown picker - skills
  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([
    { label: 'React Native', value: 'React Native' },
    { label: 'Data Analytics', value: 'Data Analytics' },
    { label: 'Software Development', value: 'Software Development' },
    { label: 'Project Management', value: 'Project Management' },
    { label: 'Business Development', value: 'Business Development' },
    { label: 'Curriculum Development', value: 'Curriculum Development' },



    
  ]);
  


    const handleUpdateProfile = async () => {
      try {
        const response = await fetch(`http://192.168.1.5:5001/edit-profile/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "pic":base64Image,
            "name": profileData.name,
            "description": profileData.description,
            "aboutMe": profileData.aboutMe,
            "LCI": profileData.LCI,
            "workExperience": profileData.workExperienceList.filter(work =>
              work.organisation || work.duration || work.description
            ),
            "education":profileData.educationList.filter(education => 
              education.institution || education.duration || education.description
            ),
            "sectors": sectors,
            "skills": skills,
            "published":true,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        const updatedUser = await response.json();
        console.log('Updated profileData:', updatedUser);
        
        
        router.replace('/profile');    
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'Failed to update profile');
      }
    };



 



  //navigation 
  const handleGoBack = () => {
     router.replace('/profile');
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
      quality: 0.05,
    });

    if (!result.canceled) {
      setProfileData({...profileData, picture:(result.assets[0].uri)});
      if (Platform.OS === 'web') {
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setBase64Image(reader.result.split(',')[1]); 
        };
        reader.readAsDataURL(blob);
      } else {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64Image(base64);
      }
    }
  };

  

 

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
    setProfileData({...profileData, workExperienceList: [...profileData.workExperienceList, { organisation: '', duration: '', description: '' }]})
    console.log(profileData.workExperienceList);
  };

  const removeWorkExperiencePrompt = (index) => {
    const updatedWorkExperienceList = [...profileData.workExperienceList];
    updatedWorkExperienceList.splice(index, 1);
    setProfileData({...profileData, workExperienceList:(updatedWorkExperienceList)});
  };

  


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
    >
    <ScrollView contentContainerStyle={styles.container}> 

      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.subheadings}>Profile Picture</Text>

        <TouchableOpacity onPress={selectImage} style={styles.pictureContainer}>
         {base64Image ? (
          <Image source={{ uri: profileData.picture }} style={styles.picture} />
        ) : ( 
          <View style={styles.picturePlaceholder}>
          <Text style={{textAlign:'center'}}>Set Profile Picture</Text>
          </View>
         )}

      {base64Image && (
        <>
          <Text></Text>
          
        </>
      )}

      </TouchableOpacity>

        <Text style={styles.subheadings}>Name</Text>
        <TextInput
          style={[styles.input, {marginTop:0, borderColor:'black'}]}
          value={profileData["name"]}
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
          value={sectors}
          items={items1}
          setOpen={setOpen1}
          setValue={setSectors}
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
          value={skills}
          items={items2}
          setOpen={setOpen2}
          setValue={setSkills}
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

       <TouchableOpacity  onPress={handleUpdateProfile} style={styles.saveButton}>
          <Text style={styles.addButtonText}>Publish</Text>
       </TouchableOpacity>

        <View style={styles.empty}></View>
      </SafeAreaView>
    </ScrollView>
    </KeyboardAvoidingView>

    )
  }

export default EditProfile;

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
    backgroundColor: 'white',
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
    width:width * 0.3,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'lightgray',
    aspectRatio:1,
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
    width: 100,
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