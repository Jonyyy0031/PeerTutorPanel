import React, { Fragment } from "react";
import { Search, Plus, Filter } from "lucide-react";
import TutorStats from "../tutors/components/tutorStats";
import SubjectTable from "./components/subjectTable";

const subjectsPage: React.FC = () => {
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

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tutor..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-5 w-5 text-gray-600" />
              Filtros
            </button>
          </div>

          <SubjectTable />
        </div>
      </div>
    </Fragment>
  );
}

export default subjectsPage;
