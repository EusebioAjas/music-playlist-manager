"use client"
import React, { useState, useEffect } from 'react';
import { getSongs, createSong, deleteSong } from '@/app/services/api';
import SongForm from '@/app/components/SongForm';
import { Song } from '@/app/types';
import SongCard from './components/SongCard';

const Home: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const data = await getSongs();
    setSongs(data);
  };

  const handleCreate = async (song: Song) => {
    await createSong(song);
    fetchSongs();
    setMessage('Song created successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: number | string) => {
    await deleteSong(id);
    fetchSongs();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Music Playlist Manager</h1>
      {message && <p className="bg-green-100 text-green-800 p-2 rounded mb-4">{message}</p>}
      <SongForm onSubmit={handleCreate} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
