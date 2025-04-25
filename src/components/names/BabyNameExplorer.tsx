import React, { useState, useEffect } from 'react';
import { Search, Heart, Filter, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@/contexts/UserContext';
import { BabyName, PersonalBabyName } from '@/types/babyNames';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!, 
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

const BabyNameExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);
  const [publicNames, setPublicNames] = useState<BabyName[]>([]);
  const [personalNames, setPersonalNames] = useState<PersonalBabyName[]>([]);
  const [isAddNameDialogOpen, setIsAddNameDialogOpen] = useState(false);
  const [newName, setNewName] = useState<Partial<PersonalBabyName>>({});
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const fetchNames = async () => {
      const { data: publicData, error: publicError } = await supabase
        .from('baby_names')
        .select('*');

      if (user) {
        const { data: personalData, error: personalError } = await supabase
          .from('personal_baby_names')
          .select('*')
          .eq('user_id', user.email);

        if (personalData) setPersonalNames(personalData);
        if (personalError) console.error('Error fetching personal names:', personalError);
      }

      if (publicData) setPublicNames(publicData);
      if (publicError) console.error('Error fetching public names:', publicError);
    };

    fetchNames();
  }, [user]);

  const handleAddName = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add personal names.",
        variant: "destructive"
      });
      return;
    }

    const nameToAdd: PersonalBabyName = {
      ...newName as PersonalBabyName,
      user_id: user.email,
    };

    const { data, error } = await supabase
      .from('personal_baby_names')
      .insert(nameToAdd);

    if (error) {
      toast({
        title: "Error",
        description: "Could not add the name.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Name Added",
        description: `${nameToAdd.name} has been added to your personal list.`
      });
      setPersonalNames([...personalNames, nameToAdd]);
      setIsAddNameDialogOpen(false);
      setNewName({});
    }
  };

  const handleToggleFavorite = async (name: string) => {
    // Toggle favorite logic
    // You can implement Supabase update logic here if needed
  };

  const renderNamesList = (names: BabyName[], isPersonal = false) => {
    const filteredNames = names.filter(name => 
      name.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.origin.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNames.map(name => (
          <Card key={name.id} className="card-hover">
            <CardContent className="pt-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg">{name.name}</h3>
                  <p className="text-sm text-neutral-dark">{name.meaning}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={favoriteNames.includes(name.name) ? "text-red-500" : "text-neutral"}
                  onClick={() => handleToggleFavorite(name.name)}
                >
                  <Heart 
                    className="h-5 w-5" 
                    fill={favoriteNames.includes(name.name) ? "currentColor" : "none"} 
                  />
                </Button>
              </div>
              <div className="text-xs text-neutral">
                Origin: {name.origin} | Gender: {name.gender}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-heading">Baby Name Explorer</h2>
        {user && (
          <Dialog open={isAddNameDialogOpen} onOpenChange={setIsAddNameDialogOpen}>
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
                <Button onClick={handleAddName} className="w-full">Save Name</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral" />
          <Input 
            placeholder="Search for names..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <Tabs defaultValue="boys">
        <TabsList className="mb-6 w-full grid grid-cols-5">
          <TabsTrigger value="boys">Boys</TabsTrigger>
          <TabsTrigger value="girls">Girls</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favoriteNames.length})</TabsTrigger>
          {user && <TabsTrigger value="personal">My Names</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="boys">
          {renderNamesList(publicNames.filter(n => n.gender === 'boy'), false)}
        </TabsContent>
        
        <TabsContent value="girls">
          {renderNamesList(publicNames.filter(n => n.gender === 'girl'), false)}
        </TabsContent>
        
        <TabsContent value="neutral">
          {renderNamesList(publicNames.filter(n => n.gender === 'neutral'), false)}
        </TabsContent>
        
        <TabsContent value="favorites">
          {favoriteNames.length > 0 ? (
            renderNamesList(publicNames.filter(name => favoriteNames.includes(name.name)), false)
          ) : (
            <div className="text-center py-12 bg-neutral-light/30 rounded-md">
              <p className="text-neutral-dark">No favorite names yet.</p>
              <p className="text-sm text-neutral mt-2">Click the heart icon to add names to your favorites.</p>
            </div>
          )}
        </TabsContent>

        {user && (
          <TabsContent value="personal">
            {personalNames.length > 0 ? (
              renderNamesList(personalNames, true)
            ) : (
              <div className="text-center py-12 bg-neutral-light/30 rounded-md">
                <p className="text-neutral-dark">No personal names added yet.</p>
                <p className="text-sm text-neutral mt-2">Click "Add Name" to create your own list.</p>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
      
      <div className="mt-8">
        <Card className="bg-dadblue-light/10 border-dadblue-light">
          <CardHeader>
            <CardTitle className="text-dadblue">Tips for Choosing a Baby Name</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
                <span>Consider the meaning and origin of the name</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
                <span>Think about potential nicknames and initials</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
                <span>Say it out loud to test how it sounds with your last name</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
                <span>Consider family names or cultural traditions that are meaningful to you</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BabyNameExplorer;
