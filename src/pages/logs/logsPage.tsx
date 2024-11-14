import React, { Fragment } from "react";
import LogsTable from "./components/logsTable";
import LogsStats from "./components/logsStats";

const LogsPage: React.FC = () => {
  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Registros</h1>
        </div>

        <LogsStats />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <LogsTable />
        </div>
      </div>
    </Fragment>
  );
}

export default LogsPage;