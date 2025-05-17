
import React from "react";
import { Layout } from "@/components/layout/Layout";
import ReservationTimeline from "@/components/stay-view/ReservationTimeline";
import RoomAssignmentTools from "@/components/stay-view/RoomAssignmentTools";
import { Toaster } from "sonner";

const StayView = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Reservations Timeline</h1>
          <RoomAssignmentTools />
        </div>
        
        <ReservationTimeline />
      </div>
      <Toaster />
    </Layout>
  );
};

export default StayView;
