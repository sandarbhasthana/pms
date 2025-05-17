
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useReports } from "./ReportContext";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ReportsSidebar() {
  const { categories, selectedCategory, selectedReport, setSelectedCategory, setSelectedReport } = useReports();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const selectCategory = (category: any) => {
    setSelectedCategory(category);
    toggleCategory(category.id);
  };

  const selectReport = (report: any) => {
    setSelectedReport(report);
  };

  // Dynamic icon component
  const DynamicIcon = ({ iconName }: { iconName: string }) => {
    const IconComponent = (Icons as any)[iconName === "file-chart-line" 
      ? "FileBarChart" 
      : iconName === "file-spreadsheet" 
      ? "FileSpreadsheet" 
      : "FileText"];
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="w-64 border-r bg-sidebar h-full overflow-auto p-4 transition-all duration-300">
      <h2 className="text-xl font-bold mb-4 text-pms-purple">Reports</h2>
      
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category.id} className="border rounded-md overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => selectCategory(category)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 text-left transition-colors",
                      selectedCategory?.id === category.id 
                        ? "bg-pms-purple/10 text-pms-purple" 
                        : "hover:bg-pms-purple/5"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <DynamicIcon iconName={category.icon} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    {expandedCategories[category.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{category.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {expandedCategories[category.id] && (
              <div className="bg-background p-1 animate-accordion-down">
                {category.reports.map(report => (
                  <button
                    key={report.id}
                    onClick={() => selectReport(report)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-sm mb-1 transition-colors",
                      selectedReport?.id === report.id
                        ? "bg-pms-purple/10 text-pms-purple"
                        : "hover:bg-muted"
                    )}
                  >
                    {report.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
