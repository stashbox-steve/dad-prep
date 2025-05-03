
import React from 'react';
import NameCard from './NameCard';
import { BabyName } from '@/types/babyNames';

interface NamesListProps {
  names: BabyName[];
  favoriteNames: string[];
  searchTerm: string;
  onToggleFavorite: (name: string) => void;
}

const NamesList = ({ names, favoriteNames, searchTerm, onToggleFavorite }: NamesListProps) => {
  const filteredNames = names.filter(name => 
    name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.meaning?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    name.origin?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredNames.length > 0 ? (
        filteredNames.map((name, index) => (
          <NameCard 
            key={name.id || index} 
            name={name}
            isFavorite={favoriteNames.includes(name.name)} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))
      ) : (
        <div className="text-center py-12 bg-neutral-light/30 rounded-md col-span-2">
          <p className="text-neutral-dark">No names found.</p>
          <p className="text-sm text-neutral mt-2">Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
};

export default NamesList;
