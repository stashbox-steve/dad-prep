
import React from 'react';
import { Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PartnerChangesProps {
  currentWeek: number;
}

const PartnerChanges: React.FC<PartnerChangesProps> = ({ currentWeek }) => {
  const getPartnerChangesText = () => {
    switch (currentWeek) {
      // First Trimester
      case 1: return "Your partner may not notice any changes yet";
      case 2: return "Early symptoms may include fatigue and tender breasts";
      case 3: return "Morning sickness may begin, often at any time of day";
      case 4: return "Increased need to urinate as the uterus grows";
      case 5: return "Food cravings or aversions may emerge";
      case 6: return "Mood swings due to hormonal changes";
      case 7: return "Extreme fatigue and heightened sense of smell";
      case 8: return "Morning sickness might peak around this time";
      case 9: return "Slight weight gain may begin to show";
      case 10: return "Nausea may begin to subside for some";
      case 11: return "Hormonal changes might cause skin changes";
      case 12: return "Energy levels may start improving soon";
      case 13: return "A small baby bump may become visible";
      
      // Second Trimester
      case 14: return "The 'pregnancy glow' might appear as blood flow increases";
      case 15: return "Energy levels typically rise in the second trimester";
      case 16: return "Baby movements may be felt (especially for experienced moms)";
      case 17: return "The baby bump is becoming more noticeable";
      case 18: return "Skin may stretch, causing itchiness";
      case 19: return "Back pain may begin as posture changes";
      case 20: return "May experience leg cramps and stronger baby movements";
      case 21: return "Stretch marks may begin to appear on the belly";
      case 22: return "Increased appetite as baby grows rapidly";
      case 23: return "Belly button may begin to protrude";
      case 24: return "Nasal congestion and nosebleeds are common";
      case 25: return "Swelling in feet and ankles may begin";
      case 26: return "Braxton Hicks contractions may be noticeable";
      case 27: return "Trouble sleeping as finding comfortable positions becomes harder";
      
      // Third Trimester
      case 28: return "Shortness of breath as baby grows and presses on lungs";
      case 29: return "Lower back pain as baby weight increases";
      case 30: return "Increased heartburn and indigestion";
      case 31: return "Difficulty sleeping through the night";
      case 32: return "More frequent bathroom visits as baby presses on bladder";
      case 33: return "Colostrum (early milk) may leak from breasts";
      case 34: return "Increased swelling in hands, feet, and ankles";
      case 35: return "Feeling more pressure on the pelvis as baby drops";
      case 36: return "May notice Braxton Hicks contractions more frequently";
      case 37: return "Walking becomes more difficult with the baby's position";
      case 38: return "Increased fatigue and exhaustion";
      case 39: return "Lightening or dropping may occur as baby settles into position";
      case 40: return "Cervical changes begin in preparation for birth";
      
      default: return "Changes vary by person as the pregnancy progresses";
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
