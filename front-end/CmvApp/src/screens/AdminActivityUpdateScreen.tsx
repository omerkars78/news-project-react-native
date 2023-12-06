import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateActivity, getActivityById } from '../services/api';

interface AdminActivityUpdateScreenProps {
  route: any;
  navigation: any;
}

interface ActivityData {
  title: string;
  content: string;
  topic: string;
  image: string;
  type: boolean;
  validityDate: string;
}

const AdminActivityUpdateScreen: React.FC<AdminActivityUpdateScreenProps> = ({ route, navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [type, setType] = useState<boolean>(true);
  const [validityDate, setValidityDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [activityId, setActivityId] = useState<string>('');

  useEffect(() => {
    const { activityId } = route.params;
    setActivityId(activityId);
    // Aktiviteyi API'den al ve formu doldur
    fetchActivity(activityId);
  }, [route.params.activityId]);

  const fetchActivity = async (id: number) => {
    try {
      const activity = await getActivityById(id);
      if (activity) {
        setTitle(activity.title);
        setContent(activity.content);
        setTopic(activity.topic);
        setImage(activity.image);
        setType(activity.type);
        setValidityDate(new Date(activity.validityDate));
      }
    } catch (error) {
      Alert.alert("Hata", "Aktivite yüklenirken bir hata oluştu");
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || validityDate;
    setShowDatePicker(Platform.OS === 'ios');
    setValidityDate(currentDate);
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    const activityData: ActivityData = {
      title,
      content,
      topic,
      image,
      type,
      validityDate: validityDate.toISOString().split('T')[0]
    };

    try {
      await updateActivity(activityId, activityData);
      Alert.alert("Başarılı", "Aktivite başarıyla güncellendi.");
      navigation.navigate('AdminActivities');
    } catch (error) {
      Alert.alert("Hata", "Aktivite güncellenirken bir hata oluştu");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Başlık"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Konu"
        value={topic}
        onChangeText={setTopic}
      />
      <TextInput
        style={styles.input}
        placeholder="İçerik"
        value={content}
        onChangeText={setContent}
      />
      <RNPickerSelect
        onValueChange={(value) => setType(value === 1)}
        items={[
          { label: 'Haber', value: 1 },
          { label: 'Duyuru', value: 0 },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Etkinlik Tipi Seçiniz...", value: null }}
      />
      <Button title="Resim Seç" onPress={selectImage} />
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
        </View>
      )}

      <Button title="Geçerlilik Tarihi Seç" onPress={toggleDatePicker} />
      {showDatePicker && (
        <DateTimePicker
          value={validityDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Güncelle" onPress={handleSubmit} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

export default AdminActivityUpdateScreen;
