import { Fragment } from "react";
import { BookOpen, ClipboardList, Users } from "lucide-react";

import { Card } from "../../shared/components/card";


const Home: React.FC = () => {
  return (
    <Fragment>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-primary-600 mb-8">DashBoard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Tutores"
            value="100"
            description="Tutores registrados"
            icon={Users}
          />
          <Card
            title="Materias"
            value="100"
            description="Materias registradas"
            icon={BookOpen}
          />
          <Card
            title="Registros"
            value="100"
            description="Solicitudes registradas"
            icon={ClipboardList}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
