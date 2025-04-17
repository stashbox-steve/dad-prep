
import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DevelopmentInfoProps {
  currentWeek: number;
}

const DevelopmentInfo: React.FC<DevelopmentInfoProps> = ({ currentWeek }) => {
  const getDevelopmentText = () => {
    if (currentWeek < 12) {
      return "Organs are forming and facial features are developing";
    } else if (currentWeek < 20) {
      return "Baby can hear sounds and is growing fingernails";
    } else if (currentWeek < 30) {
      return "Brain and lung development continues rapidly";
    } else {
      return "Baby is gaining weight and preparing for birth";
    }
  };

  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Heart className="h-5 w-5 text-dadblue" />
          <h3 className="font-medium">Development</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {getDevelopmentText()}
        </p>
      </CardContent>
    </Card>
  );
};

export default DevelopmentInfo;
