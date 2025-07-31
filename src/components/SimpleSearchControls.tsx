'use client';

import React from 'react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

interface SimpleSearchControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    placeholder?: string;
}

const SimpleSearchControls: React.FC<SimpleSearchControlsProps> =({
    searchTerm,
    setSearchTerm,
    placeholder
}) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <MagnifyingGlassCircleIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
            type="text"
            className="
            w-full py-2 pl-11 pr-4 
            border border-gray-300 
            rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder || 'Search...'}
            />
        </div>
    );
};

export default SimpleSearchControls;