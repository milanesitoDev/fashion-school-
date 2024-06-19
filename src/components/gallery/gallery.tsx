
import React from 'react';
import './gallery.css';

const Gallery: React.FC = () => {
  return (
    <div className="grid">
      <div className="col-span-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Column 1</h3>
        <p className="text-gray-500 dark:text-gray-400">This is the first column in the first row.</p>
      </div>
      <div className="col-span-2 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Column 2</h3>
        <p className="text-gray-500 dark:text-gray-400">This is the second column in the first row.</p>
      </div>
      <div className="col-span-2 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Column 3</h3>
        <p className="text-gray-500 dark:text-gray-400">This is the first column in the second row.</p>
      </div>
      <div className="col-span-1 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Column 4</h3>
        <p className="text-gray-500 dark:text-gray-400">This is the second column in the second row.</p>
      </div>
    </div>
  );
};

export default Gallery;
