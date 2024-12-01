import React, { useState } from "react";
import { X } from "lucide-react";
import { Log } from "../../../../shared/models/logs.types";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import FormField from "../../../../shared/components/formField";
import {
  validateGroup,
  validateName,
} from "../../../../shared/helpers/validators";

interface EditLogModalProps {
  log: Log;
  onClose: () => void;
  onEdit: (log: Log) => void;
  isLoading?: boolean;
}

const EditLogModal: React.FC<EditLogModalProps> = ({
  log,
  onClose,
  onEdit,
  isLoading,
}) => {
  const [formData, setFormData] = useState(log);
  const [error, setError] = useState({
    student_name: "",
    student_group: "",
    day_of_week: "",
    hour: "",
    status: "",
  });

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = [
    "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
  ];

  const handleNameStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, student_name: e.target.value });
    setError({
      ...error,
      student_name: validateName(e.target.value)
        ? ""
        : "El nombre del estudiante no es válido",
    });
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, student_group: e.target.value });
    setError({
      ...error,
      student_group: validateGroup(e.target.value)
        ? ""
        : "El grupo no es válido",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
        id: formData.id,
        student_name: formData.student_name,
        student_group: formData.student_group,
        tutor_id: formData.tutor_id,
        subject_id: formData.subject_id,
        schedules: {
            day_of_week: formData.day_of_week,
            hour: formData.hour
        },
        status: formData.status,
    }
    //@ts-ignore
    onEdit(body);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Editar Registro
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <FormField
              label="Nombre del Estudiante"
              value={formData.student_name}
              onChange={handleNameStudentChange}
              disabled={isLoading}
              error={error.student_name}
            />

            <FormField
              label="Grupo"
              value={formData.student_group}
              onChange={handleGroupChange}
              disabled={isLoading}
              error={error.student_group}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Día de la Semana
              </label>
              <select
                value={formData.day_of_week}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    day_of_week: e.target.value as Log["day_of_week"],
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                disabled={isLoading}
              >
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora
              </label>
              <select
                value={formData.hour}
                onChange={(e) =>
                  setFormData({ ...formData, hour: e.target.value })
                }
                className=" w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                disabled={isLoading}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time.substring(0, 5)} hrs
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as
                      | "pending"
                      | "accepted"
                      | "cancelled",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                disabled={isLoading}
              >
                <option value="pending">Pendiente</option>
                <option value="accepted">Aceptado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors disabled:opacity-50 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="text-white" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>Guardar Cambios</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLogModal;
