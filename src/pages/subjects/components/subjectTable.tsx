import React from "react";
import { Book, Users, MoreVertical } from "lucide-react";

const SubjectTable: React.FC = () => {
  return (
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
              Alumnos
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
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <Book className="text-primary-600 w-5 h-5" />
                <div>
                  <p className="font-medium text-text-dark">subject</p>
                  <p className="text-sm text-text-light">Créditos: credits</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">department</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-text-light" />
                <span>students</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {status === "active" ? "Activa" : "Inactiva"}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="w-5 h-5 text-text-light" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubjectTable;