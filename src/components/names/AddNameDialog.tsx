
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { PersonalBabyName } from '@/types/babyNames';
import { useUser } from '@/contexts/UserContext';

interface AddNameDialogProps {
  onAddName: (nameData: PersonalBabyName) => void;
  walletAddress?: string;
}

const AddNameDialog = ({ onAddName, walletAddress }: AddNameDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState<Partial<PersonalBabyName>>({});
  const { user } = useUser();

  const handleSubmit = () => {
    if (!user && !walletAddress) return;
    
    const nameToAdd: PersonalBabyName = {
      ...newName as PersonalBabyName,
      user_id: user?.email || 'anonymous',
      wallet_address: walletAddress,
    };
    
    onAddName(nameToAdd);
    setNewName({});
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
          <DialogTitle>Add a Personal Baby Name</DialogTitle>
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
            <Input 
              id="notes" 
              value={newName.notes || ''} 
              onChange={(e) => setNewName({...newName, notes: e.target.value})} 
              className="col-span-3" 
            />
          </div>
          {walletAddress && (
            <div className="text-xs text-muted-foreground">
              This name will be linked to your Base Wallet.
            </div>
          )}
          <Button onClick={handleSubmit} className="w-full">Save Name</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNameDialog;
