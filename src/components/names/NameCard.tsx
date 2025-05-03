
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BabyName } from '@/types/babyNames';

interface NameCardProps {
  name: BabyName;
  onRemove: (name: string) => void;
}

const NameCard = ({ name, onRemove }: NameCardProps) => {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6 pb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg">{name.name}</h3>
            <p className="text-sm text-neutral-dark">{name.meaning}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:bg-red-100"
            onClick={() => onRemove(name.name)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-xs text-neutral">
          Origin: {name.origin} | Gender: {name.gender}
        </div>
        {name.notes && (
          <div className="text-xs text-neutral-dark mt-2 italic">
            "{name.notes}"
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NameCard;
