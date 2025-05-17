
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, FileDown, Printer, Mail, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useReports } from "./ReportContext";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

export function ReportParameters() {
  const { 
    selectedReport, 
    reportParameters, 
    updateParameter, 
    generateReport,
    isGenerating,
    isReportGenerated
  } = useReports();
  
  if (!selectedReport) return null;

  const handleExport = (type: 'pdf' | 'excel') => {
    toast({
      title: "Export Started",
      description: `Your report is being exported as ${type.toUpperCase()}.`
    });
  };

  const handlePrint = () => {
    toast({
      title: "Preparing Print View",
      description: "Opening print dialog..."
    });
  };

  const handleSchedule = () => {
    toast({
      title: "Report Scheduled",
      description: "This report will be delivered to your email daily."
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Report Parameters</h3>
        
        <div className="space-y-4">
          {selectedReport.parameters.map((param) => (
            <div key={param.id} className="space-y-2">
              <Label htmlFor={param.id}>{param.name}</Label>
              
              {param.type === "date" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reportParameters[param.id] 
                        ? format(reportParameters[param.id], "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={reportParameters[param.id]}
                      onSelect={(date) => updateParameter(param.id, date)}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              )}
              
              {param.type === "daterange" && (
                <div className="flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportParameters[param.id]?.from 
                          ? format(reportParameters[param.id].from, "PPP")
                          : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={reportParameters[param.id]?.from}
                        onSelect={(date) => 
                          updateParameter(param.id, { 
                            ...reportParameters[param.id],
                            from: date
                          })
                        }
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <span>to</span>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reportParameters[param.id]?.to 
                          ? format(reportParameters[param.id].to, "PPP")
                          : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={reportParameters[param.id]?.to}
                        onSelect={(date) => 
                          updateParameter(param.id, { 
                            ...reportParameters[param.id],
                            to: date
                          })
                        }
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {param.type === "select" && (
                <Select
                  value={reportParameters[param.id]}
                  onValueChange={(value) => updateParameter(param.id, value)}
                >
                  <SelectTrigger id={param.id} className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {param.options?.map(option => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {param.type === "multiselect" && (
                <div className="space-y-2 border rounded-md p-3">
                  {param.options?.map(option => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${param.id}-${option.value}`}
                        checked={
                          Array.isArray(reportParameters[param.id]) && 
                          reportParameters[param.id].includes(option.value)
                        }
                        onCheckedChange={(checked) => {
                          const currentValues = Array.isArray(reportParameters[param.id]) 
                            ? [...reportParameters[param.id]] 
                            : [];
                            
                          if (checked) {
                            if (option.value === "all") {
                              updateParameter(
                                param.id,
                                param.options?.map(o => o.value) || []
                              );
                            } else {
                              updateParameter(
                                param.id,
                                [...currentValues, option.value].filter(v => v !== "all")
                              );
                            }
                          } else {
                            if (option.value === "all") {
                              updateParameter(param.id, []);
                            } else {
                              updateParameter(
                                param.id,
                                currentValues.filter(v => v !== option.value && v !== "all")
                              );
                            }
                          }
                        }}
                      />
                      <Label htmlFor={`${param.id}-${option.value}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
              
              {param.type === "text" && (
                <Input 
                  id={param.id}
                  value={reportParameters[param.id] || ""}
                  onChange={(e) => updateParameter(param.id, e.target.value)}
                />
              )}
              
              {param.type === "number" && (
                <Input 
                  id={param.id}
                  type="number"
                  value={reportParameters[param.id] || ""}
                  onChange={(e) => updateParameter(param.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={generateReport} disabled={isGenerating} className="bg-pms-purple hover:bg-pms-dark-purple">
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>
      
      {isReportGenerated && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleExport('pdf')}
          >
            <FileDown className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleExport('excel')}
          >
            <FileDown className="h-4 w-4" />
            <span>Export Excel</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleSchedule}
          >
            <Mail className="h-4 w-4" />
            <span>Schedule Email</span>
          </Button>
        </div>
      )}
    </div>
  );
}
