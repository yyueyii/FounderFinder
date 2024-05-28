import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Slot } from 'expo-router';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="search" component={SearchScreen} />
        <Tab.Screen name="notifications" component={NotificationsScreen} />
        <Tab.Screen name="profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return <Slot />;
}

function SearchScreen() {
  return <Slot />;
}

function NotificationsScreen() {
  return <Slot />;
}

function ProfileScreen() {
  return <Slot />;
}
