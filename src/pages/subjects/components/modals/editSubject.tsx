import React, { useState } from "react";
import { X } from "lucide-react";

import { Subject } from "../../../../shared/models/subject.types";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import FormField from "../../../../shared/components/formField";
import {
  validateDepartment,
  validateNameWithNumbers,
} from "../../../../shared/helpers/validators";

interface EditSubjectModalProps {
  subject: Subject;
  onEdit: (subject: Subject) => Promise<void>;
  onClose: () => void;
  isLoading: boolean | undefined;
}

const EditSubjectModal: React.FC<EditSubjectModalProps> = ({
  subject,
  onClose,
  onEdit,
  isLoading,
}) => {
  const [formData, setFormData] = useState(subject);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(formData);
  };

  const [errors, setErrors] = useState({
    subject_name: "",
    department: "",
    status: "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, subject_name: value });
    setErrors({
      ...errors,
      subject_name: validateNameWithNumbers(value) ? "" : "Nombre inválido",
    });
  };
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, department: value });
    setErrors({
      ...errors,
      department: validateDepartment(value) ? "" : "Departamento inválido",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-text-dark">
            Editar Materia
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-text-light hover:text-text-dark disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <FormField
              label="Nombre de la Materia"
              value={formData.subject_name}
              onChange={handleNameChange}
              disabled={isLoading}
              error={errors.subject_name}
            />
            <FormField
              label="Departamento"
              value={formData.department}
              onChange={handleDepartmentChange}
              disabled={isLoading}
              error={errors.department}
            />
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              >
                <option value="active">Activa</option>
                <option value="inactive">Inactiva</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-text-light hover:text-text-dark transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-700 transition-colors disabled:opacity-50 min-w-[120px]"
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

export default EditSubjectModal;
