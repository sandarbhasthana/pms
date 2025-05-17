
import { Reservation, ReservationFilter, ReservationFormData } from "@/types/stay-types";
import { addDays, subDays, format, parseISO } from "date-fns";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Generate more realistic mock data
const generateMockReservations = (): Reservation[] => {
  const today = new Date();
  
  return [
    {
      id: "res-001",
      guestName: "John Smith",
      checkIn: subDays(today, 2),
      checkOut: addDays(today, 3),
      roomId: "101",
      roomType: "Standard King",
      status: "checked-in",
      adults: 1,
      children: 0,
      source: "Website",
      bookingId: "BK-12345",
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
      roomType: "Deluxe Double",
      status: "confirmed",
      adults: 2,
      children: 1,
      source: "OTA",
      bookingId: "BK-12346",
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
      roomType: "Premium Suite",
      status: "tentative",
      adults: 2,
      children: 0,
      source: "Phone",
      bookingId: "BK-12347",
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
      source: "Walk-in",
      bookingId: "BK-12348",
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
      source: "Email",
      bookingId: "BK-12349",
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
      roomType: "Standard Double",
      status: "checked-in",
      adults: 2,
      children: 0,
      source: "Website",
      bookingId: "BK-12350",
      paymentStatus: "Paid",
      totalAmount: 720
    },
    {
      id: "res-007",
      guestName: "Michael Wilson",
      checkIn: subDays(today, 10),
      checkOut: subDays(today, 5),
      roomId: "201",
      roomType: "Deluxe King Suite",
      status: "checked-in",
      adults: 2,
      children: 0,
      source: "OTA",
      bookingId: "BK-12351",
      paymentStatus: "Paid",
      totalAmount: 950
    },
    {
      id: "res-008",
      guestName: "Jennifer Garcia",
      checkIn: addDays(today, 15),
      checkOut: addDays(today, 20),
      roomId: null,
      roomType: "Standard King",
      status: "confirmed",
      adults: 1,
      children: 0,
      source: "Phone",
      bookingId: "BK-12352",
      paymentStatus: "Unpaid",
      totalAmount: 550
    }
  ];
};

// Mock room types for selection
export const roomTypes = [
  "Standard King",
  "Standard Double",
  "Deluxe King Suite",
  "Deluxe Double",
  "Premium Suite",
  "Family Suite"
];

// Mock booking sources
export const bookingSources = [
  "OTA",
  "Website",
  "Walk-in",
  "Phone",
  "Email",
  "Other"
];

let mockReservations = generateMockReservations();

// Fetch all reservations
export const fetchReservations = async (filters?: ReservationFilter): Promise<Reservation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Apply filters if provided
  if (filters) {
    let filteredReservations = [...mockReservations];
    
    // Filter by date range
    if (filters.dateRange?.start && filters.dateRange?.end) {
      filteredReservations = filteredReservations.filter(res => {
        return (
          res.checkIn >= filters.dateRange!.start! && 
          res.checkOut <= filters.dateRange!.end!
        );
      });
    }
    
    // Filter by room type
    if (filters.roomType && filters.roomType !== "All") {
      filteredReservations = filteredReservations.filter(res => 
        res.roomType === filters.roomType
      );
    }
    
    // Filter by source
    if (filters.source && filters.source !== "All") {
      filteredReservations = filteredReservations.filter(res => 
        res.source === filters.source
      );
    }
    
    // Filter by search query (guest name or booking ID)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredReservations = filteredReservations.filter(res => 
        res.guestName.toLowerCase().includes(query) || 
        res.bookingId.toLowerCase().includes(query)
      );
    }
    
    return filteredReservations;
  }
  
  return mockReservations;
};

// Create a new reservation
export const createReservation = async (reservationData: ReservationFormData): Promise<Reservation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newReservation: Reservation = {
    id: `res-${uuidv4().slice(0, 6)}`,
    guestName: reservationData.guestName,
    checkIn: reservationData.checkIn,
    checkOut: reservationData.checkOut,
    roomId: reservationData.roomId,
    roomType: reservationData.roomType,
    status: "confirmed",
    adults: reservationData.adults,
    children: reservationData.children,
    specialRequests: reservationData.specialRequests,
    source: reservationData.source,
    paymentStatus: reservationData.paymentStatus,
    totalAmount: reservationData.totalAmount,
    bookingId: `BK-${Math.floor(10000 + Math.random() * 90000)}`
  };
  
  // Add to mock data
  mockReservations.unshift(newReservation);
  
  toast.success("Reservation created successfully", {
    description: `Booking ID: ${newReservation.bookingId}`
  });
  
  return newReservation;
};

// Update existing reservation
export const updateReservation = async (id: string, reservationData: Partial<ReservationFormData>): Promise<Reservation> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const index = mockReservations.findIndex(r => r.id === id);
  
  if (index === -1) {
    throw new Error("Reservation not found");
  }
  
  mockReservations[index] = {
    ...mockReservations[index],
    ...reservationData
  };
  
  return mockReservations[index];
};

// Cancel reservation
export const cancelReservation = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockReservations.findIndex(r => r.id === id);
  
  if (index === -1) {
    throw new Error("Reservation not found");
  }
  
  mockReservations[index].status = "cancelled";
};

// Mock function to get guest list for autofill
export const fetchGuestSuggestions = async (query: string): Promise<{id: string, name: string}[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const mockGuests = [
    { id: "g-001", name: "John Smith" },
    { id: "g-002", name: "Mary Johnson" },
    { id: "g-003", name: "Robert Lee" },
    { id: "g-004", name: "Sarah Williams" },
    { id: "g-005", name: "David Chen" },
    { id: "g-006", name: "Emma Davis" },
    { id: "g-007", name: "Michael Wilson" },
    { id: "g-008", name: "Jennifer Garcia" },
    { id: "g-009", name: "James Brown" },
    { id: "g-010", name: "Patricia Miller" }
  ];
  
  // Filter guests by query
  return mockGuests.filter(guest => 
    guest.name.toLowerCase().includes(query.toLowerCase())
  );
};
