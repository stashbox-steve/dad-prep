
import React, { useState } from 'react';
import { Search, Heart, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// Sample baby names data
const boyNames = [
  { name: "Liam", meaning: "Strong-willed warrior", origin: "Irish" },
  { name: "Noah", meaning: "Rest, comfort", origin: "Hebrew" },
  { name: "Oliver", meaning: "Olive tree", origin: "Latin" },
  { name: "Elijah", meaning: "Jehovah is God", origin: "Hebrew" },
  { name: "William", meaning: "Resolute protector", origin: "Germanic" },
  { name: "James", meaning: "Supplanter", origin: "Hebrew" },
  { name: "Benjamin", meaning: "Son of the right hand", origin: "Hebrew" },
  { name: "Lucas", meaning: "Bringer of light", origin: "Latin" },
  { name: "Henry", meaning: "Ruler of the home", origin: "Germanic" },
  { name: "Alexander", meaning: "Defender of men", origin: "Greek" }
];

const girlNames = [
  { name: "Olivia", meaning: "Olive tree", origin: "Latin" },
  { name: "Emma", meaning: "Whole or universal", origin: "Germanic" },
  { name: "Charlotte", meaning: "Free woman", origin: "French" },
  { name: "Amelia", meaning: "Work", origin: "Germanic" },
  { name: "Ava", meaning: "Life", origin: "Latin" },
  { name: "Sophia", meaning: "Wisdom", origin: "Greek" },
  { name: "Isabella", meaning: "God is my oath", origin: "Hebrew/Italian" },
  { name: "Mia", meaning: "Mine", origin: "Italian" },
  { name: "Evelyn", meaning: "Wished for child", origin: "English" },
  { name: "Harper", meaning: "Harpist", origin: "English" }
];

const genderNeutralNames = [
  { name: "Jordan", meaning: "To flow down", origin: "Hebrew" },
  { name: "Riley", meaning: "Valiant", origin: "Irish" },
  { name: "Avery", meaning: "Ruler of the elves", origin: "English" },
  { name: "Quinn", meaning: "Counsel", origin: "Irish" },
  { name: "Morgan", meaning: "Sea circle", origin: "Welsh" },
  { name: "Taylor", meaning: "Tailor", origin: "English" },
  { name: "Sam", meaning: "God has heard", origin: "Hebrew" },
  { name: "Alex", meaning: "Defender of mankind", origin: "Greek" },
  { name: "Cameron", meaning: "Crooked nose", origin: "Scottish" },
  { name: "Dakota", meaning: "Friend, ally", origin: "Native American" }
];

const BabyNameExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleToggleFavorite = (name: string) => {
    if (favoriteNames.includes(name)) {
      setFavoriteNames(favoriteNames.filter(n => n !== name));
      toast({
        title: "Removed from favorites",
        description: `${name} has been removed from your favorites.`,
      });
    } else {
      setFavoriteNames([...favoriteNames, name]);
      toast({
        title: "Added to favorites",
        description: `${name} has been added to your favorites.`,
      });
    }
  };
  
  const renderNamesList = (names: Array<{name: string, meaning: string, origin: string}>, filter = '') => {
    const filteredNames = names.filter(name => 
      name.name.toLowerCase().includes(filter.toLowerCase()) ||
      name.meaning.toLowerCase().includes(filter.toLowerCase()) ||
      name.origin.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNames.map(name => (
          <Card key={name.name} className="card-hover">
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
                  <Heart className="h-5 w-5" fill={favoriteNames.includes(name.name) ? "currentColor" : "none"} />
                </Button>
              </div>
              <div className="text-xs text-neutral">Origin: {name.origin}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="section-heading">Baby Name Explorer</h2>
      
      {/* Search and filters */}
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
      
      {/* Names tabs */}
      <Tabs defaultValue="boys">
        <TabsList className="mb-6 w-full grid grid-cols-4">
          <TabsTrigger value="boys">Boys</TabsTrigger>
          <TabsTrigger value="girls">Girls</TabsTrigger>
          <TabsTrigger value="neutral">Neutral</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favoriteNames.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="boys">
          {renderNamesList(boyNames, searchTerm)}
        </TabsContent>
        
        <TabsContent value="girls">
          {renderNamesList(girlNames, searchTerm)}
        </TabsContent>
        
        <TabsContent value="neutral">
          {renderNamesList(genderNeutralNames, searchTerm)}
        </TabsContent>
        
        <TabsContent value="favorites">
          {favoriteNames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...boyNames, ...girlNames, ...genderNeutralNames]
                .filter(name => favoriteNames.includes(name.name))
                .map(name => (
                  <Card key={name.name} className="card-hover">
                    <CardContent className="pt-6 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-lg">{name.name}</h3>
                          <p className="text-sm text-neutral-dark">{name.meaning}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() => handleToggleFavorite(name.name)}
                        >
                          <Heart className="h-5 w-5" fill="currentColor" />
                        </Button>
                      </div>
                      <div className="text-xs text-neutral">Origin: {name.origin}</div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-light/30 rounded-md">
              <p className="text-neutral-dark">No favorite names yet.</p>
              <p className="text-sm text-neutral mt-2">Click the heart icon to add names to your favorites.</p>
            </div>
          )}
        </TabsContent>
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
