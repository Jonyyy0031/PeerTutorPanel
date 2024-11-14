import React, { Fragment } from "react";
import { Plus } from "lucide-react";
import TutorStats from "./components/tutorStats";
import TutorTable from "./components/tutorTable";

const TutorsPage: React.FC = () => {
  return (
    <Fragment>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">Tutores</h1>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors">
            <Plus className="h-5 w-5" />
            Nuevo Tutor
          </button>
        </div>

        <TutorStats />

        <div className="bg-background-card rounded-xl shadow-sm p-6">
          <TutorTable />
        </div>
      </div>
    </Fragment>
  );
}
export default TutorsPage;
