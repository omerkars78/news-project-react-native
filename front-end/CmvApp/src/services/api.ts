// src/services/api.ts
import axios from 'axios';

// API'nin temel URL'si
const BASE_URL = 'http://localhost:3000/api/';

const api = axios.create({
  baseURL: BASE_URL,
});

// Kullanıcı kaydı için API isteği
const register = async (username: string, password: string) => {
  try {
    const response = await api.post('auth/register', { username, password });
    return response.data;
  } catch (error) {
    // Hata işleme
    console.error(error);
    throw error;
  }
};

// Kullanıcı girişi için API isteği
const login = async (username: string, password: string) => {
  try {
    const response = await api.post('auth/login', { username, password });
    return response.data;
  } catch (error) {
    // Hata işleme
    console.error(error);
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
