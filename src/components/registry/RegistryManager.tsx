
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ExternalLink, Link as LinkIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

type PaymentLinks = {
  venmo?: string;
  cashApp?: string;
};

const RegistryManager = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [items, setItems] = useState(defaultItems);
  const [newItem, setNewItem] = useState({ name: '', price: '', priority: 'Medium', category: 'Other' });
  const [editItem, setEditItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentLinks, setPaymentLinks] = useState<PaymentLinks>({});
  const [venmoUsername, setVenmoUsername] = useState("");
  const [cashAppUsername, setCashAppUsername] = useState("");
  
  // Load saved registry data
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
          setVenmoUsername(links.venmo || "");
          setCashAppUsername(links.cashApp || "");
        } catch (error) {
          console.error('Error parsing payment links', error);
        }
      }
    }
  }, [user]);
  
  // Save registry items when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`registry-items-${user.email}`, JSON.stringify(items));
    }
  }, [items, user]);

  const handleAddItem = () => {
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

  const handleSavePaymentLinks = () => {
    // Validate Venmo username if provided
    if (venmoUsername && !venmoUsername.startsWith('@')) {
      toast({
        title: "Invalid Venmo username",
        description: "Venmo usernames must start with @",
        variant: "destructive",
      });
      return;
    }
    
    const links: PaymentLinks = {};
    
    if (venmoUsername) links.venmo = venmoUsername;
    if (cashAppUsername) links.cashApp = cashAppUsername;
    
    setPaymentLinks(links);
    
    if (user) {
      localStorage.setItem(`payment-links-${user.email}`, JSON.stringify(links));
    }
    
    setIsPaymentDialogOpen(false);
    
    toast({
      title: "Payment links saved",
      description: "Your payment links have been updated.",
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

  const renderItems = (status: string) => {
    const filteredItems = items.filter(item => item.status === status);
    
    if (filteredItems.length === 0) {
      return (
        <div className="text-center p-6 text-muted-foreground">
          No items found
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>
                ${item.price.toFixed(2)} · {item.category} · Priority: {item.priority}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex justify-between w-full">
                {status === 'Needed' ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMarkAsReceived(item.id)}
                  >
                    Mark Received
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">Received</span>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  const renderPaymentLinks = () => {
    if (!paymentLinks.venmo && !paymentLinks.cashApp) {
      return (
        <p className="text-sm text-muted-foreground">
          No payment links have been added. Click the button below to add your Venmo or Cash App info.
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {paymentLinks.venmo && (
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-dadblue" />
            <span>Venmo: </span>
            <a 
              href={`https://venmo.com/${paymentLinks.venmo.substring(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dadblue hover:underline flex items-center gap-1"
            >
              {paymentLinks.venmo}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        {paymentLinks.cashApp && (
          <div className="flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-dadblue" />
            <span>Cash App: </span>
            <a 
              href={`https://cash.app/${cashAppUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dadblue hover:underline flex items-center gap-1"
            >
              ${paymentLinks.cashApp}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    );
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
                  <Button onClick={handleAddItem}>
                    Add to Registry
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="needed" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="needed">Needed</TabsTrigger>
              <TabsTrigger value="received">Received</TabsTrigger>
            </TabsList>
            <TabsContent value="needed" className="mt-4">
              {renderItems('Needed')}
            </TabsContent>
            <TabsContent value="received" className="mt-4">
              {renderItems('Received')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment Links</CardTitle>
              <CardDescription>Add your Venmo or Cash App details</CardDescription>
            </div>
            <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Links</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Payment Links</DialogTitle>
                  <DialogDescription>
                    Add your payment details to make it easy for friends and family to send gifts.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="venmo">Venmo Username</Label>
                    <Input
                      id="venmo"
                      value={venmoUsername}
                      onChange={(e) => setVenmoUsername(e.target.value)}
                      placeholder="@username"
                    />
                    <p className="text-xs text-muted-foreground">
                      Include the @ symbol (e.g. @johndoe)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cashapp">Cash App Username</Label>
                    <Input
                      id="cashapp"
                      value={cashAppUsername}
                      onChange={(e) => setCashAppUsername(e.target.value)}
                      placeholder="username (without $)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter just the username without the $ symbol
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSavePaymentLinks}>Save Links</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {renderPaymentLinks()}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistryManager;
