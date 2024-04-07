'use client';
import React, { useState } from 'react';

export default function Folder({ item, name, level }) {
    const [hovered, setHovered] = useState(false);
    const isEvenLevel = level % 2 === 0;

    // if object has children, it's a folder
    const isFolder = typeof item === 'object' && item !== null && Object.keys(item).length > 0;
    if (!isFolder) {
        return;
    }


    // add all non-folder items of this folder only to a list
    const files = Object.entries(item).filter(([key, value]) => typeof value !== 'object' || value === null || Object.keys(value).length === 0);

    return (
        <div className='flex'>
            <div className={`${isEvenLevel ? 'flex flex-col' : 'flex'} gap-8`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <div className='relative border-2 border-zinc-300 rounded bg-white w-48 p-2 h-fit cursor-pointer'>
                    {name}
                    {hovered && (
                        <div className="flex flex-col gap-1 border-2 rounded-md bg-white p-2 text-xs absolute -right-32 top-0 z-10">
                            {files.map(([key, value]) => (
                                <div key={key} className="file">
                                    {key}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {Object.entries(item).map(([key, value]) => (
                    <Folder key={key} name={key} item={value} level={level + 1} />
                ))}
            </div>
        </div>
    );
}