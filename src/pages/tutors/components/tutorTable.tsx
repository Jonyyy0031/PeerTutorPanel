import React from 'react';
import { MoreVertical, Mail, Phone } from 'lucide-react';

const tutors = [
  {
    id: 1,
    name: 'Dr. Juan Pérez',
    email: 'juan.perez@upqroo.edu.mx',
    phone: '998-123-4567',
    department: 'Ingeniería',
    status: 'Activo',
    students: 15,
  },
  {
    id: 2,
    name: 'Dra. María García',
    email: 'maria.garcia@upqroo.edu.mx',
    phone: '998-234-5678',
    department: 'Ciencias',
    status: 'Activo',
    students: 12,
  },
  {
    id: 3,
    name: 'Dr. Roberto López',
    email: 'roberto.lopez@upqroo.edu.mx',
    phone: '998-345-6789',
    department: 'Tecnología',
    status: 'Inactivo',
    students: 0,
  },
];

const TutorTable: React.FC = () => {
  return (
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
              Alumnos
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tutors.map((tutor) => (
            <tr key={tutor.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{tutor.name}</div>
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
                <div className="text-sm text-gray-900">{tutor.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  tutor.status === 'Activo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {tutor.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {tutor.students}
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
  );
}

export default TutorTable;