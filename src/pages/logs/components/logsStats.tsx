import React from "react";
import { Card } from "../../../shared/components/card";
import { Activity, ClipboardList } from "lucide-react";

const LogsStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total de Registros"
        value={100}
        description="Comparado al mes anterior"
        icon={ClipboardList}
      />
      <Card
        title="Registros Activos"
        value={85}
        description="Registros con asignaciones actuales"
        icon={Activity}
      />
    </div>
  );
};

export default LogsStats;
