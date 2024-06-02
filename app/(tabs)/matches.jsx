import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import MatchedProfileDisplay from '../../components/MatchesPage/matched-profile'

const width = Dimensions.get('window').width;


const Matches = () => {
  return (
    <ScrollView contentContainerStyle={{backgroundColor:'white'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Successful Matches</Text>
        <View style={{height:50, backgroundColor:'lightblue', alignItems:'center'}}>
          <Text> insert search bar </Text>
        </View>
        <View style={{height:1, left:100, width: width, backgroundColor:'purple'}}></View>
        <MatchedProfileDisplay/>
        <MatchedProfileDisplay/>

      <View style={styles.empty}></View>
      </View>
    </ScrollView>
  )
}

export default Matches

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight:20,
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
  }

})
