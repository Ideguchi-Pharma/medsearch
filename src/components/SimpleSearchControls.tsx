'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

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
                <MagnifyingGlassIcon className="w-4 h-4" />
            </div>
            <input
            type="text"
            className="
            w-full py-2 pl-11 pr-4 
            border border-gray-600 
            rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder || 'Search...'}
            />
        </div>
    );
};

export default SimpleSearchControls;