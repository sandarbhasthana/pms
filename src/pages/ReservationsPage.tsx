
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ReservationsTable } from "@/components/reservations/ReservationsTable";
import { ReservationsFilters } from "@/components/reservations/ReservationsFilters";
import { NewReservationForm } from "@/components/reservations/NewReservationForm";
import { Reservation, ReservationFilter } from "@/types/stay-types";
import { fetchReservations } from "@/services/reservations-service";
import { Loader2, PlusCircle } from "lucide-react";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<ReservationFilter>({});
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);

  // Load reservations
  const loadReservations = async () => {
    setIsLoading(true);
    try {
      const data = await fetchReservations(filters);
      setReservations(data);
    } catch (error) {
      console.error("Error loading reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: ReservationFilter) => {
    setFilters(newFilters);
  };

  // Handle successful reservation creation
  const handleReservationSuccess = () => {
    loadReservations();
  };

  // Load reservations on component mount and when filters change
  useEffect(() => {
    loadReservations();
  }, [filters]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reservations</h1>
          
          <Button 
            onClick={() => setShowNewReservationForm(true)}
            className="bg-pms-purple hover:bg-pms-purple/90 text-white"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Booking
          </Button>
        </div>
        
        <ReservationsFilters onFilterChange={handleFilterChange} />
        
        {isLoading && reservations.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-pms-purple" />
          </div>
        ) : (
          <ReservationsTable reservations={reservations} isLoading={isLoading} />
        )}
        
        <NewReservationForm 
          isOpen={showNewReservationForm}
          onClose={() => setShowNewReservationForm(false)}
          onSuccess={handleReservationSuccess}
        />
      </div>
    </Layout>
  );
};

export default ReservationsPage;
