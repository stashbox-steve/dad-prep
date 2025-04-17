
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

interface PregnancyNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const PregnancyNotes: React.FC<PregnancyNotesProps> = ({ notes, setNotes }) => {
  const { toast } = useToast();
  
  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your pregnancy notes have been saved.",
    });
  };

  return (
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
  );
};

export default PregnancyNotes;
