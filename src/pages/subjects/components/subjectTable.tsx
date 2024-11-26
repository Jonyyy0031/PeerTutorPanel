import React, { Fragment, useState } from "react";
import {
  Book,
  Search,
  Filter,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";

import { Subject } from "../../../shared/models/subject.types";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Pagination from "../../../shared/components/pagination";
import TableSkeleton from "../../../shared/components/TableSkeleton";

import { useSearch } from "../../../shared/hooks/useSearch";
import { usePagination } from "../../../shared/hooks/usePagination";

import EditSubjectModal from "./modals/editSubject";
import DeleteSubjectModal from "./modals/deleteSubject";
import { useNotificationContext } from "../../../shared/context/notificationContext";
import { EmptyState } from "../../../shared/components/empty";

const ITEMS_PER_PAGE: number = 5;

interface SubjectTableProps {
  subjects: Subject[];
  isLoading?: boolean;
  onEdit: (subject: Subject) => Promise<void>;
  onDelete: (subject: Subject) => Promise<void>;
}

const SubjectTable: React.FC<SubjectTableProps> = ({
  subjects,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const { showNotification } = useNotificationContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: subjects,
    searchableFields: ["subject_name", "department"],
  });

  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    setCurrentPage,
  } = usePagination({
    items: filteredItems,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = async (subject: Subject) => {
    try {
      await onEdit(subject);
      setIsEditModalOpen(false);
      showNotification("success", "Materia actualizada exitosamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  const handleDelete = async (subject: Subject) => {
    try {
      await onDelete(subject);
      setIsDeleteModalOpen(false);
      showNotification("success", "Materia eliminada exitosamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  if (subjects.length === 0 && !isLoading) {
    return (
      <EmptyState title="Materias" message="No hay materias disponibles" />
    );
  }

  return (
    <Fragment>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="relative max-w-md w-full">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
                placeholder="Buscar materia..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all duration-200">
              <Filter className="h-4 w-4" />
              Filtros
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departamento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <TableSkeleton />
                  </td>
                </tr>
              ) : (
                paginatedItems.map((subject: Subject) => (
                  <tr
                    key={subject.id}
                    className="group hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Book className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm font-medium text-gray-900">
                          {subject.subject_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {subject.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subject.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {subject.status === "active" ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedSubject(subject);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                        >
                          {isLoading ? (
                            <LoadingSpinner
                              size="sm"
                              className="text-primary"
                            />
                          ) : (
                            <Pencil className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSubject(subject);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-gray-500 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <LoadingSpinner
                              size="sm"
                              className="text-red-600"
                            />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isEditModalOpen && (
        <EditSubjectModal
          subject={selectedSubject!}
          onEdit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteSubjectModal
          subject={selectedSubject!}
          onDelete={handleDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          loading={isLoading}
        />
      )}
    </Fragment>
  );
};

export default SubjectTable;
