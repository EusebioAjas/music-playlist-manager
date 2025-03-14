"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, use } from 'react';
import { Song } from '@/app/types'
import { getSongById, updateSong } from '@/app/services/api';
import ConfirmModal from '@/app/components/ConfirmModal';

const EditSongPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [formData, setFormData] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await getSongById(id);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };
    fetchSong();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData) return;

    try {
      await updateSong(id, formData);
      setIsUpdateModalOpen(false)
      router.push('/');
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!formData) return <p>Song not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Song</h1>
      <form className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="artist" value={formData.artist} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="album" value={formData.album} onChange={handleChange} className="w-full border p-2" />
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border p-2" />
        <div className="flex space-x-2">
          <button type="button" onClick={() => setIsUpdateModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdate}
        message="Are you sure you want to update this song?"
      />
    </div>
  );
};

export default EditSongPage;
