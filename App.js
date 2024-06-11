import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from './app/index';
import LoginPage from './app/(auth)/log-in';
import Profile from './app/(tabs)/profile';
import EditProfile from './app/(auth)/edit-profile';

const LogInStack = createNativeStackNavigator();
const EditProfileStack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <LogInStack.Navigator>
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Login" component={LoginPage} />
            </LogInStack.Navigator>


            <EditProfileStack.Navigator initialRouteName="Profile">
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </EditProfileStack.Navigator>
        </NavigationContainer>
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