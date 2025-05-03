
import React from 'react';
import BabySize from './BabySize';
import DevelopmentInfo from './DevelopmentInfo';
import PartnerChanges from './PartnerChanges';

interface InfoCardsProps {
  currentWeek: number;
  babySizeComparisons: Record<number, { item: string; image: string }>;
}

const InfoCards: React.FC<InfoCardsProps> = ({ currentWeek, babySizeComparisons }) => {
  const babySize = babySizeComparisons[currentWeek] || 
    { item: "Unknown size", image: "👶" };
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <BabySize babySize={babySize} />
      <DevelopmentInfo currentWeek={currentWeek} />
      <PartnerChanges currentWeek={currentWeek} />
    </div>
  );
};

export default InfoCards;
