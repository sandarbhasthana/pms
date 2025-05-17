
import React from "react";
import { useReports } from "./ReportContext";
import { ReportParameters } from "./ReportParameters";
import { ReportOutput } from "./ReportOutput";

export function ReportsContent() {
  const { selectedReport, isReportGenerated } = useReports();

  return (
    <div className="flex-1 p-6 overflow-auto">
      {selectedReport ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-pms-purple">{selectedReport.name}</h1>
            <p className="text-muted-foreground mt-1">{selectedReport.description}</p>
          </div>
          
          <ReportParameters />
          
          {isReportGenerated && <ReportOutput />}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
          <div className="max-w-md">
            <h3 className="text-2xl font-medium mb-2">Select a Report</h3>
            <p>Choose a report category and specific report from the sidebar to begin.</p>
          </div>
        </div>
      )}
    </div>
  );
}
