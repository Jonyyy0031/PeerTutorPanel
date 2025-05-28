import React, { Fragment, useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { User } from "../../shared/models/user.types";

import HomeStats from "./components/homeStats";
import HomeUserTable from "./components/home-user-table";

import { useApi } from "../../shared/hooks/useApi";
import { useAdminApiService } from "../../shared/hooks/useAdminAPI";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import HomeUserCreateModal from "./modals/home-userCreate";
import { useNotificationContext } from "../../shared/context/notificationContext";

const HomePage: React.FC = () => {
  const apiService = useAdminApiService();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { showNotification } = useNotificationContext();

  const { fetchAll, create, update, remove, list, loading } = useApi<User>(
    apiService,
    "/users"
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCreate = async (user: Partial<User>) => {
      try {
        await create(user);
        setIsCreateModalOpen(false);
        showNotification("success", "Tutor creado correctamente");
      } catch (error: any) {
        showNotification("error", error.message);
      }
    };

  const handleEdit = async (user: User) => {
    await update(user.id, user);
  };

  const handleDelete = async (user: User) => {
    await remove(user.id);
  };

  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Dashboard</h1>
          <button
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      {loading ? (
                        <LoadingSpinner size="sm" className="text-white" />
                      ) : (
                        <Plus size={20} />
                      )}
                      Nuevo Usuario
                    </button>
        </div>

        <HomeStats />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <HomeUserTable
            users={list}
            isLoading={loading}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {isCreateModalOpen && (
          <HomeUserCreateModal
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreate}
            isLoading={loading}
          />
        )}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
