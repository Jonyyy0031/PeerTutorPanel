import React, { Fragment, useEffect, useMemo } from "react";

import { User } from "../../shared/models/user.types";

import HomeStats from "./components/homeStats";
import HomeUserTable from "./components/home-user-table";

import { useApi } from "../../shared/hooks/useApi";
import { ApiService } from "../../services/api.services";

const HomePage: React.FC = () => {
  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api/admin"),
    []
  );

  const { fetchAll, create, update, remove, list, loading } = useApi<User>(
    apiService,
    "/users"
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCreate = async (user: Partial<User>) => {
    await create(user);
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
          <h1 className="text-3xl font-bold text-primary-600">DashBoard</h1>
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
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
