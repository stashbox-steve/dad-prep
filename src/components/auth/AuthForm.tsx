
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';

// Mock authentication - in a real app, this would connect to Supabase
const mockAuth = {
  signIn: async (email: string, password: string): Promise<boolean> => {
    // In production, replace with actual Supabase auth
    console.log('Sign in attempt:', email);
    // Simulate successful login for demo purposes
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    return true;
  },
  signUp: async (email: string, password: string): Promise<boolean> => {
    // In production, replace with actual Supabase auth
    console.log('Sign up attempt:', email);
    // Simulate successful registration for demo purposes
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
    return true;
  },
};

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof loginSchema>, isSignUp: boolean) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        await mockAuth.signUp(formData.email, formData.password);
        toast({
          title: "Account created!",
          description: "Welcome to DadPrep! Your account has been created.",
        });
      } else {
        await mockAuth.signIn(formData.email, formData.password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="login">
          <CardHeader>
            <CardTitle className="text-center text-dadblue">Welcome to DadPrep</CardTitle>
            <CardDescription className="text-center">
              Track your pregnancy journey and prepare for fatherhood
            </CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => onSubmit(data, false))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="dad@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <TabsContent value="login" className="mt-4">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </TabsContent>
                
                <TabsContent value="register" className="mt-4">
                  <Button 
                    type="button" 
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => form.handleSubmit((data) => onSubmit(data, true))()}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </TabsContent>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              By continuing, you agree to DadPrep's Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
