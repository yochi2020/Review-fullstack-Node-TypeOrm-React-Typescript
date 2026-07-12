import type { ReactNode } from "react";
import { Sidebar } from "../layout/Sidebar";

type DashboardPageProps = {
  children: ReactNode;
};

export function DashboardPage({ children }: DashboardPageProps) {
  return (
    <div className="container-fluid" id="top">
      <div className="row">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
