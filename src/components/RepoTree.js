'use client';
import { useEffect, useState } from 'react';
import Folder from './Folder';
import object from './object.json';

export default function RepoTree() {
    const [fileData, setFileData] = useState(object);

    // useEffect(() => {
    //     fetch('/api/github-tree?owner=leon-plackal&repo=supersede&branch=master')
    //       .then(response => response.json())
    //       .then(data => {
    //           console.log(data);
    //           setFileData(data);
    //       })
    //       .catch(error => console.error('Error:', error));
    //   }, []);


  return (
    <div className="flex flex-col gap-2">
      <Folder item={fileData} name="username/repo" level={0} />
    </div>
  );
}
