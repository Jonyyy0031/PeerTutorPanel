import React from "react";
import Sidebar from "./sidebar";
import { NotificationProvider } from "../context/notificationContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <NotificationProvider>
        <Sidebar />
        <main className="flex-1 bg-background">{children}</main>
      </NotificationProvider>
    </div>
  );
}

export default Layout;
