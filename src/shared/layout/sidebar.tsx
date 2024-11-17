import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { Home, Users, BookOpen, ClipboardList } from "lucide-react";
import logoUni from "../../assets/LogoPoli.svg";

type SidebarLinkProps = {
  icon: React.ElementType;
  text: string;
  link: string;
};

function SidebarLink({ icon: Icon, text, link }: SidebarLinkProps) {
  const location = useLocation();
  const active = location.pathname === `/${link.toLowerCase()}`;
  return (
    <Link
      to={`/${link.toLowerCase()}`}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-primary-700 text-white"
          : "text-white/80 hover:bg-primary-700 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{text}</span>
    </Link>
  );
}

const Sidebar: React.FC = () => {
  return (
    <Fragment>
      <aside className="w-64 bg-primary-600 text-white min-h-screen p-4">
        <div className="mb-8">
          <img
            src={logoUni}
            alt="Universidad Politécnica"
            className=" w-auto"
          />
        </div>

        <nav className="space-y-2">
          <SidebarLink link="" icon={Home} text="Inicio"/>
          <SidebarLink link="tutors" icon={Users} text="Tutores" />
          <SidebarLink link="subjects" icon={BookOpen} text="Materias" />
          <SidebarLink link="logs" icon={ClipboardList} text="Registros" />
        </nav>
      </aside>
    </Fragment>
  );
}
export default Sidebar;

{
  /* <ul className="mt-4 mb-2">
            <Link
              to={"/"}
              className="flex flex-row items-center h-12 transform hover:translate-x-1 transition-transform hover:bg-bbPrimary ease-in-out duration-900 text-bbWhite hover:text-bbSecondary"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-bbWhite">
                <i className="material-symbols-outlined">home</i>
              </span>
              <span className="text-xl font-medium font">Inicio</span>
            </Link>
          </ul>
          <ul className="mt-2 mb-2">
            <Link
              to={"/"}
              className="flex flex-row items-center h-12 transform hover:translate-x-1 transition-transform hover:bg-bbPrimary ease-in-out duration-900 text-bbWhite hover:text-bbSecondary"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-bbWhite">
                <i></i>
              </span>
              <span className="text-xl font-medium font">Tutores</span>
            </Link>
          </ul>
          <ul className="mt-2 mb-2">
            <Link
              to={"/"}
              className="flex flex-row items-center h-12 transform hover:translate-x-1 transition-transform hover:bg-bbPrimary ease-in-out duration-900 text-bbWhite hover:text-bbSecondary"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-bbWhite">
                <i></i>
              </span>
              <span className="text-xl font-medium font">Materias</span>
            </Link>
          </ul>
          <ul className="mt-2 mb-2">
            <Link
              to={"/"}
              className="flex flex-row items-center h-12 transform hover:translate-x-1 transition-transform hover:bg-bbPrimary ease-in-out duration-900 text-bbWhite hover:text-bbSecondary"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-bbWhite">
                <i></i>
              </span>
              <span className="text-xl font-medium font">Registros</span>
            </Link>
          </ul> */
}
