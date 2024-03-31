'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import FileTree from './FileTree';

export default function Tree() {
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        fetch('/api/github-tree?owner=leon-plackal&repo=supersede&branch=master')
          .then(response => response.json())
          .then(data => {
            setFileData(data);
            console.log(data);
          })
          .catch(error => console.error('Error:', error));
      }, []);
      
  return (
    <div className='space-y-2'>
        <div className='rounded-lg shadow-lg bg-white border h-12 w-fit p-2 flex items-center justify-center font-semibold'>
            Root
        </div>
        <FileTree data={fileData} />
    </div>
  );
}

