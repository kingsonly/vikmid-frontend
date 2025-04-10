import React from "react";

const PageLoader: React.FC<{ title?: string; variation?: boolean }> = ({
  title,
  variation = false,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
};

export { PageLoader };
