// src/screens/AnnouncementListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connectSocket, disconnectSocket, socket } from '../services/socketService';

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  image: string;
  type: number; // 1: Haber, 0: Duyuru
}

const AnnouncementListScreen: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  useEffect(() => {
    connectSocket();

    socket.on('newActivity', (newData: AnnouncementItem) => {
      // Yalnızca type değeri 0 olan verileri (duyuruları) listele
      if (newData.type === 0) {
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
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.content}</Text>
          {/* Resim ve diğer detaylar burada gösterilebilir */}
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
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default AnnouncementListScreen;
