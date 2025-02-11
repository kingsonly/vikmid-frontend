import React from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function VideoPlayer({ src, title, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>
        <video
          src={src}
          controls
          className="w-full rounded-lg"
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

