
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';
import { AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AddItemForm from './AddItemForm';
import PaymentSection from './PaymentSection';
import RegistryItems from './RegistryItems';

const defaultItems = [
  { 
    id: '1', 
    name: 'Baby Car Seat', 
    price: 179.99, 
    priority: 'Essential',
    status: 'Needed',
    category: 'Travel'
  },
  { 
    id: '2', 
    name: 'Convertible Crib', 
    price: 299.00, 
    priority: 'Essential',
    status: 'Needed',
    category: 'Nursery'
  },
  { 
    id: '3', 
    name: 'Baby Monitor', 
    price: 149.95, 
    priority: 'High',
    status: 'Needed',
    category: 'Safety'
  },
];

const RegistryManager = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [items, setItems] = useState(defaultItems);
  const [newItem, setNewItem] = useState({ name: '', price: '', priority: 'Medium', category: 'Other' });
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [paymentLinks, setPaymentLinks] = useState({});

  useEffect(() => {
    if (user) {
      const savedItems = localStorage.getItem(`registry-items-${user.email}`);
      const savedLinks = localStorage.getItem(`payment-links-${user.email}`);
      
      if (savedItems) {
        try {
          setItems(JSON.parse(savedItems));
        } catch (error) {
          console.error('Error parsing saved items', error);
        }
      }
      
      if (savedLinks) {
        try {
          const links = JSON.parse(savedLinks);
          setPaymentLinks(links);
        } catch (error) {
          console.error('Error parsing payment links', error);
        }
      }
    }
  }, [user]);
  
  useEffect(() => {
    if (user) {
      localStorage.setItem(`registry-items-${user.email}`, JSON.stringify(items));
    }
  }, [items, user]);

  const handleAddItem = () => {
    const price = parseFloat(newItem.price);
    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      price: price,
      priority: newItem.priority,
      status: 'Needed',
      category: newItem.category
    };

    setItems([...items, item]);
    setNewItem({ name: '', price: '', priority: 'Medium', category: 'Other' });
    setIsAddingItem(false);
    
    toast({
      title: "Item added",
      description: `${item.name} has been added to your registry.`,
    });
  };

  const handleMarkAsReceived = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, status: 'Received' } : item
    );
    setItems(updatedItems);
    toast({
      title: "Item updated",
      description: "Item marked as received.",
    });
  };

  const handleDeleteItem = (id: string) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
    toast({
      title: "Item removed",
      description: "Item has been removed from your registry.",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="section-heading">Baby Registry</h2>
        <p className="text-muted-foreground mb-4">Keep track of what you need for your new arrival</p>
      </div>
      
      {!user && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sign in to save your registry</AlertTitle>
          <AlertDescription>
            <p className="mb-2">Create an account to save your registry items across devices.</p>
            <Link to="/auth">
              <Button variant="outline" size="sm">Sign In or Register</Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Registry Items</CardTitle>
              <CardDescription>Track everything you need for baby</CardDescription>
            </div>
            <div>
              <Button onClick={() => setIsAddingItem(!isAddingItem)}>
                {isAddingItem ? 'Cancel' : 'Add Item'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingItem && (
            <AddItemForm
              newItem={newItem}
              setNewItem={setNewItem}
              onSubmit={handleAddItem}
              onCancel={() => setIsAddingItem(false)}
            />
          )}
          
          <RegistryItems
            items={items}
            onMarkAsReceived={handleMarkAsReceived}
            onDeleteItem={handleDeleteItem}
          />
        </CardContent>
      </Card>
      
      <PaymentSection
        paymentLinks={paymentLinks}
        setPaymentLinks={setPaymentLinks}
        user={user}
      />
    </div>
  );
};

export default RegistryManager;
