import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAllActivities, deleteActivity } from '../services/api';

interface Activity {
    id: number;
    topic: string;
    title:string;
    
  }
  interface AdminActivityListScreenProps {
    navigation: any; 
  }
  const AdminActivityListScreen: React.FC<AdminActivityListScreenProps> = ({ navigation }) => {
    const [activities, setActivities] = useState<Activity[]>([]);
  
    useFocusEffect(
      React.useCallback(() => {
        const fetchActivities = async () => {
          try {
            const data = await getAllActivities();
            console.log("API Response:", data);
            setActivities(data);
          } catch (error) {
            console.error("API Request Error:", error);
            Alert.alert("Hata", "Aktiviteler yüklenirken bir hata oluştu");
          }
        };
  
        fetchActivities();
  
        return () => {
          
        };
      }, [])
    );
  
    const fetchActivities = async () => {
      try {
        const data = await getAllActivities();
        console.log("API Response:", data); 
        setActivities(data);
      } catch (error) {
        console.error("API Request Error:", error); 
        Alert.alert("Hata", "Aktiviteler yüklenirken bir hata oluştu");
      }
    };
    
    const handleDelete = async (id: number) => {
      try {
        await deleteActivity(id);
        fetchActivities(); 
      } catch (error) {
        Alert.alert("Hata", "Aktivite silinirken bir hata oluştu");
      }
    };
  
    const handleTopicPress = (activityId: number) => {
     
      navigation.navigate('AdminActivityUpdate', { activityId });
    };

    const renderItem = ({ item }: { item: Activity }) => (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleTopicPress(item.id)}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => handleTopicPress(item.id)}>
            <Ionicons name="pencil" size={25} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Ionicons name="trash" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  }
});

export default AdminActivityListScreen;
