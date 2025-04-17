
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Smile, ThumbsUp, ThumbsDown, Copy } from 'lucide-react';

// A collection of dad jokes
const DAD_JOKES = [
  {
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!"
  },
  {
    setup: "What did the baby corn say to the mama corn?",
    punchline: "Where's pop corn?"
  },
  {
    setup: "How does a penguin build its house?",
    punchline: "Igloos it together!"
  },
  {
    setup: "Why don't eggs tell jokes?",
    punchline: "They'd crack each other up!"
  },
  {
    setup: "What's the best time to go to the dentist?",
    punchline: "Tooth-hurty!"
  },
  {
    setup: "What do you call a factory that makes okay products?",
    punchline: "A satisfactory!"
  },
  {
    setup: "What did one wall say to the other wall?",
    punchline: "I'll meet you at the corner!"
  },
  {
    setup: "What did the ocean say to the beach?",
    punchline: "Nothing, it just waved!"
  },
  {
    setup: "Why do fathers take an extra pair of socks when they go golfing?",
    punchline: "In case they get a hole in one!"
  },
  {
    setup: "What do you call a fish wearing a crown?",
    punchline: "King of the sea!"
  }
];

const DadJokes = () => {
  const { toast } = useToast();
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [likedJokes, setLikedJokes] = useState<number[]>([]);

  const currentJoke = DAD_JOKES[currentJokeIndex];

  const handleNextJoke = () => {
    const nextIndex = (currentJokeIndex + 1) % DAD_JOKES.length;
    setCurrentJokeIndex(nextIndex);
    setShowPunchline(false);
  };

  const handlePrevJoke = () => {
    const prevIndex = (currentJokeIndex - 1 + DAD_JOKES.length) % DAD_JOKES.length;
    setCurrentJokeIndex(prevIndex);
    setShowPunchline(false);
  };

  const handleRandomJoke = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * DAD_JOKES.length);
    } while (randomIndex === currentJokeIndex && DAD_JOKES.length > 1);
    
    setCurrentJokeIndex(randomIndex);
    setShowPunchline(false);
  };

  const toggleLike = () => {
    if (likedJokes.includes(currentJokeIndex)) {
      setLikedJokes(likedJokes.filter((index) => index !== currentJokeIndex));
    } else {
      setLikedJokes([...likedJokes, currentJokeIndex]);
    }
  };

  const copyJoke = () => {
    const jokeText = `${currentJoke.setup} ${currentJoke.punchline}`;
    navigator.clipboard.writeText(jokeText).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Now you can share this dad joke!",
      });
    });
  };

  const isLiked = likedJokes.includes(currentJokeIndex);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow app-container py-4">
        <div className="animate-fade-in">
          <div className="mb-8 text-center">
            <h2 className="section-heading flex items-center justify-center">
              <Smile className="mr-2 h-7 w-7" />
              Dad Jokes
            </h2>
            <p className="text-muted-foreground">
              Because being a dad means having an arsenal of groan-worthy jokes.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-center">
                  {currentJoke.setup}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {showPunchline ? (
                  <p className="text-xl font-medium py-4">{currentJoke.punchline}</p>
                ) : (
                  <Button 
                    onClick={() => setShowPunchline(true)}
                    variant="outline"
                    className="mx-auto my-4"
                  >
                    Show Punchline
                  </Button>
                )}
              </CardContent>
              <CardFooter className="flex justify-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevJoke}>
                  ←
                </Button>
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  size="icon" 
                  onClick={toggleLike}
                >
                  <ThumbsUp className={isLiked ? "text-primary-foreground" : ""} />
                </Button>
                <Button variant="outline" size="icon" onClick={copyJoke}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextJoke}>
                  →
                </Button>
              </CardFooter>
            </Card>

            <div className="flex justify-center">
              <Button onClick={handleRandomJoke} className="px-8">
                Random Dad Joke
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DadJokes;
