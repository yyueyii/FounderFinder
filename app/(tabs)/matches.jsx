import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import MatchedProfileDisplay from '../../components/MatchesPage/matched-profile'

const width = Dimensions.get('window').width;


const Matches = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Successful Matches</Text>
        <View style={{height:20}}/>
        <View style={{height:1, backgroundColor:'#E1E6E8', left: -20, width:'120%'}}/>

        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View>

        <MatchedProfileDisplay/>
        <MatchedProfileDisplay/>
        <MatchedProfileDisplay/>
        <MatchedProfileDisplay/>
        <MatchedProfileDisplay/>
        
        </View>
        </ScrollView>

      </View>
  )
}

export default Matches

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 20,
    backgroundColor:'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color:'#4A0AFF',
    fontWeight: 'bold',
  },
  empty: {
    height:100,
  }, 
  

})
