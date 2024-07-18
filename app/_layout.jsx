import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="successful-match" options={{headerShown:false}}/>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="log-in" options={{headerShown:false}}/>
      <Stack.Screen name="sign-up" options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="edit-profile" options={{headerShown: false}}/>
      <Stack.Screen name="view-profile" options={{headerShown: false}}/>
      <Stack.Screen name="chat-room" options={{headerShown: false}}/>
    </Stack>

    


  );
};

export default RootLayout