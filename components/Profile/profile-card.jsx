import { View, Text, StyleSheet, FlatList, Image, Dimensions} from 'react-native'
import React from 'react'
import EducationBadge from './education-badge'
import SkillBubble from './skill-bubble'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const ProfileCard = ( {profileData, onSwipeLeft, onSwipeRight}) => {

    if (!profileData) {
        return null;
      }

  return (
    <View style={styles.container}>
        <View style={styles.shadowContainer}>  
           {profileData["pic"] ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${profileData["pic"]}` }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.image}>
                <FontAwesome6 name="user-large" size={200} color="#b5b5b5" style={{top:-15}} />           
        </View>
      )}
           
        </View>
        <View style={styles.wordContainer}>
            <Text style={styles.name}> {profileData["name"] } </Text>
            <Text style={styles.description}>{profileData["description"]}</Text>
            <Text style={styles.subheading}>Interested Sectors</Text>
            <SkillBubble skills={profileData["sectors"]}/> 
            <Text style={styles.subheading}>Skills</Text>
            <SkillBubble skills={profileData["skills"]} /> 

            <Text style={styles.subheading}>About Me</Text>
            <Text style={styles.text}>{profileData["aboutMe"]}</Text>
            <Text style={styles.subheading}>Education</Text>
            {profileData["education"].map((education, index) => (
                <EducationBadge
                    key={index}
                    institution={education.institution}
                    duration={education.duration}
                    description={education.description}
                />
            ))} 
            
            <Text style={[styles.subheading,{paddingTop:15}]}>Work Experience</Text>
            {profileData["workExperience"].map((workExperience, index) => (
                <EducationBadge
                    key={index}
                    institution={workExperience.organisation}
                    duration={workExperience.duration}
                    description={workExperience.description}
                />
            ))}
            <Text style={[styles.subheading,{paddingTop:15}]}>Let's Connect If...</Text>
            <Text style={styles.text}> {profileData["LCI"]} </Text>
            <View style={{height:120}}/>
        </View>

    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width:'100%',
        borderRadius:25,
    }, 
    image:{
        width:'100%',
        aspectRatio:1,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        
    },
    shadowContainer:{
        borderRadius:25,
        shadowColor:'#000',
        shadowOffset: { width: 0, height: 5},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor:'#E1E6E8',
        elevation:5
    },
    wordContainer: {
        padding:20,
    },
    name:{
        paddingTop:10,
        fontSize:24,
        fontWeight:'bold',
        color:'#4A0AFF',
    }, 
    description: {
        fontSize:18,
        paddingTop:15,
        paddingBottom:10, 
    }, 
    subheading:{
        fontSize:18, 
        paddingTop:10, 
        paddingBottom:10,
        fontWeight:'bold',
        color:'#4A0AFF'
    }, 
    text: {
        paddingBottom:15,
        lineHeight:18,
    },
    skillBubble: {
        padding:5,
        backgroundColor:'gray',
    }
})