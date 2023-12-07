import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getAllActivities } from '../services/api';
import { connectSocket, disconnectSocket, socket } from '../services/socketService';

interface AnnouncementItem {
  id: number;
  title: string;
  content: string;
  image: string;
  type: boolean; 
}

const AnnouncementListScreen: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getAllActivities();
        // Type'a göre haberleri filtrele
        const announcementData = activities.filter((activity:AnnouncementItem) => activity.type ===  false);
        setAnnouncements(announcementData);
      } catch (error) {
        console.error('Haberler yüklenirken hata oluştu:', error);
      }
    };
  
    fetchActivities();
    connectSocket();

    socket.on('newActivity', (newData: AnnouncementItem) => {
      if (newData.type === false) {
        setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newData]);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <View style={styles.container}>
      {announcements.map((item) => (
        <View key={item.id} style={styles.announcementItem}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            {/* Resim ve diğer detaylar burada gösterilebilir */}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  announcementItem: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default AnnouncementListScreen;
