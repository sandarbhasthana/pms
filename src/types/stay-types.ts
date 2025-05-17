
export interface Room {
  id: string;
  number: string;
  type: string;
  features: string[];
  status: "clean" | "dirty" | "maintenance" | "inspecting";
  floor: string;
  maxAdults?: number;
  maxChildren?: number;
  baseOccupancy?: number;
}

export interface Reservation {
  id: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  roomId: string | null;
  status: "confirmed" | "checked-in" | "tentative" | "cancelled" | "pending";
  adults: number;
  children: number;
  specialRequests?: string;
  bookingId: string;
  roomType?: string;
  source?: "OTA" | "Website" | "Walk-in" | "Phone" | "Email" | "Other";
  paymentStatus?: "Unpaid" | "Partially Paid" | "Paid";
  totalAmount?: number;
  ratePlan?: string;
  notes?: string;
}

export interface ReservationDragItem {
  id: string;
  type: "reservation";
  originalRoomId: string | null;
  startDate: Date;
  endDate: Date;
}

export interface ReservationFormData {
  guestName: string; // This is required
  guestId?: string;
  roomType: string;
  roomId: string | null;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  specialRequests?: string;
  source: "OTA" | "Website" | "Walk-in" | "Phone" | "Email" | "Other";
  paymentStatus: "Unpaid" | "Partially Paid" | "Paid";
  totalAmount?: number;
  isNewGuest?: boolean; // Added this field to match the form
}

export interface ReservationFilter {
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  roomType?: string;
  source?: string;
  searchQuery?: string;
}

export interface RateInfo {
  date: string;
  roomTypeId: string;
  price: number;
  baseOccupancy: number;
  additionalAdultRate: number;
  additionalChildRate: number;
  suggestedPrice?: number;
  hasEvent?: boolean;
  eventName?: string;
  competitorRates?: {
    name: string;
    price: number;
  }[];
  competitorAverage?: number;
}
