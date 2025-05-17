
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AIAssistant } from "./AIAssistant";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="pms-layout">
      <Sidebar />
      <div className="pms-main-content">
        <Header />
        <main className="pms-page-content">
          {children}
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
