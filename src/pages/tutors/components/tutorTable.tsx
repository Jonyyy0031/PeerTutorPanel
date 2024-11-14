import React, { Fragment } from "react";
import { MoreVertical, Mail, Phone, Filter, Search } from "lucide-react";
import { useSearch } from "../../../shared/hooks/useSearch";
import { usePagination } from "../../../shared/hooks/usePagination";
import Pagination from "../../../shared/components/pagination";

const tutors = [
  {
    id: 1,
    name: "Dr. Juan Pérez",
    email: "juan.perez@upqroo.edu.mx",
    phone: "998-123-4567",
    department: "Ingeniería",
    status: "Activo",
    students: 15,
  },
  {
    id: 2,
    name: "Dra. María García",
    email: "maria.garcia@upqroo.edu.mx",
    phone: "998-234-5678",
    department: "Ciencias",
    status: "Activo",
    students: 12,
  },
  {
    id: 3,
    name: "Dr. Roberto López",
    email: "roberto.lopez@upqroo.edu.mx",
    phone: "998-345-6789",
    department: "Tecnología",
    status: "Inactivo",
    students: 0,
  },
  {
    id: 4,
    name: "Dr. Roberto López",
    email: "roberto.lopez@upqroo.edu.mx",
    phone: "998-345-6789",
    department: "Tecnología",
    status: "Inactivo",
    students: 0,
  },
  {
    id: 5,
    name: "Dr. Roberto López",
    email: "roberto.lopez@upqroo.edu.mx",
    phone: "998-345-6789",
    department: "Tecnología",
    status: "Inactivo",
    students: 0,
  },
  {
    id: 6,
    name: "Dr. Roberto López",
    email: "roberto.lopez@upqroo.edu.mx",
    phone: "998-345-6789",
    department: "Tecnología",
    status: "Inactivo",
    students: 0,
  },
  {
    id: 7,
    name: "Dr. Roberto López",
    email: "roberto.lopez@upqroo.edu.mx",
    phone: "998-345-6789",
    department: "Tecnología",
    status: "Inactivo",
    students: 0,
  },
];

const ITEMS_PER_PAGE: number = 5;

const TutorTable: React.FC = () => {
  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: tutors,
    searchableFields: ["name", "email", "phone"],
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
                Tutor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((tutor) => (
              <tr key={tutor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {tutor.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>{tutor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="h-4 w-4" />
                      <span>{tutor.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {tutor.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tutor.status === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tutor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
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

export default TutorTable;
