
import React, { useState, useEffect } from 'react';
import { Utensils, Coffee, Cookie, Salad, Plus, Search, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useUser } from '@/contexts/UserContext';

interface Meal {
  id: number;
  name: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  prepTime: string;
  nutrients: string[];
  userAdded?: boolean;
}

const defaultMeals: Meal[] = [
  {
    id: 1,
    name: "Protein-Packed Breakfast Bowl",
    description: "Scrambled eggs with spinach, avocado, and whole grain toast",
    type: "breakfast",
    prepTime: "15 min",
    nutrients: ["Protein", "Folate", "Healthy Fats"]
  },
  {
    id: 2,
    name: "Anti-Nausea Smoothie",
    description: "Ginger, banana, and yogurt smoothie to help with morning sickness",
    type: "breakfast",
    prepTime: "5 min",
    nutrients: ["Vitamin B6", "Probiotics", "Potassium"]
  },
  {
    id: 3,
    name: "Iron-Rich Lunch",
    description: "Lentil salad with leafy greens, bell peppers, and pumpkin seeds",
    type: "lunch",
    prepTime: "20 min",
    nutrients: ["Iron", "Fiber", "Vitamin C"]
  },
  {
    id: 4,
    name: "Hearty Dinner",
    description: "Baked salmon with sweet potato and steamed broccoli",
    type: "dinner",
    prepTime: "30 min",
    nutrients: ["Omega-3", "Vitamin A", "Calcium"]
  },
  {
    id: 5,
    name: "Balanced Snack",
    description: "Apple slices with peanut butter and a small handful of nuts",
    type: "snack",
    prepTime: "2 min",
    nutrients: ["Protein", "Healthy Fats", "Fiber"]
  }
];

const MealPlanner = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const form = useForm<{
    name: string;
    description: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    prepTime: string;
    nutrients: string;
  }>({
    defaultValues: {
      name: '',
      description: '',
      type: 'breakfast',
      prepTime: '',
      nutrients: '',
    },
  });

  // Load saved meals from localStorage
  useEffect(() => {
    if (user) {
      const savedMeals = localStorage.getItem(`user-meals-${user.email}`);
      if (savedMeals) {
        try {
          const parsedMeals = JSON.parse(savedMeals);
          setMeals([...defaultMeals, ...parsedMeals]);
        } catch (error) {
          console.error('Error parsing saved meals', error);
        }
      }
    }
  }, [user]);

  const saveUserMeals = (updatedMeals: Meal[]) => {
    if (user) {
      const userAddedMeals = updatedMeals.filter(meal => meal.userAdded);
      localStorage.setItem(`user-meals-${user.email}`, JSON.stringify(userAddedMeals));
    }
  };

  const handleAddMeal = (data: any) => {
    const newMeal: Meal = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      type: data.type,
      prepTime: data.prepTime || '0 min',
      nutrients: data.nutrients.split(',').map((n: string) => n.trim()).filter((n: string) => n),
      userAdded: true,
    };
    
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    saveUserMeals(updatedMeals);
    
    toast({
      title: "Meal Added",
      description: `${newMeal.name} has been added to your meal plan.`,
    });
    
    form.reset();
    setDialogOpen(false);
  };

  const handleDeleteMeal = (mealId: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== mealId);
    setMeals(updatedMeals);
    saveUserMeals(updatedMeals);
    
    toast({
      title: "Meal Removed",
      description: "The meal has been removed from your meal plan.",
    });
  };

  const handleSaveMeal = (mealId: number) => {
    toast({
      title: "Meal Saved!",
      description: "The meal has been added to your favorites.",
    });
  };

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'lunch':
      case 'dinner':
        return <Utensils className="h-4 w-4" />;
      case 'snack':
        return <Cookie className="h-4 w-4" />;
      default:
        return <Salad className="h-4 w-4" />;
    }
  };

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || meal.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="section-heading">Meal Planning</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-2 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New Meal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Meal</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddMeal)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter meal name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the meal and ingredients" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meal Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prep Time (min)</FormLabel>
                        <FormControl>
                          <Input placeholder="15" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="nutrients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nutrients (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="Protein, Iron, Fiber" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Meal</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral" />
          <Input 
            placeholder="Search for meals..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Meals</SelectItem>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredMeals.map(meal => (
            <Card key={meal.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-neutral mb-1">
                      {getMealTypeIcon(meal.type)}
                      <span className="capitalize">{meal.type}</span>
                      <span className="mx-1">•</span>
                      <span>{meal.prepTime}</span>
                    </div>
                    <CardTitle className="text-base font-semibold">{meal.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {meal.userAdded && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSaveMeal(meal.id)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
                <CardDescription>{meal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {meal.nutrients.map(nutrient => (
                    <span key={nutrient} className="text-xs bg-neutral-light text-neutral-dark px-2 py-1 rounded-full">
                      {nutrient}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-muted rounded-lg mb-6">
          <p>No meals found. Try adjusting your search or filter.</p>
        </div>
      )}

      <Card className="bg-dadblue-light/10 border-dadblue-light">
        <CardHeader>
          <CardTitle className="text-dadblue">Nutrition Tips for Pregnancy</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
              <span>Folate-rich foods like leafy greens help prevent neural tube defects.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
              <span>Iron from meat, beans, and fortified cereals prevents anemia.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
              <span>Calcium supports bone development - dairy, fortified plant milks, and leafy greens are good sources.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-dadblue mt-1.5 mr-2"></span>
              <span>Omega-3 fatty acids from fish and walnuts support brain development.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlanner;
