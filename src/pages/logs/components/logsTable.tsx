import React, { Fragment } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Pagination from "../../../shared/components/pagination";
import { useSearch } from "../../../shared/hooks/useSearch";
import { usePagination } from "../../../shared/hooks/usePagination";
import { Filter, Search } from "lucide-react";

const registrosMock = [
  {
    id: 1,
    nombreCompleto: "Ana María López",
    grupo: "3°A",
    tutor: "Dr. Juan Pérez",
    materia: "Matemáticas",
    horario: "2024-03-15T14:30",
    estado: "Pendiente",
  },
  {
    id: 2,
    nombreCompleto: "Carlos Ramírez",
    grupo: "2°B",
    tutor: "Dra. María García",
    materia: "Física",
    horario: "2024-03-16T10:00",
    estado: "Confirmado",
  },
  {
    id: 3,
    nombreCompleto: "Diana Martínez",
    grupo: "4°A",
    tutor: "Dr. Roberto López",
    materia: "Programación",
    horario: "2024-03-17T11:30",
    estado: "Pendiente",
  },
  {
    id: 4,
    nombreCompleto: "Eduardo Torres",
    grupo: "1°C",
    tutor: "Dr. Juan Pérez",
    materia: "Matemáticas",
    horario: "2024-03-18T09:00",
    estado: "Confirmado",
  },
  {
    id: 5,
    nombreCompleto: "Fernanda Sánchez",
    grupo: "2°A",
    tutor: "Dra. María García",
    materia: "Física",
    horario: "2024-03-18T13:00",
    estado: "Pendiente",
  },
  {
    id: 6,
    nombreCompleto: "Gabriel Hernández",
    grupo: "3°B",
    tutor: "Dr. Roberto López",
    materia: "Programación",
    horario: "2024-03-19T15:30",
    estado: "Confirmado",
  },
  {
    id: 7,
    nombreCompleto: "Helena Flores",
    grupo: "4°C",
    tutor: "Dr. Juan Pérez",
    materia: "Matemáticas",
    horario: "2024-03-20T10:30",
    estado: "Pendiente",
  },
  {
    id: 8,
    nombreCompleto: "Iván González",
    grupo: "1°A",
    tutor: "Dra. María García",
    materia: "Física",
    horario: "2024-03-21T12:00",
    estado: "Confirmado",
  },
];

const ITEMS_PER_PAGE = 5;

const logsTable: React.FC = () => {
  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: registrosMock,
    searchableFields: ["nombreCompleto", "grupo", "tutor", "materia"],
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
            placeholder="Buscar registro..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Estudiante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Grupo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Tutor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Materia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Horario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedItems.map((registro) => (
              <tr key={registro.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-dark">
                    {registro.nombreCompleto}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-light">
                    {registro.grupo}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-light">
                    {registro.tutor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-light">
                    {registro.materia}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-light">
                    {format(new Date(registro.horario), "d 'de' MMMM, HH:mm", {
                      locale: es,
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-6 font-semibold rounded-full ${
                      registro.estado === "Confirmado"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {registro.estado}
                  </span>
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

export default logsTable;
