
import React, { useState, useEffect } from 'react';
import WeekTracker from './WeekTracker';
import InfoCards from './InfoCards';
import DueDatePicker from './DueDatePicker';
import PregnancyNotes from './PregnancyNotes';
import WeeklyInfo from './WeeklyInfo';
import { useUser } from '@/contexts/UserContext';
import { babySizeComparisons } from './babySizeData';

const PregnancyTracker = () => {
  const { user } = useUser();
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

  return (
    <div className="animate-fade-in">
      <DueDatePicker
        dueDate={dueDate}
        setDueDate={setDueDate}
        isDatePickerOpen={isDatePickerOpen}
        setIsDatePickerOpen={setIsDatePickerOpen}
        setCurrentWeek={setCurrentWeek}
      />
      
      <WeekTracker 
        currentWeek={currentWeek}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
      />

      <InfoCards 
        currentWeek={currentWeek}
        babySizeComparisons={babySizeComparisons}
      />

      {user && (
        <PregnancyNotes 
          notes={notes}
          setNotes={setNotes}
        />
      )}

      <WeeklyInfo currentWeek={currentWeek} />
    </div>
  );
};

export default PregnancyTracker;
