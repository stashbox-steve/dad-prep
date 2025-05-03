
import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BabyName } from '@/types/babyNames';

interface NameCardProps {
  name: BabyName;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
}

const NameCard = ({ name, isFavorite, onToggleFavorite }: NameCardProps) => {
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
            className={isFavorite ? "text-red-500" : "text-neutral"}
            onClick={() => onToggleFavorite(name.name)}
          >
            <Heart 
              className="h-5 w-5" 
              fill={isFavorite ? "currentColor" : "none"} 
            />
          </Button>
        </div>
        <div className="text-xs text-neutral">
          Origin: {name.origin} | Gender: {name.gender}
          {name.wallet_address && (
            <span className="ml-2 text-dadblue">• Stored in Base Wallet</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameCard;
