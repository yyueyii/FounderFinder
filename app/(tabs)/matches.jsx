import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import MatchedProfileDisplay from '../../components/MatchesPage/matched-profile'
import { SafeAreaView } from 'react-native-safe-area-context';
import useUserStore from '../store/userStore';
import { Link, useNavigation, useFocusEffect } from 'expo-router';
import useNotificationStore from '../store/notificationStore';

const width = Dimensions.get('window').width;



const Matches = () => {
  const userId = useUserStore(state => state.userId);
  const notif = useNotificationStore(state => state.notifications)
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch(`https://founderfinder-1-cfmd.onrender.com/successfulMatches/${userId}`);
      const json = await response.json();
        setMatches(json); 
        console.log("matched profile datan fetched:", matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMatches();
  }, [userId]);
  console.log(matches);

  useFocusEffect(
    useCallback(() => {
      console.log("Focused, fetching matches again...");
      fetchMatches();
    }, [fetchMatches])
  );

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