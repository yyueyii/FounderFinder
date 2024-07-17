import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from './app/index';
import LoginPage from './app/(auth)/log-in';
import Profile from './app/(tabs)/profile';
import EditProfile from './app/(auth)/edit-profile';
import Matches from './app/(tabs)/matches';
import ViewProfile from './app/view-profile';
import { SocketContextProvider } from './api/context/SocketContext';
import ChatRoom from './app/chat-room';

const LogInStack = createNativeStackNavigator();
const EditProfileStack = createNativeStackNavigator();
const ViewProfileStack = createNativeStackNavigator();

const App = () => {
    return (
        <SocketContextProvider>
<NavigationContainer>
            <LogInStack.Navigator initialRouteName='Index'>
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
            </LogInStack.Navigator>

            


            <EditProfileStack.Navigator initialRouteName="Profile">
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </EditProfileStack.Navigator>

            <ViewProfileStack.Navigator>
                <Stack.Screen name = "Matches" component={Matches}/>
                <Stack.Screen name="ViewProfile" component={ViewProfile}/>
            </ViewProfileStack.Navigator>

        </NavigationContainer>
        </SocketContextProvider>
        
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default App;