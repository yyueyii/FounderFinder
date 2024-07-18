import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import MatchedProfileDisplay from '../../components/MatchesPage/matched-profile'
import { SafeAreaView } from 'react-native-safe-area-context';
import useUserStore from '../store/userStore';
import { Link, useNavigation } from 'expo-router';

const width = Dimensions.get('window').width;



const Matches = () => {
  const userId = useUserStore(state => state.userId);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://192.168.101.16:5001/successfulMatches/${userId}`);
        const json = await response.json();
          setMatches(json); 
          console.log("matched profile datan fetched:", matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);
  console.log(matches);

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Successful Matches</Text>
        <View style={{height:20}}/>
        <View style={{height:1, backgroundColor:'#E1E6E8', left: -20, width:'120%'}}/>

        <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View>
          <FlatList
          data={matches}
          renderItem={({ item }) => <MatchedProfileDisplay profileData={item} />}
          keyExtractor={(item) => item._id.toString()}
        />
        
        </View>
        </ScrollView>

      </SafeAreaView>
  )
}

export default Matches;

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