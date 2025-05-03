
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { BabyName } from '@/types/babyNames';

interface AddNameDialogProps {
  onAddName: (nameData: BabyName) => void;
}

const AddNameDialog = ({ onAddName }: AddNameDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState<Partial<BabyName>>({
    name: '',
    meaning: '',
    origin: '',
    gender: 'neutral',
    notes: ''
  });

  const handleSubmit = () => {
    if (!newName.name) {
      return;
    }
    
    const nameToAdd: BabyName = {
      ...newName as BabyName,
      name: newName.name || '',
      meaning: newName.meaning || '',
      origin: newName.origin || '',
      gender: newName.gender || 'neutral',
    };
    
    onAddName(nameToAdd);
    setNewName({
      name: '',
      meaning: '',
      origin: '',
      gender: 'neutral',
      notes: ''
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Name
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Baby Name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input 
              id="name" 
              value={newName.name || ''} 
              onChange={(e) => setNewName({...newName, name: e.target.value})} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="meaning" className="text-right">Meaning</Label>
            <Input 
              id="meaning" 
              value={newName.meaning || ''} 
              onChange={(e) => setNewName({...newName, meaning: e.target.value})} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">Origin</Label>
            <Input 
              id="origin" 
              value={newName.origin || ''} 
              onChange={(e) => setNewName({...newName, origin: e.target.value})} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gender" className="text-right">Gender</Label>
            <Select 
              value={newName.gender} 
              onValueChange={(value) => setNewName({...newName, gender: value as 'boy' | 'girl' | 'neutral'})}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boy">Boy</SelectItem>
                <SelectItem value="girl">Girl</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">Notes</Label>
            <Textarea
              id="notes" 
              value={newName.notes || ''} 
              onChange={(e) => setNewName({...newName, notes: e.target.value})} 
              className="col-span-3" 
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">Save Name</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNameDialog;
