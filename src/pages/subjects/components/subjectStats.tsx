import React from "react";
import { CardStat } from "../../../shared/components/cardStats";
import { Subject } from "../../../shared/models/subject.types";

interface SubjectStatsProps {
  subjects: Subject[];
}

const SubjectStats: React.FC<SubjectStatsProps> = ({ subjects } ) => {

    const total = subjects.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardStat
        title="Total de Materias"
        value={total}
        description="Materias registradas"
      />
      <CardStat
        title="Materias Activas"
        value={13}
        description="Materias disponibles para asignar a un tutor"
      />
    </div>
  );
};

export default SubjectStats;