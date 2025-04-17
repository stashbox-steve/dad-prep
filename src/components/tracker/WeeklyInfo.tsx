import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeeklyInfoProps {
  currentWeek: number;
}

const weeklyTips: Record<number, {
  dadTip: string;
  partnerSupport: string;
  preparation: string;
}> = {
  // First trimester
  1: {
    dadTip: "Take the pregnancy test together and celebrate this moment.",
    partnerSupport: "Be understanding of mood changes and offer reassurance.",
    preparation: "Start researching healthcare providers and prenatal care options."
  },
  // More weeks data...
  8: {
    dadTip: "Attend the first ultrasound if possible - it's an amazing experience!",
    partnerSupport: "Morning sickness may be intense now; keep bland snacks available.",
    preparation: "Start thinking about how to announce the pregnancy to family and friends."
  },
  12: {
    dadTip: "Many couples announce their pregnancy at this milestone.",
    partnerSupport: "The first trimester is ending, but fatigue may still be an issue.",
    preparation: "Consider signing up for childbirth classes together."
  },
  // Second trimester
  16: {
    dadTip: "You might be able to feel the baby move soon!",
    partnerSupport: "Help track nutrition and ensure your partner gets enough protein.",
    preparation: "Start thinking about the nursery design and baby gear research."
  },
  20: {
    dadTip: "This is often when you can learn the baby's sex if you choose to.",
    partnerSupport: "Go shopping together for maternity clothes if needed.",
    preparation: "Research car seats and strollers - there are many options to consider."
  },
  24: {
    dadTip: "Talk and sing to your baby - they can hear you now!",
    partnerSupport: "Suggest prenatal massage for back pain relief.",
    preparation: "Start putting together a baby registry if you plan to have one."
  },
  // Third trimester
  28: {
    dadTip: "Keep track of baby's kick counts with your partner.",
    partnerSupport: "Help with stretching exercises to relieve discomfort.",
    preparation: "Take a hospital tour and pre-register for delivery."
  },
  32: {
    dadTip: "Practice the route to the hospital and time how long it takes.",
    partnerSupport: "Help set up the nursery and assemble furniture.",
    preparation: "Pack the hospital bag together so you're prepared."
  },
  36: {
    dadTip: "Baby could arrive anytime now - keep your phone charged!",
    partnerSupport: "Help with relaxation techniques for early labor.",
    preparation: "Install the car seat and have it checked by a certified technician."
  },
  40: {
    dadTip: "Be ready to go to the hospital at any moment.",
    partnerSupport: "Patience is key - baby will come when ready.",
    preparation: "Make sure you know who to call and what to do when labor starts."
  }
};

const getWeekInfo = (week: number) => {
  // Return the exact week if available
  if (weeklyTips[week]) {
    return weeklyTips[week];
  }
  
  // Otherwise find the closest week that's less than or equal to current
  const availableWeeks = Object.keys(weeklyTips)
    .map(Number)
    .filter(w => w <= week)
    .sort((a, b) => b - a);
  
  if (availableWeeks.length > 0) {
    return weeklyTips[availableWeeks[0]];
  }
  
  // Fallback
  return weeklyTips[12]; // Default to week 12 if nothing closer is found
};

const WeeklyInfo: React.FC<WeeklyInfoProps> = ({ currentWeek }) => {
  const weekInfo = getWeekInfo(currentWeek);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-dadblue">Week {currentWeek}: Dad's Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Dad Tip</h4>
            <p className="text-sm text-neutral-dark">{weekInfo.dadTip}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Partner Support</h4>
            <p className="text-sm text-neutral-dark">{weekInfo.partnerSupport}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Preparation</h4>
            <p className="text-sm text-neutral-dark">{weekInfo.preparation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyInfo;
