
import React from 'react';
import { Baby } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface BabySizeProps {
  babySize: {
    item: string;
    image: string;
  };
}

const BabySize: React.FC<BabySizeProps> = ({ babySize }) => {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Baby className="h-5 w-5 text-dadblue" />
          <h3 className="font-medium">Baby Size</h3>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl mb-2">{babySize.image}</div>
          <p className="text-sm text-muted-foreground">
            Your baby is about the size of a {babySize.item}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BabySize;
