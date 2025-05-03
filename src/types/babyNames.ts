
export interface BabyName {
  name: string;
  meaning: string;
  origin: string;
  gender: 'boy' | 'girl' | 'neutral';
  notes?: string;
}

export interface BaseWalletUser {
  address: string;
  displayName?: string;
  profileImage?: string;
}
