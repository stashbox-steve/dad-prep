
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TipCard = () => {
  return (
    <Card className="bg-dadblue-light/10 border-dadblue-light mt-8">
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
  );
};

export default TipCard;
