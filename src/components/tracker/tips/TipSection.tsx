
import React from 'react';

interface TipSectionProps {
  title: string;
  content: string;
}

const TipSection: React.FC<TipSectionProps> = ({ title, content }) => {
  return (
    <div>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-neutral-dark">{content}</p>
    </div>
  );
};

export default TipSection;
