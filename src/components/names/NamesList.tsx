
import React from 'react';
import NameCard from './NameCard';
import { BabyName } from '@/types/babyNames';

interface NamesListProps {
  names: BabyName[];
  onRemoveName: (name: string) => void;
}

const NamesList = ({ names, onRemoveName }: NamesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {names.length > 0 ? (
        names.map((name, index) => (
          <NameCard 
            key={index} 
            name={name}
            onRemove={onRemoveName} 
          />
        ))
      ) : (
        <div className="text-center py-12 bg-neutral-light/30 rounded-md col-span-2">
          <p className="text-neutral-dark">No names in your list yet.</p>
          <p className="text-sm text-neutral mt-2">Click "Add Name" to start creating your list.</p>
        </div>
      )}
    </div>
  );
};

export default NamesList;
