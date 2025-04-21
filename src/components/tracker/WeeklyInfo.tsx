
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TipSection from './tips/TipSection';
import { getWeekInfo } from './data/weeklyTipsData';

interface WeeklyInfoProps {
  currentWeek: number;
}

const WeeklyInfo: React.FC<WeeklyInfoProps> = ({ currentWeek }) => {
  const weekInfo = getWeekInfo(currentWeek);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-dadblue">Week {currentWeek}: Dad's Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <TipSection title="Dad Tip" content={weekInfo.dadTip} />
          <TipSection title="Partner Support" content={weekInfo.partnerSupport} />
          <TipSection title="Preparation" content={weekInfo.preparation} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyInfo;
