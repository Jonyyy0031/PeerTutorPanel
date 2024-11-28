import React, { useEffect, useMemo } from "react";
import { Card } from "../../../shared/components/card";
import { BookOpen, ClipboardList, Users } from "lucide-react";
import { ApiService } from "../../../services/api.services";
import { useApi } from "../../../shared/hooks/useApi";
import { Tutor } from "../../../shared/models/tutor.types";
import { Subject } from "../../../shared/models/subject.types";

const HomeStats: React.FC = () => {
  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api/admin"),
    []
  );

  const { fetchAll: fetchTutors, list: tutors } = useApi<Tutor>(
    apiService,
    "/tutors"
  );
  const { fetchAll: fetchSubjects, list: subjects } = useApi<Subject>(
    apiService,
    "/subjects"
  );

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([fetchTutors(), fetchSubjects()]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchAllData();
  }, [fetchTutors, fetchSubjects]);

  const totalTutors = tutors.length;
  const totalSubjects = subjects.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Total de tutores"
        value={totalTutors}
        description="Registrados actualmente"
        icon={Users}
      />
      <Card
        title="Total de materias"
        value={totalSubjects}
        description="Registradas actualmente"
        icon={BookOpen}
      />
      <Card
        title="Registros"
        value={1}
        description="Usuarios con asignaciones actuales"
        icon={ClipboardList}
      />
    </div>
  );
};

export default HomeStats;
