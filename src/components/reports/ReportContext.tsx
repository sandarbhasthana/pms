
import React, { createContext, useState, useContext } from "react";
import { addDays, startOfMonth, endOfMonth, format } from "date-fns";

export type ReportCategory = {
  id: string;
  name: string;
  icon: string;
  reports: Report[];
};

export type Report = {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: ReportParameter[];
  outputType: "table" | "chart" | "both";
  chartType?: "line" | "bar" | "pie";
};

export type ReportParameter = {
  id: string;
  name: string;
  type: "date" | "daterange" | "select" | "multiselect" | "text" | "number";
  options?: { value: string; label: string }[];
  defaultValue?: any;
};

export type SelectedReport = {
  category: ReportCategory;
  report: Report;
  parameters: Record<string, any>;
};

export type ReportContextType = {
  categories: ReportCategory[];
  selectedCategory: ReportCategory | null;
  selectedReport: Report | null;
  reportParameters: Record<string, any>;
  setSelectedCategory: (category: ReportCategory | null) => void;
  setSelectedReport: (report: Report | null) => void;
  updateParameter: (parameterId: string, value: any) => void;
  generateReport: () => void;
  isGenerating: boolean;
  reportData: any;
  isReportGenerated: boolean;
};

const defaultCategories: ReportCategory[] = [
  {
    id: "reservation",
    name: "Reservation Reports",
    icon: "file-chart-line",
    reports: [
      {
        id: "arrivals-departures",
        name: "Arrivals & Departures",
        description: "Shows all expected arrivals and departures for a selected date range",
        category: "reservation",
        parameters: [
          {
            id: "dateRange",
            name: "Date Range",
            type: "daterange",
            defaultValue: {
              from: new Date(),
              to: addDays(new Date(), 7)
            }
          },
          {
            id: "roomType",
            name: "Room Type",
            type: "multiselect",
            options: [
              { value: "all", label: "All Room Types" },
              { value: "standard", label: "Standard" },
              { value: "deluxe", label: "Deluxe" },
              { value: "suite", label: "Suite" }
            ],
            defaultValue: ["all"]
          }
        ],
        outputType: "table"
      },
      {
        id: "booking-source",
        name: "Booking Source Analysis",
        description: "Analyze reservations by booking source",
        category: "reservation",
        parameters: [
          {
            id: "dateRange",
            name: "Date Range",
            type: "daterange",
            defaultValue: {
              from: startOfMonth(new Date()),
              to: endOfMonth(new Date())
            }
          }
        ],
        outputType: "both",
        chartType: "pie"
      }
    ]
  },
  {
    id: "frontoffice",
    name: "Front Office",
    icon: "file-text",
    reports: [
      {
        id: "daily-arrival-list",
        name: "Daily Arrival List",
        description: "List of all expected arrivals for today or a selected date",
        category: "frontoffice",
        parameters: [
          {
            id: "date",
            name: "Date",
            type: "date",
            defaultValue: new Date()
          }
        ],
        outputType: "table"
      },
      {
        id: "housekeeping",
        name: "Housekeeping Report",
        description: "Room cleaning status and priorities",
        category: "frontoffice",
        parameters: [
          {
            id: "date",
            name: "Date",
            type: "date",
            defaultValue: new Date()
          },
          {
            id: "status",
            name: "Status Filter",
            type: "select",
            options: [
              { value: "all", label: "All Statuses" },
              { value: "clean", label: "Clean" },
              { value: "dirty", label: "Dirty" },
              { value: "inspected", label: "Inspected" },
              { value: "outOfOrder", label: "Out of Order" }
            ],
            defaultValue: "all"
          }
        ],
        outputType: "table"
      }
    ]
  },
  {
    id: "accounting",
    name: "Back Office/Accounting",
    icon: "file-spreadsheet",
    reports: [
      {
        id: "revenue-report",
        name: "Revenue Report",
        description: "Daily, weekly, or monthly revenue breakdown",
        category: "accounting",
        parameters: [
          {
            id: "dateRange",
            name: "Date Range",
            type: "daterange",
            defaultValue: {
              from: startOfMonth(new Date()),
              to: endOfMonth(new Date())
            }
          },
          {
            id: "groupBy",
            name: "Group By",
            type: "select",
            options: [
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" }
            ],
            defaultValue: "day"
          }
        ],
        outputType: "both",
        chartType: "line"
      },
      {
        id: "daily-transactions",
        name: "Daily Transactions",
        description: "All financial transactions for a specific day",
        category: "accounting",
        parameters: [
          {
            id: "date",
            name: "Date",
            type: "date",
            defaultValue: new Date()
          },
          {
            id: "transactionType",
            name: "Transaction Type",
            type: "select",
            options: [
              { value: "all", label: "All Types" },
              { value: "room", label: "Room Charges" },
              { value: "food", label: "F&B" },
              { value: "services", label: "Additional Services" },
              { value: "payments", label: "Payments" }
            ],
            defaultValue: "all"
          }
        ],
        outputType: "table"
      }
    ]
  },
  {
    id: "nightaudit",
    name: "Night Audit",
    icon: "file-chart-line",
    reports: [
      {
        id: "daily-audit",
        name: "Daily Audit Summary",
        description: "Complete summary of daily operations for closing",
        category: "nightaudit",
        parameters: [
          {
            id: "date",
            name: "Date",
            type: "date",
            defaultValue: new Date()
          }
        ],
        outputType: "table"
      }
    ]
  },
  {
    id: "marketing",
    name: "Sales & Marketing",
    icon: "file-chart-line",
    reports: [
      {
        id: "market-segment",
        name: "Market Segment Analysis",
        description: "Bookings and revenue by market segment",
        category: "marketing",
        parameters: [
          {
            id: "dateRange",
            name: "Date Range",
            type: "daterange",
            defaultValue: {
              from: startOfMonth(new Date()),
              to: endOfMonth(new Date())
            }
          }
        ],
        outputType: "both",
        chartType: "bar"
      }
    ]
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: "file-chart-line",
    reports: [
      {
        id: "occupancy-rates",
        name: "Occupancy % by Month",
        description: "Monthly occupancy rates with year-over-year comparison",
        category: "statistics",
        parameters: [
          {
            id: "year",
            name: "Year",
            type: "select",
            options: [
              { value: "2025", label: "2025" },
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" }
            ],
            defaultValue: "2025"
          },
          {
            id: "compareWithPrevYear",
            name: "Compare with Previous Year",
            type: "select",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" }
            ],
            defaultValue: "yes"
          }
        ],
        outputType: "both",
        chartType: "line"
      },
      {
        id: "adr-revpar",
        name: "ADR & RevPAR",
        description: "Average Daily Rate and Revenue Per Available Room",
        category: "statistics",
        parameters: [
          {
            id: "dateRange",
            name: "Date Range",
            type: "daterange",
            defaultValue: {
              from: startOfMonth(new Date()),
              to: endOfMonth(new Date())
            }
          },
          {
            id: "groupBy",
            name: "Group By",
            type: "select",
            options: [
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" }
            ],
            defaultValue: "day"
          }
        ],
        outputType: "both",
        chartType: "line"
      }
    ]
  }
];

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<ReportCategory[]>(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportParameters, setReportParameters] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [isReportGenerated, setIsReportGenerated] = useState(false);

  const updateParameter = (parameterId: string, value: any) => {
    setReportParameters((prev) => ({
      ...prev,
      [parameterId]: value
    }));
  };

  const generateReport = async () => {
    if (!selectedReport) return;
    
    setIsGenerating(true);
    
    // Mock report generation - in a real application, this would fetch data from an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock data based on the report type
    let data;
    
    if (selectedReport.id === "arrivals-departures") {
      data = {
        arrivals: [
          { roomNumber: "101", guestName: "John Smith", checkIn: format(new Date(), "yyyy-MM-dd"), nights: 3 },
          { roomNumber: "205", guestName: "Maria Garcia", checkIn: format(new Date(), "yyyy-MM-dd"), nights: 2 },
          { roomNumber: "310", guestName: "David Johnson", checkIn: format(new Date(), "yyyy-MM-dd"), nights: 1 }
        ],
        departures: [
          { roomNumber: "102", guestName: "Robert Brown", checkOut: format(new Date(), "yyyy-MM-dd"), balance: "$0.00" },
          { roomNumber: "204", guestName: "Emma Wilson", checkOut: format(new Date(), "yyyy-MM-dd"), balance: "$25.50" }
        ]
      };
    } else if (selectedReport.id === "booking-source") {
      data = {
        tableData: [
          { source: "Direct Website", bookings: 45, revenue: "$12,550", percentage: "35%" },
          { source: "Booking.com", bookings: 32, revenue: "$8,960", percentage: "25%" },
          { source: "Expedia", bookings: 28, revenue: "$7,840", percentage: "22%" },
          { source: "Corporate", bookings: 15, revenue: "$4,200", percentage: "12%" },
          { source: "Other", bookings: 8, revenue: "$2,240", percentage: "6%" }
        ],
        chartData: [
          { name: "Direct Website", value: 35 },
          { name: "Booking.com", value: 25 },
          { name: "Expedia", value: 22 },
          { name: "Corporate", value: 12 },
          { name: "Other", value: 6 }
        ]
      };
    } else if (selectedReport.id === "occupancy-rates") {
      data = {
        tableData: [
          { month: "January", occupancy2025: "68%", occupancy2024: "65%", change: "+3%" },
          { month: "February", occupancy2025: "72%", occupancy2024: "71%", change: "+1%" },
          { month: "March", occupancy2025: "85%", occupancy2024: "80%", change: "+5%" },
          { month: "April", occupancy2025: "77%", occupancy2024: "75%", change: "+2%" },
          { month: "May", occupancy2025: "82%", occupancy2024: "79%", change: "+3%" }
        ],
        chartData: [
          { month: "Jan", occupancy2025: 68, occupancy2024: 65 },
          { month: "Feb", occupancy2025: 72, occupancy2024: 71 },
          { month: "Mar", occupancy2025: 85, occupancy2024: 80 },
          { month: "Apr", occupancy2025: 77, occupancy2024: 75 },
          { month: "May", occupancy2025: 82, occupancy2024: 79 }
        ]
      };
    } else if (selectedReport.id === "revenue-report") {
      data = {
        tableData: [
          { date: "2025-05-01", roomRevenue: "$5,200", fnbRevenue: "$1,800", otherRevenue: "$450", totalRevenue: "$7,450" },
          { date: "2025-05-02", roomRevenue: "$5,400", fnbRevenue: "$2,100", otherRevenue: "$380", totalRevenue: "$7,880" },
          { date: "2025-05-03", roomRevenue: "$6,100", fnbRevenue: "$2,500", otherRevenue: "$520", totalRevenue: "$9,120" },
          { date: "2025-05-04", roomRevenue: "$5,800", fnbRevenue: "$2,200", otherRevenue: "$490", totalRevenue: "$8,490" },
          { date: "2025-05-05", roomRevenue: "$4,900", fnbRevenue: "$1,700", otherRevenue: "$410", totalRevenue: "$7,010" }
        ],
        chartData: [
          { date: "05/01", roomRevenue: 5200, fnbRevenue: 1800, otherRevenue: 450 },
          { date: "05/02", roomRevenue: 5400, fnbRevenue: 2100, otherRevenue: 380 },
          { date: "05/03", roomRevenue: 6100, fnbRevenue: 2500, otherRevenue: 520 },
          { date: "05/04", roomRevenue: 5800, fnbRevenue: 2200, otherRevenue: 490 },
          { date: "05/05", roomRevenue: 4900, fnbRevenue: 1700, otherRevenue: 410 }
        ]
      };
    } else {
      // Generic mock data for other reports
      data = {
        message: "Report generated successfully",
        reportName: selectedReport.name,
        parameters: reportParameters,
        timestamp: new Date().toISOString()
      };
    }
    
    setReportData(data);
    setIsReportGenerated(true);
    setIsGenerating(false);
  };

  // Initialize default parameters when a report is selected
  React.useEffect(() => {
    if (selectedReport) {
      const defaultParams: Record<string, any> = {};
      selectedReport.parameters.forEach(param => {
        defaultParams[param.id] = param.defaultValue;
      });
      setReportParameters(defaultParams);
      setIsReportGenerated(false);
      setReportData(null);
    } else {
      setReportParameters({});
      setIsReportGenerated(false);
      setReportData(null);
    }
  }, [selectedReport]);

  return (
    <ReportContext.Provider
      value={{
        categories,
        selectedCategory,
        selectedReport,
        reportParameters,
        setSelectedCategory,
        setSelectedReport,
        updateParameter,
        generateReport,
        isGenerating,
        reportData,
        isReportGenerated
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
};
