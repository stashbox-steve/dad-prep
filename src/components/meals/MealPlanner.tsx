
import React from 'react';
import { Utensils, Coffee, Clock, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const meals = [
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
  
  const handleAddMeal = () => {
    toast({
      title: "Coming Soon!",
      description: "Meal creation functionality will be added in the next update.",
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
      default:
        return <Utensils className="h-4 w-4" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="section-heading">Meal Planning</h2>
        <Button onClick={handleAddMeal} className="mt-2 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add New Meal
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral" />
          <Input 
            placeholder="Search for meals..." 
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {meals.map(meal => (
          <Card key={meal.id} className="card-hover">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-neutral mb-1">
                    {getMealTypeIcon(meal.type)}
                    <span className="capitalize">{meal.type}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    <span>{meal.prepTime}</span>
                  </div>
                  <CardTitle className="text-base font-semibold">{meal.name}</CardTitle>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSaveMeal(meal.id)}
                >
                  Save
                </Button>
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
