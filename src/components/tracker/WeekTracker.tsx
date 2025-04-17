
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface WeekTrackerProps {
  currentWeek: number;
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
}

const WeekTracker: React.FC<WeekTrackerProps> = ({
  currentWeek,
  handlePrevWeek,
  handleNextWeek
}) => {
  const totalWeeks = 40;
  const progress = Math.round((currentWeek / totalWeeks) * 100);

  const getStatusInfo = () => {
    if (currentWeek <= 12) {
      return { 
        trimester: 'First Trimester', 
        description: 'The foundation stage where all major organs begin to form.'
      };
    } else if (currentWeek <= 26) {
      return { 
        trimester: 'Second Trimester', 
        description: 'The most comfortable period with noticeable baby movements.'
      };
    } else {
      return { 
        trimester: 'Third Trimester', 
        description: 'The home stretch! Baby is preparing for birth.'
      };
    }
  };

  const statusInfo = getStatusInfo();
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-dadblue">Week {currentWeek}</CardTitle>
            <CardDescription>{statusInfo.trimester}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrevWeek}
              disabled={currentWeek <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextWeek}
              disabled={currentWeek >= 40}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Week 1</span>
            <span>Week 40</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mt-2">{statusInfo.description}</p>
      </CardContent>
    </Card>
  );
};

export default WeekTracker;
