
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@supabase/supabase-js';
import { useUser } from '@/contexts/UserContext';
import { BabyName, PersonalBabyName } from '@/types/babyNames';
import { Button } from '@/components/ui/button';
import { useBaseWallet } from '@/hooks/useBaseWallet';

// Import the new components
import SearchBar from './SearchBar';
import NamesList from './NamesList';
import AddNameDialog from './AddNameDialog';
import TipCard from './TipCard';

// Safely get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create the client if both URL and key are available
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const BabyNameExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteNames, setFavoriteNames] = useState<string[]>([]);
  const [publicNames, setPublicNames] = useState<BabyName[]>([]);
  const [personalNames, setPersonalNames] = useState<PersonalBabyName[]>([]);
  const [walletNames, setWalletNames] = useState<BabyName[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useUser();
  const { toast } = useToast();
  const { walletUser, connectWallet, isBaseWalletAvailable } = useBaseWallet();

  useEffect(() => {
    const fetchNames = async () => {
      // Check if Supabase client is available
      if (!supabase) {
        console.error('Supabase client not initialized. Missing environment variables.');
        setError('Database connection not available. Please check your configuration.');
        return;
      }

      try {
        // Fetch public names
        const { data: publicData, error: publicError } = await supabase
          .from('baby_names')
          .select('*');

        // Fetch personal names if user is logged in
        if (user) {
          const { data: personalData, error: personalError } = await supabase
            .from('personal_baby_names')
            .select('*')
            .eq('user_id', user.email);

          if (personalData) setPersonalNames(personalData);
          if (personalError) console.error('Error fetching personal names:', personalError);
        }

        // Fetch wallet-associated names if wallet is connected
        if (walletUser?.address) {
          const { data: walletData, error: walletError } = await supabase
            .from('personal_baby_names')
            .select('*')
            .eq('wallet_address', walletUser.address);

          if (walletData) setWalletNames(walletData);
          if (walletError) console.error('Error fetching wallet names:', walletError);
        }

        if (publicData) setPublicNames(publicData);
        if (publicError) {
          console.error('Error fetching public names:', publicError);
          setError('Error loading baby names. Please try again later.');
        }
      } catch (err) {
        console.error('Error in fetchNames:', err);
        setError('Failed to connect to the database.');
      }
    };

    fetchNames();
    
    // Fetch stored favorites
    const storedFavorites = localStorage.getItem('favoriteNames');
    if (storedFavorites) {
      setFavoriteNames(JSON.parse(storedFavorites));
    }
  }, [user, walletUser]);

  const handleAddName = async (nameToAdd: PersonalBabyName) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Database connection not available.",
        variant: "destructive"
      });
      return;
    }
    
    try {
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
        
        if (nameToAdd.wallet_address) {
          setWalletNames([...walletNames, nameToAdd]);
        } else {
          setPersonalNames([...personalNames, nameToAdd]);
        }
      }
    } catch (error) {
      console.error("Error adding name:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  const handleToggleFavorite = (name: string) => {
    let updatedFavorites: string[];
    
    if (favoriteNames.includes(name)) {
      updatedFavorites = favoriteNames.filter(n => n !== name);
    } else {
      updatedFavorites = [...favoriteNames, name];
    }
    
    setFavoriteNames(updatedFavorites);
    localStorage.setItem('favoriteNames', JSON.stringify(updatedFavorites));
  };

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-heading">Baby Name Explorer</h2>
        <div className="flex gap-2">
          {isBaseWalletAvailable && !walletUser && (
            <Button variant="outline" onClick={handleConnectWallet}>
              Connect Base Wallet
            </Button>
          )}
          
          {(user || walletUser) && (
            <AddNameDialog onAddName={handleAddName} walletAddress={walletUser?.address} />
          )}
        </div>
      </div>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {error ? (
        <div className="text-center py-12 bg-neutral-light/30 rounded-md">
          <p className="text-red-500">{error}</p>
          <p className="text-sm text-neutral mt-2">
            Please check your environment variables or contact support.
          </p>
        </div>
      ) : (
        <Tabs defaultValue="boys">
          <TabsList className="mb-6 w-full grid grid-cols-5 sm:grid-cols-6">
            <TabsTrigger value="boys">Boys</TabsTrigger>
            <TabsTrigger value="girls">Girls</TabsTrigger>
            <TabsTrigger value="neutral">Neutral</TabsTrigger>
            <TabsTrigger value="favorites">Favorites ({favoriteNames.length})</TabsTrigger>
            {user && <TabsTrigger value="personal">My Names</TabsTrigger>}
            {walletUser && <TabsTrigger value="wallet">Base Wallet</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="boys">
            <NamesList 
              names={publicNames.filter(n => n.gender === 'boy')}
              favoriteNames={favoriteNames}
              searchTerm={searchTerm}
              onToggleFavorite={handleToggleFavorite}
            />
          </TabsContent>
          
          <TabsContent value="girls">
            <NamesList 
              names={publicNames.filter(n => n.gender === 'girl')}
              favoriteNames={favoriteNames}
              searchTerm={searchTerm}
              onToggleFavorite={handleToggleFavorite}
            />
          </TabsContent>
          
          <TabsContent value="neutral">
            <NamesList 
              names={publicNames.filter(n => n.gender === 'neutral')}
              favoriteNames={favoriteNames}
              searchTerm={searchTerm}
              onToggleFavorite={handleToggleFavorite}
            />
          </TabsContent>
          
          <TabsContent value="favorites">
            {favoriteNames.length > 0 ? (
              <NamesList 
                names={publicNames.filter(name => favoriteNames.includes(name.name))}
                favoriteNames={favoriteNames}
                searchTerm={searchTerm}
                onToggleFavorite={handleToggleFavorite}
              />
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
                <NamesList 
                  names={personalNames}
                  favoriteNames={favoriteNames}
                  searchTerm={searchTerm}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <div className="text-center py-12 bg-neutral-light/30 rounded-md">
                  <p className="text-neutral-dark">No personal names added yet.</p>
                  <p className="text-sm text-neutral mt-2">Click "Add Name" to create your own list.</p>
                </div>
              )}
            </TabsContent>
          )}

          {walletUser && (
            <TabsContent value="wallet">
              {walletNames.length > 0 ? (
                <NamesList 
                  names={walletNames}
                  favoriteNames={favoriteNames}
                  searchTerm={searchTerm}
                  onToggleFavorite={handleToggleFavorite}
                />
              ) : (
                <div className="text-center py-12 bg-neutral-light/30 rounded-md">
                  <p className="text-neutral-dark">No names in your Base Wallet yet.</p>
                  <p className="text-sm text-neutral mt-2">Click "Add Name" to create names linked to your wallet.</p>
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      )}
      
      <TipCard />
    </div>
  );
};

export default BabyNameExplorer;
