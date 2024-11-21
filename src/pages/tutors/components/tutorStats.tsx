import React from "react";
import { CardStat } from "../../../shared/components/cardStats";
import { Tutor } from "../../../shared/models/tutor.types";

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
      <CardStat
        title="Total de Tutores"
        value={total}
        description="Comparado al mes anterior"
      />
      <CardStat
        title="Tutores Activos"
        value={totalActive}
        description="Tutores con asignaciones actuales"
      />
    </div>
  );
};

export default TutorStats;
