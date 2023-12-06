import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
import { createActivity } from '../services/api';

interface ActivityFormScreenProps {
  navigation: any; // Daha spesifik bir tip için React Navigation türlerini kullanabilirsiniz
}

const ActivityFormScreen: React.FC<ActivityFormScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [type, setType] = useState<number>(1);
  const [validityDate, setValidityDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);


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
      <Text style={styles.title}>Activity Form</Text>
      <RNPickerSelect
        onValueChange={(value) => setType(value)}
        items={[
          { label: 'Haber', value: 1 },
          { label: 'Duyuru', value: 0 },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Seçiniz...", value: null }}
      />
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
        <>
          <Button title="Resim Seç" onPress={selectImage} />
          {image ? <Text>Seçilen Resim: {image}</Text> : null}
        </>
      )}
 <Button title="Geçerlilik Tarihi Seç" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={validityDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
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
  datePicker: {
    width: '100%',
    marginTop: 10,
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
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default ActivityFormScreen;
