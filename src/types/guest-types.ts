
export type VIPLevel = 'None' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface GuestPreference {
  id: string;
  category: string;
  description: string;
}

export interface Stay {
  id: string;
  checkIn: Date;
  checkOut: Date;
  roomNumber: string;
  amount: number;
  status: 'past' | 'current' | 'upcoming' | 'cancelled';
}

export interface GuestProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  idNumber?: string;
  idType?: 'passport' | 'driver-license' | 'national-id' | 'none';
  photoUrl?: string;
  vipLevel: VIPLevel;
  preferences: GuestPreference[];
  stays: Stay[];
  lastStay?: Date;
  notes?: string;
  dateAdded: Date;
  loyaltyProgram?: {
    memberNumber: string;
    level: string;
    points: number;
  };
}
