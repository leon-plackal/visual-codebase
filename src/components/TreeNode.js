import React, { useState, useEffect } from 'react';

const TreeNode = ({ nodeName, nodeData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isFolder = typeof nodeData === 'object' && Object.keys(nodeData).length > 0;
  
    const toggleExpansion = () => {
      if (isFolder) {
        setIsExpanded(!isExpanded);
      }
    };

    //sort the node data to display folders first, then files
    const sortedNodeData = Object.entries(nodeData).sort((a, b) => {
        if (typeof a[1] === 'object' && typeof b[1] !== 'object') {
          return -1;
        } else if (typeof a[1] !== 'object' && typeof b[1] === 'object') {
          return 1;
        } else {
          return a[0].localeCompare(b[0]);
        }
      });

      //return file structure, making folders blue when clicked
    return (
        <div className='ml-2'>
            <div
            className={`flex items-center space-x-2 cursor-pointer ${isFolder ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={toggleExpansion}
            >
            <span>{isFolder ? (isExpanded ? '📂' : '📁') : '📄'}</span>
            <span>{nodeName}</span>
            </div>
            {isExpanded && (
            <div className='ml-2'>
                {sortedNodeData.map(([key, value]) => (
                <TreeNode key={key} nodeName={key} nodeData={value} />
                ))}
            </div>
            )}
        </div>

    );
  };

export default TreeNode;