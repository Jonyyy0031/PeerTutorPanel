import React, { Fragment, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";

import SubjectStats from "./components/subjectStats";
import SubjectTable from "./components/subjectTable";

import { Subject } from "../../shared/models/subject.types";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

import { useApi } from "../../shared/hooks/useApi";
import { ApiService } from "../../services/api.services";

const subjectsPage: React.FC = () => {

  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api"),
    []
  );
  const { fetchAll, list, loading } = useApi<Subject>(
    apiService,
    "/subjects"
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);
  console.log(list);

  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Materias</h1>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors">
          {loading ? (
            <LoadingSpinner size="sm" className="text-white" />
          ) : (
            <Plus size={20} />
          )}
            Nuevo Tutor
          </button>
        </div>

        <SubjectStats subjects={list} />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <SubjectTable subjects={list} isLoading={loading} />
        </div>
      </div>
    </Fragment>
  );
};

export default subjectsPage;
