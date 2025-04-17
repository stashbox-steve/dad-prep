
import React, { useState } from 'react';
import { 
  CalendarCheck, 
  ChevronRight, 
  ChevronLeft,
  Baby,
  Heart,
  Scale
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import WeeklyInfo from './WeeklyInfo';

// Baby size comparisons with images
const babySizeComparisons = {
  1: { item: "Poppy seed", image: "🌱" },
  2: { item: "Sesame seed", image: "🌱" },
  3: { item: "Blueberry", image: "🫐" },
  4: { item: "Kidney bean", image: "🫘" },
  5: { item: "Grape", image: "🍇" },
  6: { item: "Pea", image: "🌱" },
  7: { item: "Blueberry", image: "🫐" },
  8: { item: "Kidney bean", image: "🫘" },
  9: { item: "Grape", image: "🍇" },
  10: { item: "Kumquat", image: "🍊" },
  11: { item: "Fig", image: "🥭" },
  12: { item: "Lime", image: "🍋" },
  13: { item: "Lemon", image: "🍋" },
  14: { item: "Navel orange", image: "🍊" },
  15: { item: "Apple", image: "🍎" },
  16: { item: "Avocado", image: "🥑" },
  17: { item: "Pomegranate", image: "🫒" },
  18: { item: "Bell pepper", image: "🫑" },
  19: { item: "Mango", image: "🥭" },
  20: { item: "Banana", image: "🍌" },
  21: { item: "Carrot", image: "🥕" },
  22: { item: "Corn on the cob", image: "🌽" },
  23: { item: "Grapefruit", image: "🍊" },
  24: { item: "Ear of corn", image: "🌽" },
  25: { item: "Cauliflower", image: "🥦" },
  26: { item: "Kale", image: "🥬" },
  27: { item: "Cauliflower", image: "🥦" },
  28: { item: "Eggplant", image: "🍆" },
  29: { item: "Butternut squash", image: "🎃" },
  30: { item: "Cabbage", image: "🥬" },
  31: { item: "Coconut", image: "🥥" },
  32: { item: "Squash", image: "🎃" },
  33: { item: "Pineapple", image: "🍍" },
  34: { item: "Cantaloupe", image: "🍈" },
  35: { item: "Honeydew melon", image: "🍈" },
  36: { item: "Romaine lettuce", image: "🥬" },
  37: { item: "Swiss chard", image: "🥬" },
  38: { item: "Pumpkin", image: "🎃" },
  39: { item: "Watermelon", image: "🍉" },
  40: { item: "Small pumpkin", image: "🎃" }
};

const PregnancyTracker = () => {
  const [dueDate, setDueDate] = useState<Date | null>(
    // Default due date for demo purposes: 7 months from now
    new Date(new Date().setMonth(new Date().getMonth() + 7))
  );
  const [currentWeek, setCurrentWeek] = useState(12); // Default to week 12 for demo

  const totalWeeks = 40;
  const progress = Math.round((currentWeek / totalWeeks) * 100);
  
  const handlePrevWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 40) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not set';
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric',  
      year: 'numeric' 
    }).format(date);
  };

  const getFormattedDateRange = () => {
    if (!dueDate) return '';
    
    // Calculate expected dates for trimester milestones based on due date
    // 40 weeks is full term, so we work backwards from due date
    const fullTermDate = new Date(dueDate);
    
    // First trimester: weeks 1-12 (first day to week 12)
    // Second trimester: weeks 13-26
    // Third trimester: weeks 27-40 (birth)
    
    const thirdTrimesterStart = new Date(fullTermDate);
    thirdTrimesterStart.setDate(thirdTrimesterStart.getDate() - (13 * 7)); // 13 weeks before due date
    
    const secondTrimesterStart = new Date(fullTermDate);
    secondTrimesterStart.setDate(secondTrimesterStart.getDate() - (27 * 7)); // 27 weeks before due date
    
    return `Due date: ${formatDate(dueDate)}`;
  };

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
  const babySize = babySizeComparisons[currentWeek as keyof typeof babySizeComparisons] || 
    { item: "Unknown size", image: "👶" };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="section-heading">Pregnancy Tracker</h2>
        <p className="text-muted-foreground mb-4">{getFormattedDateRange()}</p>
      </div>
      
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
        
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-5 w-5 text-dadblue" />
              <h3 className="font-medium">Development</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentWeek < 12 
                ? "Organs are forming and facial features are developing" 
                : currentWeek < 20 
                ? "Baby can hear sounds and is growing fingernails"
                : currentWeek < 30
                ? "Brain and lung development continues rapidly"
                : "Baby is gaining weight and preparing for birth"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="h-5 w-5 text-dadblue" />
              <h3 className="font-medium">Partner's Changes</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentWeek < 12 
                ? "Morning sickness and fatigue are common" 
                : currentWeek < 20 
                ? "Energy may return and baby bump becomes visible"
                : currentWeek < 30
                ? "Baby movements are noticeable and heartburn may occur"
                : "Discomfort may increase as baby drops into birth position"}
            </p>
          </CardContent>
        </Card>
      </div>

      <WeeklyInfo currentWeek={currentWeek} />
    </div>
  );
};

export default PregnancyTracker;
