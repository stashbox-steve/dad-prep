
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

interface DueDatePickerProps {
  dueDate: Date | null;
  setDueDate: (date: Date | null) => void;
  isDatePickerOpen: boolean;
  setIsDatePickerOpen: (open: boolean) => void;
  setCurrentWeek: (week: number) => void;
}

const DueDatePicker: React.FC<DueDatePickerProps> = ({
  dueDate,
  setDueDate,
  isDatePickerOpen,
  setIsDatePickerOpen,
  setCurrentWeek
}) => {
  const { toast } = useToast();

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

  return (
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
  );
};

export default DueDatePicker;
