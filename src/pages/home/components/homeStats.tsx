import React, { useEffect } from "react";
import { Card } from "../../../shared/components/card";
import { BookOpen, ClipboardList, Users } from "lucide-react";
import { useApi } from "../../../shared/hooks/useApi";
import { Tutor } from "../../../shared/models/tutor.types";
import { Subject } from "../../../shared/models/subject.types";
import { Log } from "../../../shared/models/logs.types";
import { useAdminApiService } from "../../../shared/hooks/useAdminAPI";

const HomeStats: React.FC = () => {
  const apiService = useAdminApiService();

  const { fetchAll: fetchTutors, list: tutors } = useApi<Tutor>(
    apiService,
    "/tutors"
  );
  const { fetchAll: fetchSubjects, list: subjects } = useApi<Subject>(
    apiService,
    "/subjects"
  );

  const { fetchAll: fetchLogs,  list: logs } = useApi<Log>(
    apiService,
    "/logs"
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchTutors(), fetchSubjects(), fetchLogs()]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllData();
  }, [fetchTutors, fetchSubjects, fetchLogs]);

  const totalTutors = tutors.filter((tutor) => tutor.status === "active").length;
  const totalSubjects = subjects.filter((subject) => subject.status === "active").length;
  const totalLogs = logs.filter((log) => log.status === "accepted").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total de tutores"
        value={totalTutors}
        description="Activos actualmente"
        icon={Users}
      />
      <Card
        title="Total de materias"
        value={totalSubjects}
        description="Activas actualmente"
        icon={BookOpen}
      />
      <Card
        title="Asesorias programadas"
        value={totalLogs}
        description="Registradas actualmente"
        icon={ClipboardList}
      />
    </div>
  );
};

export default HomeStats;
