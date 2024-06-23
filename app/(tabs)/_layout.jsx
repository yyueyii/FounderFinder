import { View, Text, Image } from 'react-native'
import React from 'react';
import { Tabs, Redirect } from 'expo-router'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const TabsLayout = () => {
  return (
    <>
        <Tabs >
            <Tabs.Screen 
                name="home"
                options={{
                    title:'',
                    headerShown:false,
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="home" size={size} color={color} />
                    ),
                    tabBarActiveTintColor: '#4A0AFF',
                    tabBarStyle:{paddingTop:10,}

                }}
                
            />
                
            <Tabs.Screen 
                name="chat"
                options={{
                    title:'',
                    headerShown:false,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="envelope" size={20} color={color}/>
                    ),
                    tabBarActiveTintColor: '#4A0AFF',
                    tabBarStyle:{paddingTop:10,}

                }}
            />
            <Tabs.Screen 
                name="matches"
                options={{
                    title:'',
                    headerShown:false,
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="handshake" size={28} color={color}/>
                    ),
                    tabBarActiveTintColor: '#4A0AFF',
                    tabBarStyle:{paddingTop:10,}


                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title:'',
                    headerShown:false,
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="user-circle-o" size={22} color={color}/>
                    ),
                                        tabBarActiveTintColor: '#4A0AFF',
                                        tabBarStyle:{paddingTop:10,}


                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout
