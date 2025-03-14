import React, { useState } from 'react';
import { Song } from '@/app/types';
import Link from 'next/link';
import ConfirmModal from './ConfirmModal';

interface SongCardProps {
  song: Song;
  onDelete: (id: number | string | undefined) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold">{song.title}</h3>
      <p className="text-gray-600"><strong>Artist:</strong> {song.artist}</p>
      <p className="text-gray-600"><strong>Album:</strong> {song.album}</p>
      <p className="text-gray-600"><strong>Duration:</strong> {song.duration}</p>
      <div className="mt-4 space-x-2">
        <Link href={`/song/${song.id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit
          </button>
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onDelete(song.id);
          setIsModalOpen(false);
        }}
        message="Are you sure you want to delete this song?"
      />
    </div>
  );
};

export default SongCard;
