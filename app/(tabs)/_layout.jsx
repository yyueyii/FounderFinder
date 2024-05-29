import { View, Text, Image } from 'react-native'
import React from 'react';
import { Tabs, Redirect } from 'expo-router'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const TabsLayout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen 
                name="home"
                options={{
                    title:'Home',
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="home" size={size} color={color}/>
                    )
                }}
            />
                
            <Tabs.Screen 
                name="chat"
                options={{
                    title:'Chat',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="envelope" size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="matches"
                options={{
                    title:'Matches',
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="handshake" size={size} color={color}/>
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title:'Profile',
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="user-circle-o" size={size} color={color}/>
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout