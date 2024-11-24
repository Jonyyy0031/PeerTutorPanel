import React from "react";
import { Card } from "../../../shared/components/card";
import { Tutor } from "../../../shared/models/tutor.types";
import { Activity, Users } from "lucide-react";

interface TutorStatsProps {
  tutors: Tutor[];
}

const TutorStats: React.FC<TutorStatsProps> = ({ tutors }) => {
  const total = tutors.length;
  const totalActive = tutors.filter(
    (tutor) => tutor.status === "active"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total de Tutores"
        value={total}
        description="Comparado al mes anterior"
        icon={Users}
      />
      <Card
        title="Tutores Activos"
        value={totalActive}
        description="Tutores con asignaciones actuales"
        icon={Activity}
      />
    </div>
  );
};

export default TutorStats;
