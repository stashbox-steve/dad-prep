
import React from 'react';
import { Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PartnerChangesProps {
  currentWeek: number;
}

const PartnerChanges: React.FC<PartnerChangesProps> = ({ currentWeek }) => {
  const getPartnerChangesText = () => {
    if (currentWeek < 12) {
      return "Morning sickness and fatigue are common";
    } else if (currentWeek < 20) {
      return "Energy may return and baby bump becomes visible";
    } else if (currentWeek < 30) {
      return "Baby movements are noticeable and heartburn may occur";
    } else {
      return "Discomfort may increase as baby drops into birth position";
    }
  };

  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Scale className="h-5 w-5 text-dadblue" />
          <h3 className="font-medium">Partner's Changes</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {getPartnerChangesText()}
        </p>
      </CardContent>
    </Card>
  );
};

export default PartnerChanges;
