import React, { Fragment, useEffect, useMemo } from "react";
import LogsTable from "./components/logsTable";
import LogsStats from "./components/logsStats";
import { useApi } from "../../shared/hooks/useApi";
import { ApiService } from "../../services/api.services";
import { useNotificationContext } from "../../shared/context/notificationContext";
import { Log } from "../../shared/models/logs.types";

const LogsPage: React.FC = () => {
  const { showNotification } = useNotificationContext();
  const apiServe = useMemo(() => new ApiService("http://localhost:3000/api/admin"), []);
  const { fetchAll, create, update, remove, list, loading } = useApi<Log>(apiServe, "/logs");

  useEffect(() => {
    fetchAll();
  }
  , [fetchAll]);

  const handleCreate = async (log: Partial<Log>) => {
    try {
      await create(log);
      showNotification("success", "Log creado correctamente");
    } catch (error: any) {
      showNotification("error", error.message);
    }
  }

  const handleEdit = async (log: Log) => {
    await update(log.id, log);
  }

  const handleDelete = async (log: Log) => {
    await remove(log.id);
  }

  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Registros</h1>
        </div>

        <LogsStats logs={list} />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <LogsTable logs={list} isLoading={loading} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </Fragment>
  );
};

export default LogsPage;
