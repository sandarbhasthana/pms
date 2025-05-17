
import { Room, Reservation } from "@/types/stay-types";
import { addDays, subDays } from "date-fns";

// Mock data for rooms
const mockRooms: Room[] = [
  {
    id: "101",
    number: "101",
    type: "Standard King",
    features: ["King Bed", "City View", "WiFi", "Mini Bar"],
    status: "clean",
    floor: "1st Floor"
  },
  {
    id: "102",
    number: "102",
    type: "Standard Double",
    features: ["Two Double Beds", "WiFi", "Garden View"],
    status: "clean",
    floor: "1st Floor"
  },
  {
    id: "201",
    number: "201",
    type: "Deluxe King Suite",
    features: ["King Bed", "Sofa Bed", "Ocean View", "WiFi", "Mini Bar", "Bathtub"],
    status: "dirty",
    floor: "2nd Floor"
  },
  {
    id: "202",
    number: "202",
    type: "Deluxe Double",
    features: ["Two Queen Beds", "City View", "WiFi", "Coffee Machine"],
    status: "clean",
    floor: "2nd Floor"
  },
  {
    id: "301",
    number: "301",
    type: "Premium Suite",
    features: ["King Bed", "Living Room", "Balcony", "Ocean View", "Jacuzzi"],
    status: "maintenance",
    floor: "3rd Floor"
  },
  {
    id: "302",
    number: "302",
    type: "Family Suite",
    features: ["King Bed", "Two Twin Beds", "Kitchen", "Balcony"],
    status: "clean",
    floor: "3rd Floor"
  }
];

// Generate mock reservations based on the current date
const generateMockReservations = (): Reservation[] => {
  const today = new Date();
  
  // Helper function to get room type from room ID
  const getRoomTypeFromId = (roomId: string | null): string | undefined => {
    if (!roomId) return undefined;
    const room = mockRooms.find(r => r.id === roomId);
    return room?.type;
  };
  
  return [
    {
      id: "res-001",
      guestName: "John Smith",
      checkIn: subDays(today, 2),
      checkOut: addDays(today, 3),
      roomId: "101",
      roomType: getRoomTypeFromId("101"),
      status: "checked-in",
      adults: 1,
      children: 0,
      bookingId: "BK-12345",
      source: "Website",
      paymentStatus: "Paid",
      totalAmount: 450,
      specialRequests: "Early check-in requested. Allergic to feathers."
    },
    {
      id: "res-002",
      guestName: "Mary Johnson",
      checkIn: addDays(today, 1),
      checkOut: addDays(today, 5),
      roomId: "202",
      roomType: getRoomTypeFromId("202"),
      status: "confirmed",
      adults: 2,
      children: 1,
      bookingId: "BK-12346",
      source: "OTA",
      paymentStatus: "Partially Paid",
      totalAmount: 890,
      specialRequests: "High floor preferred."
    },
    {
      id: "res-003",
      guestName: "Robert Lee",
      checkIn: addDays(today, 3),
      checkOut: addDays(today, 10),
      roomId: "301",
      roomType: getRoomTypeFromId("301"),
      status: "tentative",
      adults: 2,
      children: 0,
      bookingId: "BK-12347",
      source: "Phone",
      paymentStatus: "Unpaid",
      totalAmount: 1200
    },
    {
      id: "res-004",
      guestName: "Sarah Williams",
      checkIn: addDays(today, 5),
      checkOut: addDays(today, 7),
      roomId: null,
      roomType: "Standard Double",
      status: "confirmed",
      adults: 1,
      children: 0,
      bookingId: "BK-12348",
      source: "Walk-in",
      paymentStatus: "Paid",
      totalAmount: 350
    },
    {
      id: "res-005",
      guestName: "David Chen",
      checkIn: addDays(today, 2),
      checkOut: addDays(today, 4),
      roomId: null,
      roomType: "Family Suite",
      status: "confirmed",
      adults: 2,
      children: 2,
      bookingId: "BK-12349",
      source: "Email",
      paymentStatus: "Partially Paid",
      totalAmount: 650,
      specialRequests: "Connecting rooms preferred. Crib needed."
    },
    {
      id: "res-006",
      guestName: "Emma Davis",
      checkIn: subDays(today, 5),
      checkOut: addDays(today, 2),
      roomId: "102",
      roomType: getRoomTypeFromId("102"),
      status: "checked-in",
      adults: 2,
      children: 0,
      bookingId: "BK-12350",
      source: "Website",
      paymentStatus: "Paid",
      totalAmount: 720
    }
  ];
};

// Fetch rooms
export const fetchRooms = async (): Promise<Room[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRooms;
};

// Fetch reservations within a date range
export const fetchReservations = async (startDate: Date, endDate: Date): Promise<Reservation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return generated mock reservations (in a real app, this would filter by date)
  return generateMockReservations();
};
