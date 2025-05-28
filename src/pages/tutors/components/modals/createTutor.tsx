import React, { useEffect, useMemo } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { X } from "lucide-react";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";

import { Tutor, TutorData } from "../../../../shared/models/tutor.types";
import { Subject } from "../../../../shared/models/subject.types";
import {
  validateDepartment,
  validateEmail,
  validateName,
  validatePhone,
} from "../../../../shared/helpers/validators";
import { useApi } from "../../../../shared/hooks/useApi";
import FormField from "../../../../shared/components/formField";
import { useForm } from "../../../../shared/hooks/useForm";
import { useAdminApiService } from "../../../../shared/hooks/useAdminAPI";

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
  const apiService = useAdminApiService();
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

  const validationRules = {
    tutor_name: (value: string) =>
      !validateName(value) ? "Nombre inválido" : undefined,
    department: (value: string) =>
      !validateDepartment(value) ? "Departamento inválido" : undefined,
    email: (value: string) =>
      !validateEmail(value) ? "Correo electrónico inválido" : undefined,
    phone: (value: string) =>
      !validatePhone(value) ? "Formato requerido: XXX-XXX-XXXX" : undefined,
    subjects: (value: number[]) =>
      value.length === 0 ? "Seleccione al menos una materia" : undefined,
    status : (value: string) =>
      !value ? "El estado es requerido" : undefined,
    shift: (value: string) =>
      !value ? "El turno es requerido" : undefined,
  };

  const { formData, errors, isValid, handleChange } = useForm(
    {
      tutor_name: "",
      department: "",
      email: "",
      phone: "",
      subjects: [] as number[],
      status: "active" as "active" | "inactive",
      shift: "matutino" as "matutino" | "vespertino",
    },
    validationRules
  );


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      if (value.length > 6) {
        value =
          value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
      } else if (value.length > 3) {
        value = value.slice(0, 3) + "-" + value.slice(3);
      }
      handleChange({ target: { name: "phone", value } });
    }
  };

  const handleSubjectsChange = (
    selectedOptions: MultiValue<{ value: number; label: string }>
  ) => {
    handleChange({
      target: {
        name: "subjects",
        value: selectedOptions.map((option) => option.value),
      },
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    const body: TutorData = {
      tutorData: {
        tutor_name: formData.tutor_name,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        shift: formData.shift,
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
            <FormField
              label="Nombre Completo"
              name="tutor_name"
              value={formData.tutor_name}
              onChange={handleChange}
              disabled={isLoading}
              error={errors.tutor_name}
            />
            <FormField
              label="Departamento"
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={isLoading}
              error={errors.department}
            />
            <FormField
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              error={errors.email}
            />
            <FormField
              label="Teléfono"
              name="phone"
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
                value={options.filter((option) =>
                  formData.subjects.includes(option.value)
                )}
                onChange={handleSubjectsChange}
                isLoading={loading}
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
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                required
                disabled={isLoading}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                  Turno
                </label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent"
                  required
                  disabled={isLoading}
                >
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                </select>
              </div>
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
