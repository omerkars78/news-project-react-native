// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewsListScreen from '../screens/NewsListScreen';
import AnnouncementListScreen from '../screens/AnnouncementListScreen';
import ActivityFormScreen from '../screens/ActivityFormScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NewsList" 
        component={NewsListScreen} 
        options={{ title: 'Haberler' }}
      />
      <Stack.Screen 
        name="AnnouncementList" 
        component={AnnouncementListScreen} 
        options={{ title: 'Duyurular' }}
      />
      <Stack.Screen 
        name="ActivityForm" 
        component={ActivityFormScreen} 
        options={{ title: 'Aktivite Yönetimi' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
