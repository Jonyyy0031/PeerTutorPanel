import React from "react";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}

export default Layout;
