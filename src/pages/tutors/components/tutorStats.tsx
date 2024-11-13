import React from 'react';
import { CardStat } from '../../../shared/components/cardStats';

const TutorStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardStat
        title="Total de Tutores"
        value={100}
        description="Comparado al mes anterior"
      />
      <CardStat
        title="Tutores Activos"
        value={85}
        description="Tutores con asignaciones actuales"
      />
      <CardStat
        title="Horas Asignadas"
        value={85}
        description="Total de horas este semestre"
      />
    </div>
  );
}

export default TutorStats;