import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import EducationBadge from './education-badge'

const ProfileCard = () => {
  return (
    <View style={styles.container}>
        <View style={styles.image}/>
        <View style={styles.wordContainer}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.description}>Harvard Business School Graduate</Text>
            <Text style={styles.subheading}>Interested Sectors</Text>
            <Text style={styles.subheading}>Skills</Text>
            <Text style={styles.subheading}>About Me</Text>
            <Text style={styles.text}> 
            Hi, I’m Annabelle! I’m interested in the blend of finance and technology. I’m a driven and passionate individual who is open to learning anything and everything financial related! 
            </Text>
            <Text style={styles.subheading}>Education</Text>
            <EducationBadge/>
            <EducationBadge/>
            <Text style={[styles.subheading,{paddingTop:15}]}>Work Experience</Text>
            <EducationBadge/>
            <EducationBadge/>

            <Text style={[styles.subheading,{paddingTop:15}]}>Let's Connect If...</Text>
            <Text style={styles.text}> 
            You are a technical co-founder in the FinTech space looking for a non-technical co-founder to handle all things business
            </Text>
            <View style={{height:40}}/>
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
        backgroundColor:'gray',
        borderRadius:25,
        shadowColor:'#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,  
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
    }
})