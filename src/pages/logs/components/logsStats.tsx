import React from "react";
import { Card } from "../../../shared/components/card";
import { Activity, ClipboardList } from "lucide-react";
import { Log } from "../../../shared/models/logs.types";

interface LogsStatsProps {
  logs: Log[];
}

const LogsStats: React.FC<LogsStatsProps> = ({ logs }) => {
  const total = logs.length;
  const totalAccepted = logs.filter(
    (log) => log.status === "accepted"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total de Asesorias"
        value={total}
        description="Registradas actualmente"
        icon={ClipboardList}
      />
      <Card
        title="Asesorias Activas"
        value={totalAccepted}
        description="Aceptadas por el tutor"
        icon={Activity}
      />
    </div>
  );
};

export default LogsStats;
