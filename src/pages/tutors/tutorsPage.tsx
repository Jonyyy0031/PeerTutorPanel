import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Tutor } from "../../shared/models/tutor.types";

import LoadingSpinner from "../../shared/components/LoadingSpinner";
import TutorStats from "./components/tutorStats";
import TutorTable from "./components/tutorTable";

import { useApi } from "../../shared/hooks/useApi";
import { ApiService } from "../../services/api.services";

import CreateTutorModal from "./components/modals/createTutor";

const TutorsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api"),
    []
  );

  const { fetchAll, create, update, remove, list, loading } = useApi<Tutor>(
    apiService,
    "/tutors"
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCreate = async (tutor: Partial<Tutor>) => {
    await create(tutor);
    setIsCreateModalOpen(false);
  };
  const handleEdit = async (tutor: Tutor) => {
    // @ts-ignore
    await update(tutor.tutorData.id, tutor);
  };
  const handleDelete = async (tutor: Tutor) => {
    await remove(tutor.id);
  };

  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Tutores</h1>
          <button
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
          >
            {loading ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <Plus size={20} />
            )}
            Nuevo Tutor
          </button>
        </div>

        <TutorStats tutors={list} />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <TutorTable
            tutors={list}
            isLoading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {isCreateModalOpen && (
            <CreateTutorModal
              onClose={() => setIsCreateModalOpen(false)}
              onCreate={handleCreate}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default TutorsPage;
