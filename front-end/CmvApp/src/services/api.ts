// src/services/api.ts
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API'nin temel URL'si
const BASE_URL = 'http://192.168.1.17:3000/api/';

const api = axios.create({
  baseURL: BASE_URL,
});
interface ActivityData {
  title: string;
  content: string;
  topic: string;
  image: string;
  type: boolean;
  validityDate: string;
}
// Kullanıcı kaydı için API isteği
const register = async (name: string, surname: string, email: string, password: string, isAdmin: boolean) => {
  try {
    const response = await api.post('auth/register', {
      name,
      surname,
      email,
      password,
      isAdmin
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveToken = async (token: string | null) => {
  try {
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    } else {
      console.warn('Kaydedilecek token yok');
    }
  } catch (error) {
    console.error('Token kaydedilirken hata oluştu', error);
  }
};


const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Token alınırken hata oluştu', error);
  }
};


// Kullanıcı girişi için API isteği
const login = async (email: string, password: string) => {
  try {
    const response = await api.post('auth/login', { email, password });
    const token = response.data.token; 
    console.log('login token'+token);
    await saveToken(token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Sunucunun döndürdüğü hata yanıtını logla
      console.error('Error Response:', axiosError.response);
    } else if (axiosError.request) {
      // İstek yapıldı ancak yanıt alınamadı
      console.error('Error Request:', axiosError.request);
    } else {
      // İstek yapılırken bir hata oluştu
      console.error('Error Message:', axiosError.message);
    }
    throw error;
  }
};



// Yeni aktivite oluşturma için API isteği
const createActivity = async (activityData: ActivityData) => {
  try {
    const token = await getToken();
    console.log('create token'+token);
    const response = await api.post('activities/activity', activityData, {
      headers: {
        Authorization: `Bearer ${token}`
       
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getActivityById = async (id: number) => {
  try {
    const response = await api.get(`activities/activity/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Aktivite güncelleme için API isteği
const updateActivity = async (id: string, activityData: ActivityData) => {
  try {
    const token = await getToken();
    const response = await api.put(`activities/activity/${id}`, activityData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Aktivite silme için API isteği
const deleteActivity = async (id: number) => {
  try {
    const token = await getToken();
    const response = await api.delete(`activities/activity/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Tüm aktiviteleri getirme için API isteği
const getAllActivities = async () => {
  try {
    const response = await api.get('activities/activities');
    return response.data;
  } catch (error) {
    // Hata işleme
    console.error(error);
    throw error;
  }
};

export { register, login, createActivity, updateActivity, deleteActivity, getAllActivities, getActivityById };
