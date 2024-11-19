import React, { Fragment, useState } from "react";
import { Book, Search, Filter, Pencil, Trash2 } from "lucide-react";


import { Subject } from "../../../shared/models/subject.types";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Pagination from "../../../shared/components/pagination";
import TableSkeleton from "../../../shared/components/TableSkeleton";

import { useSearch } from "../../../shared/hooks/useSearch";
import { usePagination } from "../../../shared/hooks/usePagination";


import EditSubjectModal from "./modals/editSubject";
import DeleteSubjectModal from "./modals/deleteSubject";


const ITEMS_PER_PAGE: number = 7;

interface SubjectTableProps {
  subjects: Subject[];
  isLoading?: boolean;
  onEdit: (subject: Subject) => Promise<void>;
  onDelete: (subject: Subject) => Promise<void>;
}

const SubjectTable: React.FC<SubjectTableProps> = ({ subjects, isLoading, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);


  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: subjects,
    searchableFields: ["name", "department"],
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
    await onEdit(subject);
    setIsEditModalOpen(false);
  };

  const handleDelete = async (subject: Subject) => {
    await onDelete(subject);
    setIsDeleteModalOpen(false);
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Buscar materia..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-5 w-5 text-gray-600" />
          Filtros
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
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
                <td colSpan={4}>
                  <TableSkeleton />
                </td>
              </tr>
            ) : (
              paginatedItems.map((subject: Subject) => (
                <tr key={subject.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Book className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {subject.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {subject.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subject.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {subject.status === "active" ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                    onClick={() => {
                      setSelectedSubject(subject);
                      setIsEditModalOpen(true);
                    }}
                    className="text-primary hover:text-primary-700 mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" className="text-primary" />
                      ) : (
                        <Pencil size={18} />
                      )}
                    </button>
                    <button
                    onClick={() => {
                      setSelectedSubject(subject);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <LoadingSpinner size="sm" className="text-red-600" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {isEditModalOpen &&   (
        <EditSubjectModal
          subject={selectedSubject!}
          onEdit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen &&   (
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
