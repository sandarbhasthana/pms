
export type LostItemStatus = 'Stored' | 'Returned to Guest' | 'Disposed' | 'In Process';

export interface LostFoundItem {
  id: string;
  dateFound: Date;
  description: string;
  location: string;
  status: LostItemStatus;
  linkedGuestId?: string;
  linkedGuestName?: string;
  finderName: string;
  photoUrl?: string;
  notes?: string;
  category?: string;
  returnDate?: Date;
  trackingNumber?: string;
}
