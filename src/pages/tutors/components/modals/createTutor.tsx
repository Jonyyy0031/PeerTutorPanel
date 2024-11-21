import React, { useEffect, useMemo, useState } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { X } from "lucide-react";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";

import { Tutor, TutorData } from "../../../../shared/models/tutor.types";
import { Subject } from "../../../../shared/models/subject.types";
import { ApiService } from "../../../../services/api.services";
import {
  validateDepartment,
  validateEmail,
  validateName,
  validatePhone,
} from "../../../../shared/helpers/validators";
import { useApi } from "../../../../shared/hooks/useApi";

interface CreateTutorModalProps {
  onClose: () => void;
  onCreate: (tutor: Partial<Tutor>) => Promise<void>;
  isLoading: boolean;
}

const CreateTutorModal: React.FC<CreateTutorModalProps> = ({
  onClose,
  onCreate,
  isLoading,
}) => {
  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api"),
    []
  );
  const { fetchAll, list } = useApi<Subject>(apiService, "/subjects");

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const options = useMemo(() => {
    return list
      .filter((subject) => subject.status === "active")
      .map((subject) => ({
        value: subject.id,
        label: subject.name,
      }));
  }, [list]);


  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    phone: "",
    subjects: [] as number[],
    status: "active" as "active" | "inactive",
  });

  const [errors, setErrors] = useState({
    name: "",
    department: "",
    phone: "",
    email: "",
    subjects: "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });
    setErrors({
      ...errors,
      name: validateName(value) ? "" : "Nombre inválido",
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

  const handleSubjectsChange = (
    selectedOptions: MultiValue<{ value: number; label: string }>
  ) => {
    setFormData({
      ...formData,
      subjects: selectedOptions.map((option) => option.value),
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

    if (formData.subjects.length === 0) {
      setErrors((prev) => ({
        ...prev,
        subjects: "Seleccione al menos una materia",
      }));
      return;
    }

    const body: TutorData = {
      tutorData: {
        name: formData.name,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
      },
      subjectIds: formData.subjects,
    };
    // @ts-ignore
    onCreate(body);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Nuevo Tutor</h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departamento
              </label>
              <input
                value={formData.department}
                onChange={handleDepartmentChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              />
              {errors.department && (
                <p className="mt-2 text-sm text-red-600">{errors.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="XXX-XXX-XXXX"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Materias
              </label>
              <Select
                isMulti
                name="subjects"
                options={options}
                value={options.filter((option) =>
                  formData.subjects.includes(option.value)
                )}
                onChange={handleSubjectsChange}
                isDisabled={isLoading}
                className="mt-1"
                classNamePrefix="select"
                placeholder="Seleccione las materias..."
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
                  <span>Creando...</span>
                </>
              ) : (
                <span>Crear Tutor</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTutorModal;
