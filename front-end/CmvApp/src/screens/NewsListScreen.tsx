import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { getAllActivities } from '../services/api';

interface NewsItem {
  id: number;
  title: string;
  image: string;
  type: boolean; // Haberler için true
}

const NewsListScreen = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const activities = await getAllActivities();
        // Type'a göre haberleri filtrele
        const newsData = activities.filter((activity: NewsItem) => activity.type === true);
        setNews(newsData);
      } catch (error) {
        console.error('Haberler yüklenirken hata oluştu:', error);
      }
    };

    fetchNews();
  }, []);

  const renderItem = ({ item }: { item: NewsItem }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
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
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
  },
});

export default NewsListScreen;
