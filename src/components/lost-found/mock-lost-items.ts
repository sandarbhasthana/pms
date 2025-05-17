
import { LostFoundItem } from "@/types/lost-found-types";

export const mockLostItems: LostFoundItem[] = [
  {
    id: "1",
    dateFound: new Date(2025, 4, 1), // May 1, 2025
    description: "iPhone 14 Pro in black case",
    location: "Room 304",
    status: "Stored",
    finderName: "Emma Johnson",
    linkedGuestId: "1",
    linkedGuestName: "John Smith",
    category: "Electronics",
    photoUrl: "https://placehold.co/400x300?text=iPhone",
    notes: "Found under the bed during room cleaning"
  },
  {
    id: "2",
    dateFound: new Date(2025, 4, 2), // May 2, 2025
    description: "Gold necklace with heart pendant",
    location: "Spa area",
    status: "Returned to Guest",
    finderName: "Luis Fernandez",
    returnDate: new Date(2025, 4, 3), // May 3, 2025
    linkedGuestId: "2",
    linkedGuestName: "Sarah Johnson",
    category: "Jewelry",
    photoUrl: "https://placehold.co/400x300?text=Necklace",
    notes: "Guest claimed item on May 3rd"
  },
  {
    id: "3",
    dateFound: new Date(2025, 4, 3), // May 3, 2025
    description: "Black leather wallet",
    location: "Restaurant",
    status: "Disposed",
    finderName: "Alex Chen",
    category: "Accessories",
    photoUrl: "https://placehold.co/400x300?text=Wallet",
    notes: "No ID or credit cards inside. Disposed after 30 day holding period."
  },
  {
    id: "4",
    dateFound: new Date(2025, 4, 4), // May 4, 2025
    description: "MacBook Pro charger",
    location: "Conference Room B",
    status: "Stored",
    finderName: "Maria Garcia",
    category: "Electronics"
  },
  {
    id: "5",
    dateFound: new Date(2025, 4, 5), // May 5, 2025
    description: "Blue umbrella with white stripes",
    location: "Lobby",
    status: "Stored",
    finderName: "David Kim",
    category: "Accessories"
  },
  {
    id: "6",
    dateFound: new Date(2025, 4, 4), // May 4, 2025
    description: "Prescription glasses with red frames",
    location: "Pool area",
    status: "Returned to Guest",
    finderName: "Sofia Rodriguez",
    returnDate: new Date(2025, 4, 6), // May 6, 2025
    trackingNumber: "USPS12345678",
    linkedGuestId: "4",
    linkedGuestName: "Michael Brown",
    category: "Accessories",
    photoUrl: "https://placehold.co/400x300?text=Glasses",
    notes: "Shipped to guest's home address"
  },
  {
    id: "7",
    dateFound: new Date(2025, 4, 3), // May 3, 2025
    description: "Child's teddy bear",
    location: "Room 517",
    status: "In Process",
    finderName: "James Wilson",
    linkedGuestId: "5",
    linkedGuestName: "Emily Davis",
    category: "Other",
    photoUrl: "https://placehold.co/400x300?text=Teddy+Bear",
    notes: "Contacting guest to arrange return"
  }
];
