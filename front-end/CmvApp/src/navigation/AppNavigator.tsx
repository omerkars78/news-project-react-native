import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabNavigator from '../components/BottomTabNavigator'; 
import { View , Text} from 'react-native';
import { decode as atob } from 'base-64';
import AdminActivityUpdateScreen from '../screens/AdminActivityUpdateScreen'; 
import ActivityFormScreen from '../screens/ActivityFormScreen';




const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('JWT parse hatası', e);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decodedToken = parseJwt(token);
          console.log(decodedToken?.isAdmin)
          setIsAdmin(decodedToken?.isAdmin);
          setIsAuthenticated(true);
        } else {
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token alınırken hata oluştu', error);
        setIsAdmin(false);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    
  
    fetchUserDetails();
  }, []);
  
  

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="CMV" component={() => <BottomTabNavigator isAdmin={isAdmin}  />} />
            <Stack.Screen name="AdminActivityUpdate" component={AdminActivityUpdateScreen} />
            <Stack.Screen name="ActivityForm" component={ActivityFormScreen} />
          </>
        ) : (
          // isAuthenticated false ise Login ve Register ekranlarını göster
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
