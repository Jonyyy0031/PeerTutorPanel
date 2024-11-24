import React from "react";
import { Card } from "../../../shared/components/card";
import { Subject } from "../../../shared/models/subject.types";
import { Activity, BookOpen } from "lucide-react";

interface SubjectStatsProps {
  subjects: Subject[];
}

const SubjectStats: React.FC<SubjectStatsProps> = ({ subjects }) => {
  const total = subjects.length;
  const totalActive = subjects.filter(
    (subject) => subject.status === "active"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total de Materias"
        value={total}
        description="Materias registradas"
        icon={BookOpen}
      />
      <Card
        title="Materias Activas"
        value={totalActive}
        description="Materias disponibles para asignar a un tutor"
        icon={Activity}
      />
    </div>
  );
};

export default SubjectStats;
