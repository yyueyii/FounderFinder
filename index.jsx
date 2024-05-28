import {  Text, View, StyleSheet} from 'react-native'
import { Slot, Stack } from 'expo-router';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar' 

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="text-3xl"> FounderFinder</Text>
      <StatusBar style="auto" />
      <Link href="/sign-up" style={{color: 'purple'}} > Sign up </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }

});


 