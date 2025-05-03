
import React from 'react';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DevelopmentInfoProps {
  currentWeek: number;
}

const DevelopmentInfo: React.FC<DevelopmentInfoProps> = ({ currentWeek }) => {
  const getDevelopmentText = () => {
    switch (currentWeek) {
      // First Trimester
      case 1: return "The fertilized egg divides and implants in the uterine wall";
      case 2: return "The embryo begins to develop and forms the amniotic sac";
      case 3: return "The placenta begins to form and the neural tube develops";
      case 4: return "The heart begins to beat and facial features start forming";
      case 5: return "The embryo grows to about the size of a sesame seed";
      case 6: return "Eye and ear structures are forming and small buds appear that will become limbs";
      case 7: return "The embryo doubles in size and brain development accelerates";
      case 8: return "All essential organs have begun to form and fingers are developing";
      case 9: return "The embryo is now officially a fetus with formed limbs";
      case 10: return "Vital organs continue to develop and function";
      case 11: return "The head makes up about half of the fetus's size";
      case 12: return "External genitalia begin forming and the skeleton is softly formed";
      case 13: return "The fetus can make facial expressions and has unique fingerprints";
      
      // Second Trimester
      case 14: return "The fetus begins producing meconium in the intestinal tract";
      case 15: return "Bones are getting harder and the scalp hair pattern is forming";
      case 16: return "The eyes are becoming sensitive to light";
      case 17: return "The fetus can now hear sounds from outside the womb";
      case 18: return "The digestive system begins practicing for future food";
      case 19: return "A protective coating called vernix forms on the skin";
      case 20: return "The baby is developing taste buds and can taste flavors";
      case 21: return "Eyebrows and eyelids are fully formed";
      case 22: return "The sense of touch is developing rapidly";
      case 23: return "The lungs begin to develop surfactant, needed to breathe";
      case 24: return "The baby's inner ear has fully developed, affecting balance";
      case 25: return "Fat layers begin developing under the skin";
      case 26: return "Eyes begin to open and close, with eyelashes present";
      case 27: return "Brain tissue and neurons are rapidly developing";
      
      // Third Trimester
      case 28: return "The baby can see light from outside the womb";
      case 29: return "The baby's muscles and lungs are maturing";
      case 30: return "The baby's brain is developing rapidly with billions of neurons";
      case 31: return "The baby is practicing breathing movements";
      case 32: return "The five senses are working and the baby recognizes voices";
      case 33: return "The bones are fully formed but remain soft and flexible";
      case 34: return "The central nervous system and lungs are maturing";
      case 35: return "The kidneys are fully developed";
      case 36: return "The baby is gaining significant weight each week";
      case 37: return "The baby is considered 'early term' and ready for life outside";
      case 38: return "The brain connections continue to develop rapidly";
      case 39: return "The lungs continue to mature and produce surfactant";
      case 40: return "Full term baby with all systems ready for birth";
      
      default: return "Baby development continues as organs and systems mature";
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
