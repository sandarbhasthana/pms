
import React from "react";
import { useReports } from "./ReportContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export function ReportOutput() {
  const { selectedReport, reportData } = useReports();

  if (!selectedReport || !reportData) {
    return null;
  }

  const renderTable = () => {
    if (selectedReport.id === "arrivals-departures") {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Arrivals</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Check-in Date</TableHead>
                  <TableHead>Nights</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.arrivals.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.roomNumber}</TableCell>
                    <TableCell>{row.guestName}</TableCell>
                    <TableCell>{row.checkIn}</TableCell>
                    <TableCell>{row.nights}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Departures</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Check-out Date</TableHead>
                  <TableHead>Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.departures.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.roomNumber}</TableCell>
                    <TableCell>{row.guestName}</TableCell>
                    <TableCell>{row.checkOut}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }

    // For other reports with standard tableData format
    if (reportData.tableData) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(reportData.tableData[0]).map((key) => (
                <TableHead key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.tableData.map((row: any, index: number) => (
              <TableRow key={index}>
                {Object.values(row).map((value: any, i: number) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    return null;
  };

  const renderChart = () => {
    if (!reportData.chartData) return null;

    const COLORS = [
      '#8b5cf6', '#7e69ab', '#9b87f5', '#d6bcfa', '#d3e4fd', 
      '#f97316', '#1a1f2c', '#6c5ce7', '#00b894', '#e84393'
    ];

    switch (selectedReport.chartType) {
      case 'line':
        if (selectedReport.id === "occupancy-rates") {
          return (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={reportData.chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="occupancy2025" stroke="#8b5cf6" name="2025 Occupancy %" />
                  <Line type="monotone" dataKey="occupancy2024" stroke="#d3e4fd" name="2024 Occupancy %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        } else if (selectedReport.id === "revenue-report") {
          return (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={reportData.chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="roomRevenue" stroke="#8b5cf6" name="Room Revenue" />
                  <Line type="monotone" dataKey="fnbRevenue" stroke="#7e69ab" name="F&B Revenue" />
                  <Line type="monotone" dataKey="otherRevenue" stroke="#d6bcfa" name="Other Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        }
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={reportData.chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'bar':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData.chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'pie':
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportData.chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {reportData.chartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-6">
      <h2 className="text-lg font-medium border-b pb-2">Report Output</h2>

      {/* Table Output */}
      {(selectedReport.outputType === 'table' || selectedReport.outputType === 'both') && (
        <div className="overflow-x-auto">
          {renderTable()}
        </div>
      )}

      {/* Chart Output */}
      {(selectedReport.outputType === 'chart' || selectedReport.outputType === 'both') && (
        <div className="mt-6">
          {renderChart()}
        </div>
      )}
    </div>
  );
}
