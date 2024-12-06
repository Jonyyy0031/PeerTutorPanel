import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Home, Users, BookOpen, ClipboardList, LogOut } from "lucide-react";
import logoUni from "../../assets/LogoPoli.svg";
import { useNotificationContext } from "../context/notificationContext";
import LoadingSpinner from "../components/LoadingSpinner";

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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("token");
      showNotification("success", "Sesión cerrada exitosamente");
      navigate("/");
    }, 1000);
  };

  return (
    <Fragment>
      <aside className="w-64 bg-primary-600 text-white min-h-screen p-4 flex flex-col">
        <div className="mb-8">
          <img
            src={logoUni}
            alt="Universidad Politécnica"
            className=" w-auto"
          />
        </div>

        <nav className="space-y-2">
          <SidebarLink link="home" icon={Home} text="Inicio" />
          <SidebarLink link="tutors" icon={Users} text="Tutores" />
          <SidebarLink link="subjects" icon={BookOpen} text="Materias" />
          <SidebarLink link="logs" icon={ClipboardList} text="Registros" />
        </nav>

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`w-full text-lg text-white/80 px-4 py-4 disabled:opacity-60
                  rounded-lg mt-auto flex items-center justify-center  gap-2 hover:bg-primary-700 hover:text-white transition-colors`}
        >
          <span className="font-medium">Cerrar sesión</span>
          {loading ? (
            <LoadingSpinner size="md" />
          ) : (
            <LogOut size={24} />
          )}
        </button>
      </aside>
    </Fragment>
  );
};
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
