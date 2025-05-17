
import { GuestProfile } from "@/types/guest-types";

export const mockGuestProfiles: GuestProfile[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    idNumber: "P1234567",
    idType: "passport",
    photoUrl: "https://source.unsplash.com/random/?portrait,man",
    vipLevel: "Gold",
    preferences: [
      { id: "p1", category: "Room", description: "High floor with city view" },
      { id: "p2", category: "Dining", description: "Vegetarian meals" },
      { id: "p3", category: "Services", description: "Early check-in when available" }
    ],
    stays: [
      {
        id: "s1",
        checkIn: new Date('2023-10-15'),
        checkOut: new Date('2023-10-20'),
        roomNumber: "405",
        amount: 1250.75,
        status: "past"
      },
      {
        id: "s2",
        checkIn: new Date('2023-12-24'),
        checkOut: new Date('2023-12-26'),
        roomNumber: "Suite 12",
        amount: 985.50,
        status: "past"
      },
      {
        id: "s3",
        checkIn: new Date(new Date().setDate(new Date().getDate() + 30)),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 35)),
        roomNumber: "506",
        amount: 1450.00,
        status: "upcoming"
      }
    ],
    lastStay: new Date('2023-12-26'),
    notes: "Prefers quieter rooms away from elevators. Loyal customer since 2020.",
    dateAdded: new Date('2020-05-15'),
    loyaltyProgram: {
      memberNumber: "LP123456",
      level: "Gold Member",
      points: 5680
    }
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Park Ave",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "USA"
    },
    vipLevel: "Platinum",
    preferences: [
      { id: "p4", category: "Room", description: "Extra pillows and blankets" },
      { id: "p5", category: "Amenities", description: "Daily newspaper delivery" }
    ],
    stays: [
      {
        id: "s4",
        checkIn: new Date(new Date().setDate(new Date().getDate() - 2)),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 3)),
        roomNumber: "Presidential Suite",
        amount: 3200.00,
        status: "current"
      }
    ],
    lastStay: new Date('2023-08-15'),
    notes: "Corporate account with XYZ Corp. Always book the presidential suite.",
    dateAdded: new Date('2021-03-10')
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.j@example.com",
    phone: "+1 (555) 555-5555",
    vipLevel: "None",
    preferences: [],
    stays: [
      {
        id: "s5",
        checkIn: new Date('2023-06-10'),
        checkOut: new Date('2023-06-15'),
        roomNumber: "201",
        amount: 780.25,
        status: "past"
      }
    ],
    lastStay: new Date('2023-06-15'),
    dateAdded: new Date('2023-05-20')
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 222-3333",
    address: {
      street: "789 Oak St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    vipLevel: "Silver",
    preferences: [
      { id: "p6", category: "Room", description: "Allergy-friendly room" }
    ],
    stays: [
      {
        id: "s6",
        checkIn: new Date('2023-11-05'),
        checkOut: new Date('2023-11-08'),
        roomNumber: "304",
        amount: 675.50,
        status: "past"
      },
      {
        id: "s7",
        checkIn: new Date(new Date().setDate(new Date().getDate() + 15)),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 18)),
        roomNumber: "Unassigned",
        amount: 700.00,
        status: "upcoming"
      }
    ],
    lastStay: new Date('2023-11-08'),
    dateAdded: new Date('2022-08-15'),
    loyaltyProgram: {
      memberNumber: "LP789012",
      level: "Silver Member",
      points: 2340
    }
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 444-7777",
    vipLevel: "Bronze",
    preferences: [
      { id: "p7", category: "Dining", description: "Dairy-free options" }
    ],
    stays: [],
    dateAdded: new Date('2023-09-30')
  }
];
