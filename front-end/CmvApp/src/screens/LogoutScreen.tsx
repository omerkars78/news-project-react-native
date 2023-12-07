import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type LogoutScreenNavigationProp = StackNavigationProp<any>;

interface LogoutScreenProps {
  navigation: LogoutScreenNavigationProp;
}

const LogoutScreen: React.FC<LogoutScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const performLogout = async () => {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    };

    performLogout();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LogoutScreen;
