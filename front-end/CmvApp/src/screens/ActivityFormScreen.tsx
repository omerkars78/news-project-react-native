// src/screens/ActivityFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createActivity } from '../services/api';

interface ActivityFormScreenProps {
  navigation: any; // Daha spesifik bir tip için React Navigation türlerini kullanabilirsiniz
}

const ActivityFormScreen: React.FC<ActivityFormScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [link, setLink] = useState<string>(''); // Haberler için
  const [image, setImage] = useState<string>(''); // Duyurular için
  const [type, setType] = useState<number>(1); // 1: Haber, 0: Duyuru

  const handleSubmit = async () => {
    const activityData = {
      title,
      content,
      link: type === 1 ? link : null,
      image: type === 0 ? image : null,
    };

    try {
      await createActivity(activityData);
      Alert.alert("Başarılı", "Aktivite başarıyla kaydedildi.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Hata", "Aktivite kaydedilemedi");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Activity Form</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Haber" value={1} />
        <Picker.Item label="Duyuru" value={0} />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Başlık"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="İçerik"
        value={content}
        onChangeText={setContent}
      />
      {type === 1 && (
        <TextInput
          style={styles.input}
          placeholder="Haber Linki"
          value={link}
          onChangeText={setLink}
        />
      )}
      {type === 0 && (
        <TextInput
          style={styles.input}
          placeholder="Duyuru Resmi URL"
          value={image}
          onChangeText={setImage}
        />
      )}
      <Button title="Kaydet" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  input: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
});

export default ActivityFormScreen;
