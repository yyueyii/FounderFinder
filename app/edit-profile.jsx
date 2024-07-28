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
   
    {label: 'Agriculture', value: 'Agriculture'},
    {label: 'Artificial Intelligence', value: 'Artificial Intelligence'},
    {label: 'Clean Energy', value: 'Clean Energy'},
    {label: 'Cybersecurity', value: 'Cybersecurity'},
    {label: 'E-commerce', value: 'E-commerce'},
    {label: 'Education', value: 'Education'},
    {label: 'Environment & Sustainability', value: 'Environment & Sustainability'},
    {label: 'Fashion & Apparel', value: 'Fashion & Apparel'},
    {label: 'Finance', value: 'Finance'},
    {label: 'Food & Beverage', value: 'Food & Beverage'},
    {label: 'Healthcare', value: 'Healthcare'},
    {label: 'HR & Recruitment', value: 'HR & Recruitment'},
    {label: 'Logistics & Supply Chain', value: 'Logistics & Supply Chain'},
    {label: 'Manufacturing', value: 'Manufacturing'},
    {label: 'Media & Entertainment', value: 'Media & Entertainment'},
    {label: 'Real Estate', value: 'Real Estate'},
    {label: 'Social Media & Networking', value: 'Social Media & Networking'},
    {label: 'Technology', value: 'Technology'},
    {label: 'Telecommunications', value: 'Telecommunications'},
    {label: 'Transportation', value: 'Transportation'},
    {label: 'Travel & Hospitality', value: 'Travel & Hospitality'},

  ]);

  //dropdown picker - skills
  const [open2, setOpen2] = useState(false);
  const [items2, setItems2] = useState([
    
    { label: 'Business Strategy', value: 'Business Strategy' },
    { label: 'Content Creation', value: 'Content Creation' },
    { label: 'Customer Relationship Management', value: 'Customer Relationship Management' },
    { label: 'Data Analysis', value: 'Data Analysis' },
    { label: 'Financial Management', value: 'Financial Management' },
    { label: 'Graphic Design', value: 'Graphic Design' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Graphic Design', value: 'Graphic Design' },
    { label: 'Product Management', value: 'Product Management' },
    { label: 'Project Management', value: 'Project Management' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Social Media Management', value: 'Social Media Management' },
    { label: 'Software Development', value: 'Software Development' },
    { label: 'Team Leadership', value: 'Team Leadership' },
    { label: 'UX/UI Design', value: 'UX/UI Design' },
    { label: 'Web Development', value: 'Web Development' },

    
  ]);
  


    const handleUpdateProfile = async () => {
      try {
        const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/edit-profile/${userId}`, {
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
        
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   const errorText = await response.text();
        //   throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
        //   // throw new Error('Failed to update profile');
        // }

        if (!response.ok) {
          // Handle non-JSON responses
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json(); // Parse JSON error response
            throw new Error(`Failed to update profile: ${response.status} - ${errorData.message}`);
          } else {
            const errorText = await response.text(); // Read error response as text
            throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
          }
        }
        
        const updatedUser = await response.json();
        console.log('Updated profileData:', updatedUser);
        
        
        router.replace('/profile');    
      } catch (error) {
        console.error('Error updating profile in edit-profile:', error);
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
          style={[styles.input, {marginTop:0, borderColor:'black', height:40}]}
          value={profileData["name"]}
          placeholder="Name"
          textAlignVertical="top"
          onChangeText={text => setProfileData({...profileData, name:(text)})}

        />

        <Text style={[styles.subheadings, {}]}>Description</Text>
        <TextInput
          style={[styles.input, {height:90}]}
          value={profileData.description}
          placeholder="Description"
          multiline={true} 
          maxHeight={90}
          textAlignVertical="top"
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
          textAlignVertical="top"
          onChangeText={text => setProfileData({...profileData, aboutMe:(text)})}
        />

        <Text style={styles.subheadings}>Education</Text> 
      
      {profileData.educationList.map((entry, index) => ( ////////////////education 
        <View key={index} style={styles.entryContainer}>

        <View style={styles.educationContainer}> 
          <Text style={[{fontWeight:'bold', paddingBottom:5}]}>Institution:</Text>
          <TextInput
            style={[styles.input, {height:40}]}
            value={entry.institution}
            placeholder='Institution'
            textAlignVertical="top"
            onChangeText={(text) => handleInputChange(index, 'institution', text)}
          />
          <Text style={[{fontWeight:'bold'}, {paddingTop:15, paddingBottom:5}]}>Duration:</Text>
          <TextInput
              style={[styles.input, {height:40}]}
              value={entry.duration}
              placeholder='Duration'
              textAlignVertical="top"
              onChangeText={(text) => handleInputChange(index, 'duration', text)}
          /> 

          <Text style={[{fontWeight:'bold'}, {paddingTop:15, paddingBottom:5}]}>Description:</Text>
          <TextInput
            style={[styles.input, {height:120}]}
            value={entry.description}
            placeholder='Description'
            multiline={true} 
            maxHeight={120}
            textAlignVertical="top"
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
            style={[styles.input, {height:40}]}
            value={entry.organisation}
            placeholder='Organisation'
            textAlignVertical="top"
            onChangeText={(text) => handleInputChangeWE(index, 'organisation', text)}
          />
        

        <Text style={[{fontWeight:'bold', paddingBottom:5, paddingTop:15}]}>Duration:</Text>
        <TextInput
            style={[styles.input, {height:40}]}
            value={entry.duration}
            placeholder='Duration'
            textAlignVertical="top"
            onChangeText={(text) => handleInputChangeWE(index, 'duration', text)}
          />

        <Text style={[{fontWeight:'bold', paddingTop:15, paddingBottom:5}]}>Description:</Text>
        <TextInput
            style={[styles.input, {height:120}]}
            value={entry.description}
            placeholder='Description'
            maxHeight={120}
            multiline={true}
            textAlignVertical="top"
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
          textAlignVertical="top"
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