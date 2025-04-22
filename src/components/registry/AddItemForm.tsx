
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface AddItemFormProps {
  newItem: {
    name: string;
    price: string;
    priority: string;
    category: string;
  };
  setNewItem: (item: { name: string; price: string; priority: string; category: string; }) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddItemForm = ({ newItem, setNewItem, onSubmit, onCancel }: AddItemFormProps) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newItem.name || !newItem.price) {
      toast({
        title: "Missing information",
        description: "Please provide both name and price for the item.",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(newItem.price);
    if (isNaN(price)) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price.",
        variant: "destructive",
      });
      return;
    }

    onSubmit();
  };

  return (
    <div className="bg-card p-4 rounded-md border mb-6 animate-in fade-in duration-300">
      <h3 className="font-medium mb-4">Add New Item</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input 
              id="item-name"
              value={newItem.name}
              onChange={e => setNewItem({...newItem, name: e.target.value})}
              placeholder="e.g. Baby Monitor"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-price">Price ($)</Label>
            <Input 
              id="item-price"
              value={newItem.price}
              onChange={e => setNewItem({...newItem, price: e.target.value})}
              placeholder="e.g. 49.99"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="item-priority">Priority</Label>
            <Select
              value={newItem.priority}
              onValueChange={value => setNewItem({...newItem, priority: value})}
            >
              <SelectTrigger id="item-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Essential">Essential</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item-category">Category</Label>
            <Select
              value={newItem.category}
              onValueChange={value => setNewItem({...newItem, category: value})}
            >
              <SelectTrigger id="item-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nursery">Nursery</SelectItem>
                <SelectItem value="Feeding">Feeding</SelectItem>
                <SelectItem value="Diapering">Diapering</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="Toys">Toys</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>
            Add to Registry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
