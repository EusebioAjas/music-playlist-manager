import axios from 'axios';
import { Song } from '@/app/types';

const API_URL = process.env.apiURL as string

export const getSongs = async (): Promise<Song[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createSong = async (song: Song): Promise<Song> => {
  const response = await axios.post(API_URL, song);
  return response.data;
};

export const updateSong = async (id: number | string, song: Song): Promise<Song> => {
  const response = await axios.put(`${API_URL}/${id}`, song);
  return response.data;
};

export const deleteSong = async (id: number | string | undefined): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getSongById = async (id: number | string): Promise<Song> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
