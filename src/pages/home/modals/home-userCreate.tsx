import React, { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Select, { SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

import { Role, User } from "../../../shared/models/user.types";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import FormField from "../../../shared/components/formField";
import {
  validateEmail,
  validateNameWithNumbers,
} from "../../../shared/helpers/validators";
import { useApi } from "../../../shared/hooks/useApi";
import { ApiService } from "../../../services/api.services";

interface HomeUserCreateModalProps {
  onCreate: (user: Partial<User>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean | undefined;
}

interface RoleOption {
  value: number;
  label: string;
}

const HomeUserCreateModal: React.FC<HomeUserCreateModalProps> = ({
  onClose,
  onCreate,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api"),
    []
  );

  const { fetchAll, list, loading } = useApi<Role>(apiService, "/roles");

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const options = useMemo(() => {
    return list.map((role) => ({
      value: role.id,
      label: role.roleName,
    }));
  }, [list]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });
    setErrors({
      ...errors,
      name: validateNameWithNumbers(value) ? "" : "Nombre inválido",
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setErrors({
      ...errors,
      email: validateEmail(value) ? "" : "Correo electrónico inválido",
    });
  };

  const handleRolesChange = (
    option: SingleValue<{ value: number; label: string }>
  ) => {
    setFormData({
      ...formData,
      role_id: option!.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Nuevo Usuario</h2>
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
              label="Nombre"
              value={formData.name}
              onChange={handleNameChange}
              disabled={isLoading}
              error={errors.name}
            />

            <FormField
              label="Email"
              value={formData.email}
              onChange={handleEmailChange}
              disabled={isLoading}
              error={errors.email}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <Select<RoleOption>
                options={options}
                onChange={handleRolesChange}
                isLoading={loading}
                isDisabled={isLoading || loading}
                className="mt-1"
                classNamePrefix="select"
                loadingMessage={() => "Cargando..."}
                placeholder={loading ? "Cargando..." : "Seleccione el rol..."}
                components={makeAnimated()}
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
                  valueContainer: (provided) => ({
                    ...provided,
                    overflow: "auto",
                    maxHeight: "3rem",
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
              {errors.role && (
                <p className="mt-2 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            <FormField
              label="Contraseña"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
              error={errors.password}
            />
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
                <span>Crear Usuario</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeUserCreateModal;
