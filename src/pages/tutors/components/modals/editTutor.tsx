import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

import { Tutor } from "../../../../shared/models/tutor.types";

import LoadingSpinner from "../../../../shared/components/LoadingSpinner";

import {
  validatePhone,
  validateEmail,
  validateName,
  validateDepartment,
} from "../../../../shared/helpers/validators";
import { ApiService } from "../../../../services/api.services";
import { useApi } from "../../../../shared/hooks/useApi";
import { Subject } from "../../../../shared/models/subject.types";
import FormField from "../../../../shared/components/formField";

interface EditTutorModalProps {
  tutor: Tutor;
  onClose: () => void;
  onEdit: (tutor: Tutor) => void;
  isLoading: boolean | undefined;
}

const EditTutorModal: React.FC<EditTutorModalProps> = ({
  tutor,
  onClose,
  onEdit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    ...tutor,
    subjectIds: tutor.subjectIds.map((subject) => subject.id),
    selectedSubjects: tutor.subjectIds.map((subject) => ({
      value: subject.id,
      label: subject.subject_name,
    })),
  });
  const [errors, setErrors] = useState({
    tutor_name: "",
    department: "",
    phone: "",
    email: "",
    subjects: "",
  });
  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api/admin"),
    []
  );

  const { fetchAll, list, loading } = useApi<Subject>(apiService, "/subjects");

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const options = useMemo(() => {
    return list
      .filter((subject) => subject.status === "active")
      .map((subject) => ({
        value: subject.id,
        label: subject.subject_name,
      }));
  }, [list]);

  const handleSubjectsChange = (
    selectedOptions: MultiValue<{
      value: number | undefined;
      label: string | undefined;
    }>
  ) => {
    setFormData({
      ...formData,
      subjectIds: selectedOptions.map((option) => option.value),
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, tutor_name: value });
    setErrors({
      ...errors,
      tutor_name: validateName(value) ? "" : "Nombre inválido",
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      if (value.length > 6) {
        value =
          value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + "-" + value.slice(3);
      }
      setFormData({ ...formData, phone: value });
      setErrors({
        ...errors,
        phone: validatePhone(value) ? "" : "Formato requerido: XXX-XXX-XXXX",
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setErrors({
      ...errors,
      email: validateEmail(value) ? "" : "Correo electrónico inválido",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Formato requerido: XXX-XXX-XXXX",
      }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Correo electrónico inválido" }));
      return;
    }

    if (formData.subjectIds.length === 0) {
      setErrors((prev) => ({
        ...prev,
        subjects: "Seleccione al menos una materia",
      }));
      return;
    }

    const { selectedSubjects, subjectIds, ...tutorData } = formData;

    const body = {
      tutorData: {
        ...tutorData,
      },
      subjectIds: subjectIds,
    };
    // @ts-ignore
    onEdit(body);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Editar Tutor</h2>
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
              label="Nombre Completo"
              value={formData.tutor_name}
              onChange={handleNameChange}
              disabled={isLoading}
              error={errors.tutor_name}
            />
            <FormField
              label="Departamento"
              value={formData.department}
              onChange={handleDepartmentChange}
              disabled={isLoading}
              error={errors.department}
            />
            <FormField
              label="Correo Electrónico"
              value={formData.email}
              onChange={handleEmailChange}
              disabled={isLoading}
              error={errors.email}
            />
            <FormField
              label="Teléfono"
              value={formData.phone}
              onChange={handlePhoneChange}
              disabled={isLoading}
              error={errors.phone}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Materias
              </label>
              <Select
                isMulti
                name="subjects"
                options={options}
                defaultValue={formData.selectedSubjects}
                onChange={(selectedOptions) =>
                  handleSubjectsChange(selectedOptions)
                }
                isDisabled={isLoading || loading}
                className="mt-1"
                classNamePrefix="select"
                loadingMessage={() => "Cargando..."}
                placeholder={
                  loading ? "Cargando..." : "Seleccione las materias..."
                }
                components={makeAnimated()}
                closeMenuOnSelect={false}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#5C0000",
                    primary25: "#f8e5e5",
                  },
                })}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    borderRadius: "3px",
                    border: "1px solid #e0e0e0",
                    ":hover": {
                      borderColor: "#5C0000",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    maxHeight: "15rem",
                    overflowY: "auto",
                    borderRadius: "3px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #e0e0e0",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    borderRadius: "3px",
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    overflow: "auto",
                    maxHeight: "3rem",
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    ":hover": {
                      backgroundColor: "#5C0000",
                      color: "#fff",
                      cursor: "pointer",
                    },
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    color: "#000",
                    ":hover": {
                      color: "#8C4C4C",
                      cursor: "pointer",
                    },
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: "#000",
                    ":hover": {
                      color: "#8C4C4C",
                      cursor: "pointer",
                    },
                  }),
                }}
              />
              {errors.subjects && (
                <p className="mt-2 text-sm text-red-600">{errors.subjects}</p>
              )}
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
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                Turno
              </label>
              <select
                value={formData.shift}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shift: e.target.value as "matutino" | "vespertino",
                  })
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              >
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
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

export default EditTutorModal;
