// src/services/api.ts
import axios, { AxiosError } from 'axios';


// API'nin temel URL'si
const BASE_URL = 'http://192.168.1.120:3000/api/';

const api = axios.create({
  baseURL: BASE_URL,
});

// Kullanıcı kaydı için API isteği
const register = async (email: string, password: string) => {
  try {
    const response = await api.post('auth/register', { email, password });
    return response.data;
  } catch (error) {
    // Hata işleme
    console.error(error);
    throw error;
  }
};

// Kullanıcı girişi için API isteği
const login = async (email: string, password: string) => {
  try {
    const response = await api.post('auth/login', { email, password });
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
const createActivity = async (activityData: any) => {
  try {
    const response = await api.post('activities/activity', activityData);
    return response.data;
  } catch (error) {
    // Hata işleme
    console.error(error);
    throw error;
  }
};

// Aktivite güncelleme için API isteği
const updateActivity = async (id: string, activityData: any) => {
  try {
    const response = await api.put(`activities/activity/${id}`, activityData);
    return response.data;
  } catch (error) {
    // Hata işleme
    console.error(error);
    throw error;
  }
};

// Aktivite silme için API isteği
const deleteActivity = async (id: string) => {
  try {
    const response = await api.delete(`activities/activity/${id}`);
    return response.data;
  } catch (error) {
    // Hata işleme
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

export { register, login, createActivity, updateActivity, deleteActivity, getAllActivities };
