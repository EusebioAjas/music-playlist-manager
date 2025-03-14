"use client"
import React, { useState } from 'react';
import { Song } from '@/app/types';

interface SongFormProps {
  onSubmit: (song: Song) => void;
  initialData?: Song;
}

const SongForm: React.FC<SongFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Song>(
    initialData || { title: '', artist: '', album: '', duration: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: 0, title: '', artist: '', album: '', duration: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={formData.artist}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="album"
        placeholder="Album"
        value={formData.album}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration (e.g., 3:45)"
        value={formData.duration}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
};

export default SongForm;
