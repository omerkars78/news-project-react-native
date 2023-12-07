import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewsListScreen from '../screens/NewsListScreen';
import AnnouncementListScreen from '../screens/AnnouncementListScreen';
import AdminActivityListScreen from '../screens/AdminActivityListScreen';
import AdminActivityUpdateScreen from '../screens/AdminActivityUpdateScreen';
import ActivityFormScreen from '../screens/ActivityFormScreen';
import LogoutScreen from '../screens/LogoutScreen';
import LoginScreen from '../screens/LoginScreen';


const Tab = createBottomTabNavigator();

interface BottomTabNavigatorProps {
  isAdmin: boolean;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ isAdmin }) => {
    return (
        
      <Tab.Navigator
        screenOptions={{
          headerShown: false, 
        }}
      >
        {isAdmin ? (
          <>
            <Tab.Screen name="Aktiviteler" component={AdminActivityListScreen} />
            <Tab.Screen name="Ekle" component={ActivityFormScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Haberler" component={NewsListScreen} />
            <Tab.Screen name="Duyurular" component={AnnouncementListScreen} />
          </>
        )}
              <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
    );
  };
  

export default BottomTabNavigator;
