
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { BabyName } from '@/types/babyNames';
import { Button } from '@/components/ui/button';

// Import the new components
import NamesList from './NamesList';
import AddNameDialog from './AddNameDialog';
import TipCard from './TipCard';

const BabyNameExplorer = () => {
  const [favoriteNames, setFavoriteNames] = useState<BabyName[]>([]);
  const [filter, setFilter] = useState<'all' | 'boy' | 'girl' | 'neutral'>('all');
  const { toast } = useToast();

  useEffect(() => {
    // Load saved names from localStorage
    const savedNames = localStorage.getItem('babyNames');
    if (savedNames) {
      try {
        setFavoriteNames(JSON.parse(savedNames));
      } catch (error) {
        console.error('Error parsing saved names:', error);
        toast({
          title: "Error",
          description: "Could not load your saved names.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleAddName = (nameToAdd: BabyName) => {
    try {
      // Check if name already exists
      const nameExists = favoriteNames.some(name => 
        name.name.toLowerCase() === nameToAdd.name.toLowerCase()
      );
      
      if (nameExists) {
        toast({
          title: "Name Already Exists",
          description: `${nameToAdd.name} is already in your list.`,
          variant: "destructive"
        });
        return;
      }

      // Add new name
      const updatedNames = [...favoriteNames, nameToAdd];
      setFavoriteNames(updatedNames);
      localStorage.setItem('babyNames', JSON.stringify(updatedNames));
      
      toast({
        title: "Name Added",
        description: `${nameToAdd.name} has been added to your list.`
      });
    } catch (error) {
      console.error("Error adding name:", error);
      toast({
        title: "Error",
        description: "Could not add the name to your list.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveName = (nameToRemove: string) => {
    try {
      const updatedNames = favoriteNames.filter(name => name.name !== nameToRemove);
      setFavoriteNames(updatedNames);
      localStorage.setItem('babyNames', JSON.stringify(updatedNames));
      
      toast({
        title: "Name Removed",
        description: `${nameToRemove} has been removed from your list.`
      });
    } catch (error) {
      console.error("Error removing name:", error);
      toast({
        title: "Error",
        description: "Could not remove the name from your list.",
        variant: "destructive"
      });
    }
  };

  const filteredNames = filter === 'all' 
    ? favoriteNames 
    : favoriteNames.filter(name => name.gender === filter);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-heading">Baby Name List</h2>
        <AddNameDialog onAddName={handleAddName} />
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="mb-6 w-full grid grid-cols-4">
          <TabsTrigger value="all">All Names ({favoriteNames.length})</TabsTrigger>
          <TabsTrigger value="boy">Boys ({favoriteNames.filter(n => n.gender === 'boy').length})</TabsTrigger>
          <TabsTrigger value="girl">Girls ({favoriteNames.filter(n => n.gender === 'girl').length})</TabsTrigger>
          <TabsTrigger value="neutral">Neutral ({favoriteNames.filter(n => n.gender === 'neutral').length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <NamesList names={filteredNames} onRemoveName={handleRemoveName} />
        </TabsContent>
        
        <TabsContent value="boy">
          <NamesList names={filteredNames} onRemoveName={handleRemoveName} />
        </TabsContent>
        
        <TabsContent value="girl">
          <NamesList names={filteredNames} onRemoveName={handleRemoveName} />
        </TabsContent>
        
        <TabsContent value="neutral">
          <NamesList names={filteredNames} onRemoveName={handleRemoveName} />
        </TabsContent>
      </Tabs>
      
      <TipCard />
    </div>
  );
};

export default BabyNameExplorer;
