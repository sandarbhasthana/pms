
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { LostFoundManager } from "@/components/lost-found/LostFoundManager";

export default function LostFoundPage() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Lost & Found Management</h1>
        <LostFoundManager />
      </div>
    </Layout>
  );
}
