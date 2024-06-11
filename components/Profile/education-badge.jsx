import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const EducationBadge = ( {institution, duration, description}) => {
  return (
    <View style={styles.container}>
    <View style={styles.box}>
      <Text style={{fontWeight:'bold', paddingTop:5, paddingBottom:5}}>Master of Business Administration</Text>
      <Text style={{fontSize:13, paddingBottom:5}}>JAN 2022 - JAN 2024</Text>
      <Text style={{fontSize:12, paddingBottom:5}}>
        President of Harvard Finance Club asdjfk asdf sdfa sd sd jks lj 
        asdfklsfjksldfjlk
      </Text>


        </View>
    </View>
  )
}

export default EducationBadge

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'transparent',
        paddingBottom:5,
    },
    box: {
        width:'100%',
        padding:12,
        backgroundColor:'#E1E6E8',
        borderRadius:18,
    }

})