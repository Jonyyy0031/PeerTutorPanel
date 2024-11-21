import React, { Fragment } from "react";
import { X, AlertTriangle } from "lucide-react";

import LoadingSpinner from "../../../../shared/components/LoadingSpinner";

import { Tutor } from "../../../../shared/models/tutor.types";

interface DeleteTutorModalProps {
  tutor: Tutor;
  isLoading?: boolean;
  onDelete: (tutor: Tutor) => void;
  onClose: () => void;
}

const DeleteTutorModal: React.FC<DeleteTutorModalProps> = ({
  tutor,
  onClose,
  onDelete,
  isLoading,
}) => {
  const handleDelete = async () => {
    onDelete(tutor);
  };

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Eliminar Tutor
            </h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <p className="text-center text-gray-900 mb-4">
              ¿Estás seguro que deseas eliminar al tutor{" "}
              <strong>{tutor.name}</strong>?
            </p>

            <p className="text-center text-gray-500 text-sm mb-6">
              Esta acción no se puede deshacer y eliminará todos los registros
              asociados a este tutor.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="text-white" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  <span>Eliminar</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteTutorModal;
