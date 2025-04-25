
export interface BabyName {
  id?: number;
  name: string;
  meaning: string;
  origin: string;
  gender: 'boy' | 'girl' | 'neutral';
  user_id?: string; // For personalized names
  is_favorite?: boolean;
}

export interface PersonalBabyName extends BabyName {
  user_id: string;
  notes?: string;
}
