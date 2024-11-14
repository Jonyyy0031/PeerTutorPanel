import React, { Fragment } from "react";
import { Book, MoreVertical, Search, Filter } from "lucide-react";
import { useSearch } from "../../../shared/hooks/useSearch";
import { Subject } from "../../../shared/models/subject";
import Pagination from "../../../shared/components/pagination";
import { usePagination } from "../../../shared/hooks/usePagination";

const registrosMock: Subject[] = [
  {
    id_subject: 1,
    name: "Mathematics",
    department: "Science",
  },
  {
    id_subject: 2,
    name: "History",
    department: "Arts",
  },
  {
    id_subject: 3,
    name: "Biology",
    department: "Science",
  },
  {
    id_subject: 4,
    name: "Literature",
    department: "Arts",
  },
  {
    id_subject: 5,
    name: "Physics",
    department: "Science",
  },
  {
    id_subject: 6,
    name: "Physics",
    department: "Science",
  },
  {
    id_subject: 7,
    name: "Physics",
    department: "Science",
  },
  {
    id_subject: 8,
    name: "Physics",
    department: "Science",
  },
];

const ITEMS_PER_PAGE: number = 5;

const SubjectTable: React.FC = () => {
  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: registrosMock,
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

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Buscar tutor..."
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
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((subject: Subject) => (
              <tr key={subject.id_subject}>
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Fragment>
  );
};

export default SubjectTable;
