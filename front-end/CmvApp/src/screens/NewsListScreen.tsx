import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connectSocket, disconnectSocket, socket } from '../services/socketService';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  link: string;
  type: boolean; 
}

const NewsListScreen = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    connectSocket();

    socket.on('newActivity', (newData: NewsItem) => {
      // Yalnızca type değeri 1 olan verileri (haberleri) listele
      if (newData.type === true) {
        setNews((prevNews) => [...prevNews, newData]);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <View style={styles.container}>
      {news.map((item) => (
        <View key={item.id} style={styles.newsItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.content}</Text>
          {/* Link ve diğer detaylar burada gösterilebilir */}
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
  newsItem: {
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

export default NewsListScreen;
