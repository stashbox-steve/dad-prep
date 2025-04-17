import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  ChevronRight, 
  ChevronLeft,
  Baby,
  Heart,
  Scale,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import WeeklyInfo from './WeeklyInfo';
import { useUser } from '@/contexts/UserContext';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

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
  const { user } = useUser();
  const { toast } = useToast();
  const [dueDate, setDueDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() + 7))
  );
  const [currentWeek, setCurrentWeek] = useState(12);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`pregnancy-data-${user.email}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.dueDate) setDueDate(new Date(parsedData.dueDate));
          if (parsedData.currentWeek) setCurrentWeek(parsedData.currentWeek);
          if (parsedData.notes) setNotes(parsedData.notes);
        } catch (error) {
          console.error('Error parsing saved data', error);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const dataToSave = {
        dueDate: dueDate?.toISOString(),
        currentWeek,
        notes
      };
      localStorage.setItem(`pregnancy-data-${user.email}`, JSON.stringify(dataToSave));
    }
  }, [dueDate, currentWeek, notes, user]);

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

  const handleDueDateChange = (date: Date | undefined) => {
    if (date) {
      setDueDate(date);
      setIsDatePickerOpen(false);
      
      const today = new Date();
      const daysUntilDue = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const weeksRemaining = Math.floor(daysUntilDue / 7);
      const estimatedCurrentWeek = 40 - weeksRemaining;
      
      setCurrentWeek(Math.max(1, Math.min(40, estimatedCurrentWeek)));
      
      toast({
        title: "Due date updated",
        description: `Your due date has been set to ${format(date, 'PPP')}.`,
      });
    }
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your pregnancy notes have been saved.",
    });
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
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{getFormattedDateRange()}</p>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Change Due Date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={dueDate || undefined}
                onSelect={handleDueDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
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

      {user && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-dadblue">My Pregnancy Notes</CardTitle>
            <CardDescription>Keep track of important information, questions for your healthcare provider, or anything else.</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] resize-y w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Write your notes here..."
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </CardFooter>
        </Card>
      )}

      <WeeklyInfo currentWeek={currentWeek} />
    </div>
  );
};

export default PregnancyTracker;
