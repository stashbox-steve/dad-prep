
import React, { useState } from 'react';
import { ShoppingBag, Link2, ExternalLink, Plus, Trash2, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const sampleRegistries = [
  {
    id: 1,
    name: "Amazon Baby Registry",
    url: "https://www.amazon.com",
    items: 42
  },
  {
    id: 2,
    name: "Target Baby Registry",
    url: "https://www.target.com",
    items: 28
  }
];

const sampleEssentials = [
  {
    category: "Sleep",
    items: [
      { name: "Crib", priority: "high" },
      { name: "Crib mattress", priority: "high" },
      { name: "Fitted crib sheets", priority: "medium" },
      { name: "Baby monitor", priority: "high" },
      { name: "Swaddles", priority: "medium" }
    ]
  },
  {
    category: "Feeding",
    items: [
      { name: "Bottles", priority: "high" },
      { name: "Bottle brush", priority: "medium" },
      { name: "Nursing pillow", priority: "medium" },
      { name: "Burp cloths", priority: "high" },
      { name: "High chair", priority: "low" }
    ]
  },
  {
    category: "Clothing",
    items: [
      { name: "Onesies (0-3 months)", priority: "high" },
      { name: "Sleep sacks", priority: "medium" },
      { name: "Socks", priority: "medium" },
      { name: "Hats", priority: "medium" },
      { name: "Seasonal outerwear", priority: "low" }
    ]
  },
  {
    category: "Diapering",
    items: [
      { name: "Diapers", priority: "high" },
      { name: "Wipes", priority: "high" },
      { name: "Changing pad", priority: "medium" },
      { name: "Diaper bag", priority: "medium" },
      { name: "Diaper cream", priority: "medium" }
    ]
  }
];

const RegistryManager = () => {
  const [registries, setRegistries] = useState(sampleRegistries);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRegistry, setNewRegistry] = useState({ name: '', url: '' });
  const [paymentLinks, setPaymentLinks] = useState({ venmo: '', cashapp: '' });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { toast } = useToast();
  
  const handleAddRegistry = () => {
    if (!newRegistry.name || !newRegistry.url) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }
    
    // Ensure URL has http/https prefix
    let url = newRegistry.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const newItem = {
      id: Date.now(),
      name: newRegistry.name,
      url,
      items: 0
    };
    
    setRegistries([...registries, newItem]);
    setNewRegistry({ name: '', url: '' });
    setShowAddForm(false);
    
    toast({
      title: "Registry Added",
      description: "Your registry has been successfully added.",
    });
  };
  
  const handleRemoveRegistry = (id: number) => {
    setRegistries(registries.filter(reg => reg.id !== id));
    toast({
      title: "Registry Removed",
      description: "Your registry has been removed.",
    });
  };
  
  const handleSavePaymentLinks = () => {
    // Validate Venmo username (should start with @)
    if (paymentLinks.venmo && !paymentLinks.venmo.startsWith('@')) {
      toast({
        variant: "destructive",
        title: "Invalid Venmo",
        description: "Venmo username should start with @",
      });
      return;
    }
    
    toast({
      title: "Payment Links Saved",
      description: "Your payment links have been successfully saved.",
    });
    setShowPaymentForm(false);
  };
  
  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-neutral-light text-neutral-dark';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="section-heading">Registry Manager</h2>
        <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
          {!showAddForm && !showPaymentForm && (
            <>
              <Button onClick={() => setShowPaymentForm(true)} className="flex items-center" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Payment Links
              </Button>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Registry
              </Button>
            </>
          )}
        </div>
      </div>

      {showPaymentForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Links</CardTitle>
            <CardDescription>Add your Venmo and CashApp usernames for gift contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="venmo" className="block text-sm font-medium text-neutral-dark mb-1">
                  Venmo Username
                </label>
                <Input 
                  id="venmo" 
                  placeholder="@your-venmo-username" 
                  value={paymentLinks.venmo}
                  onChange={(e) => setPaymentLinks({...paymentLinks, venmo: e.target.value})}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your Venmo username starting with @
                </p>
              </div>
              <div>
                <label htmlFor="cashapp" className="block text-sm font-medium text-neutral-dark mb-1">
                  CashApp Username
                </label>
                <Input 
                  id="cashapp" 
                  placeholder="$your-cashapp-username" 
                  value={paymentLinks.cashapp}
                  onChange={(e) => setPaymentLinks({...paymentLinks, cashapp: e.target.value})}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your CashApp username starting with $
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowPaymentForm(false)}>Cancel</Button>
            <Button onClick={handleSavePaymentLinks}>Save Payment Links</Button>
          </CardFooter>
        </Card>
      )}

      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Registry</CardTitle>
            <CardDescription>Link your existing baby registry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="registry-name" className="block text-sm font-medium text-neutral-dark mb-1">
                  Registry Name
                </label>
                <Input 
                  id="registry-name" 
                  placeholder="e.g. Amazon Baby Registry" 
                  value={newRegistry.name}
                  onChange={(e) => setNewRegistry({...newRegistry, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="registry-url" className="block text-sm font-medium text-neutral-dark mb-1">
                  Registry URL
                </label>
                <Input 
                  id="registry-url" 
                  placeholder="e.g. https://www.amazon.com/baby-reg/..." 
                  value={newRegistry.url}
                  onChange={(e) => setNewRegistry({...newRegistry, url: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleAddRegistry}>Add Registry</Button>
          </CardFooter>
        </Card>
      )}

      {/* Payment Links Display */}
      {(paymentLinks.venmo || paymentLinks.cashapp) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Payment Links</CardTitle>
            <CardDescription>Alternative gift options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {paymentLinks.venmo && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-[#3D95CE] text-white p-1 rounded mr-2">
                      <span className="font-bold">V</span>
                    </div>
                    <span>Venmo: {paymentLinks.venmo}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    asChild
                  >
                    <a href={`https://venmo.com/${paymentLinks.venmo.substring(1)}`} target="_blank" rel="noopener noreferrer">
                      Send <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              )}
              {paymentLinks.cashapp && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-[#00D632] text-white p-1 rounded mr-2">
                      <span className="font-bold">$</span>
                    </div>
                    <span>CashApp: {paymentLinks.cashapp}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    asChild
                  >
                    <a href={`https://cash.app/${paymentLinks.cashapp}`} target="_blank" rel="noopener noreferrer">
                      Send <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setShowPaymentForm(true)}
            >
              Edit Payment Links
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Linked Registries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {registries.map(registry => (
          <Card key={registry.id} className="card-hover">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{registry.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral hover:text-destructive"
                  onClick={() => handleRemoveRegistry(registry.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="flex items-center">
                <Link2 className="h-3 w-3 mr-1" />
                <span className="truncate">{registry.url}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-dark">{registry.items} items</span>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <a href={registry.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Visit <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registry Essentials */}
      <h3 className="text-xl font-semibold text-dadblue-dark mb-4">Registry Essentials Checklist</h3>
      
      <div className="space-y-6">
        {sampleEssentials.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`${category.category}-${idx}`}
                        className="h-4 w-4 rounded border-neutral"
                      />
                      <label htmlFor={`${category.category}-${idx}`} className="ml-3 text-sm">
                        {item.name}
                      </label>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(item.priority)}`}>
                      {item.priority}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegistryManager;
