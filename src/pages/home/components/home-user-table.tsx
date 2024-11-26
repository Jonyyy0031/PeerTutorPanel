import React from "react";

import { User } from "../../../shared/models/user.types";

import TableSkeleton from "../../../shared/components/TableSkeleton";
import Pagination from "../../../shared/components/pagination";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

import { useSearch } from "../../../shared/hooks/useSearch";
import { usePagination } from "../../../shared/hooks/usePagination";

import { useNotificationContext } from "../../../shared/context/notificationContext";
import {
  ChevronDown,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import HomeUserCreateModal from "../modals/home-userCreate";
import { EmptyState } from "../../../shared/components/empty";
import HomeUserEditModal from "../modals/home-userEdit";
import HomeUserDeleteModal from "../modals/home-userDelete";

const ITEMS_PER_PAGE: number = 4;

interface HomeUserTableProps {
  users: User[];
  isLoading?: boolean;
  onCreate: (user: Partial<User>) => Promise<void>;
  onEdit: (user: User) => Promise<void>;
  onDelete: (user: User) => Promise<void>;
}

const HomeUserTable: React.FC<HomeUserTableProps> = ({
  users,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
}) => {
  const { showNotification } = useNotificationContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const { searchTerm, filteredItems, handleSearch } = useSearch({
    items: users,
    searchableFields: ["user_name", "email", "roleName"],
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

  const handleCreate = async (user: Partial<User>) => {
    try {
      await onCreate(user);
      setIsCreateModalOpen(false);
      showNotification("success", "Usuario creado exitosamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  const handleEdit = async (user: User) => {
    try {
      await onEdit(user);
      setIsEditModalOpen(false);
      showNotification("success", "Editado exitosamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  const handleDelete = async (user: User) => {
    try {
      await onDelete(user);
      setIsDeleteModalOpen(false);
      showNotification("success", "Eliminado exitosamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  if (users.length === 0 && !isLoading) {
    return (
      <EmptyState
        title="Usuarios"
        message="No hay usuarios disponibles"
        action={{
          label: "Nuevo Usuario",
          onClick: () => setIsCreateModalOpen(true),
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-primary-600">Usuarios</h2>
          <button
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <Plus size={20} />
            )}
            Nuevo Usuario
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="relative max-w-md w-full">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              placeholder="Buscar usuario..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all duration-200">
            <Filter className="h-4 w-4" />
            Filtros
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <TableSkeleton />
                </td>
              </tr>
            ) : (
              paginatedItems.map((user) => (
                <tr
                  key={user.id}
                  className="group hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.user_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        user.roleName === "superAdmin"
                          ? "bg-primary-700 text-primary-100"
                          : "bg-red-800 text-red-50"
                      }`}
                    >
                      {user.roleName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoadingSpinner
                            size="sm"
                            className="text-primary-600"
                          />
                        ) : (
                          <Pencil className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" className="text-red-600" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isCreateModalOpen && (
        <HomeUserCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreate}
          isLoading={isLoading}
        />
      )}

      {isEditModalOpen && (
        <HomeUserEditModal
          user={selectedUser!}
          onEdit={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      )}

      {isDeleteModalOpen && (
        <HomeUserDeleteModal
          user={selectedUser!}
          onDelete={handleDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default HomeUserTable;
