
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { GuestLists } from "@/components/dashboard/GuestLists";
import { RoomStatus } from "@/components/dashboard/RoomStatus";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your property management dashboard.</p>
        </div>
        
        {/* Dashboard Stats */}
        <DashboardStats />
        
        {/* Guest Lists (Arrivals, Departures, In-House) */}
        <GuestLists />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Status */}
          <RoomStatus />
          
          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
