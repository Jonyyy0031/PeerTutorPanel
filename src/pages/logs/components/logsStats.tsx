import React from "react";
import { CardStat } from "../../../shared/components/cardStats";

const LogsStats: React.FC = () => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardStat
                title="Total de Registros"
                value={100}
                description="Comparado al mes anterior"
            />
            <CardStat
                title="Registros Activos"
                value={85}
                description="Registros con asignaciones actuales"
            />
        </div>
    )
}

export default LogsStats;
