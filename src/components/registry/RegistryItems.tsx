
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface RegistryItem {
  id: string;
  name: string;
  price: number;
  priority: string;
  status: string;
  category: string;
}

interface RegistryItemsProps {
  items: RegistryItem[];
  onMarkAsReceived: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const RegistryItems = ({ items, onMarkAsReceived, onDeleteItem }: RegistryItemsProps) => {
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
                    onClick={() => onMarkAsReceived(item.id)}
                  >
                    Mark Received
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">Received</span>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeleteItem(item.id)}
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

  return (
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
  );
};

export default RegistryItems;
