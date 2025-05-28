import React, { Fragment, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CreateSubjectModal from "./components/modals/createSubject";
import SubjectStats from "./components/subjectStats";
import SubjectTable from "./components/subjectTable";

import { CreateSubjectDTO, Subject } from "../../shared/models/subject.types";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

import { useApi } from "../../shared/hooks/useApi";
import { useNotificationContext } from "../../shared/context/notificationContext";
import { useAdminApiService } from "../../shared/hooks/useAdminAPI";

const subjectsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showNotification } = useNotificationContext();

  const apiService = useAdminApiService();
  const { fetchAll, create, update, remove, list, loading } = useApi<Subject>(
    apiService,
    "/subjects"
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCreate = async (subject: CreateSubjectDTO) => {
    try {
      await create(subject);
      setIsCreateModalOpen(false);
      showNotification("success", "Se ha creado el materia con éxito");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  const handleEdit = async (subject: Subject) => {
    await update(subject.id, subject);
  };

  const handleDelete = async (subject: Subject) => {
    await remove(subject.id);
  };

  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Materias</h1>
          <button
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
          >
            {loading ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <Plus size={20} />
            )}
            Nueva Materia
          </button>
        </div>

        <SubjectStats subjects={list} />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <SubjectTable
            subjects={list}
            isLoading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {isCreateModalOpen && (
            <CreateSubjectModal
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

export default subjectsPage;
