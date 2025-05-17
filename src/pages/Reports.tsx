
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ReportsSidebar } from "@/components/reports/ReportsSidebar";
import { ReportsContent } from "@/components/reports/ReportsContent";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { ReportProvider } from "@/components/reports/ReportContext";

export default function ReportsPage() {
  return (
    <Layout>
      <ReportProvider>
        <div className="flex h-full">
          <ReportsSidebar />
          <ReportsContent />
        </div>
      </ReportProvider>
      <AIAssistant />
    </Layout>
  );
}
