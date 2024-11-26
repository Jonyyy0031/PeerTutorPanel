import React, { Fragment, useState } from "react";
import {
  Mail,
  Phone,
  Filter,
  Search,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Tutor } from "../../../shared/models/tutor.types";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Pagination from "../../../shared/components/pagination";
import TableSkeleton from "../../../shared/components/TableSkeleton";
import { useSearch } from "../../../shared/hooks/useSearch";
import { usePagination } from "../../../shared/hooks/usePagination";
import EditTutorModal from "./modals/editTutor";
import DeleteTutorModal from "./modals/deleteTutor";
import { EmptyState } from "../../../shared/components/empty";
import { useNotificationContext } from "../../../shared/context/notificationContext";

interface TutorTableProps {
  tutors: Tutor[];
  isLoading?: boolean;
  onEdit: (tutor: Tutor) => Promise<void>;
  onDelete: (tutor: Tutor) => Promise<void>;
}

const ITEMS_PER_PAGE: number = 4;

const TutorTable: React.FC<TutorTableProps> = ({
  tutors,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  const {showNotification} = useNotificationContext();

  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: tutors,
    searchableFields: ["tutor_name", "email", "phone"],
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

  const handleEdit = async (tutor: Tutor) => {
    try {
      await onEdit(tutor);
      setIsEditModalOpen(false);
      showNotification("success", "Tutor actualizado correctamente");
    } catch (error: any) {
      showNotification("error", error.message);

    }
  };

  const handleDelete = async (tutor: Tutor) => {
    try {
      await onDelete(tutor);
      setIsDeleteModalOpen(false);
      showNotification("success", "Tutor eliminado correctamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  if (tutors.length === 0 && !isLoading) {
    return <EmptyState title="Tutores" message="No hay tutores disponibles" />;
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
                placeholder="Buscar tutor..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-100"
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
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Tutor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Departamento
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Materias
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Turno
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500 tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7}>
                    <TableSkeleton />
                  </td>
                </tr>
              ) : (
                paginatedItems.map((tutor) => (
                  <tr
                    key={tutor.id}
                    className="group hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {tutor.tutor_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          <span>{tutor.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          <span>{tutor.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {tutor.department}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {tutor.subjectIds.slice(0, 3).map((subject) => (
                          <span
                            key={subject.id}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-200 text-primary-700"
                          >
                            {subject.subject_name}
                          </span>
                        ))}
                        {tutor.subjectIds.length > 3 && (
                          <Tippy
                            content={tutor.subjectIds
                              .slice(3)
                              .map((subject) => subject.subject_name)
                              .join(", ")}
                            placement="bottom-start"
                            delay={[200, 0]}
                          >
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-300 text-gray-600 cursor-help">
                              +{tutor.subjectIds.length - 3} más
                            </span>
                          </Tippy>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-0.5 leading-5 rounded-full text-xs font-semibold ${
                          tutor.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {tutor.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {tutor.shift.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedTutor(tutor);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <LoadingSpinner
                              size="sm"
                              className="text-primary-600"
                            />
                          ) : (
                            <Pencil className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTutor(tutor);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isLoading}
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
        <EditTutorModal
          tutor={selectedTutor!}
          onEdit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteTutorModal
          tutor={selectedTutor!}
          onDelete={handleDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          isLoading={isLoading}
        />
      )}
    </Fragment>
  );
};

export default TutorTable;
