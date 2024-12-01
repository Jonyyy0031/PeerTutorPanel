import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import LogoUni from "../../assets/LogoPoli.svg";
import { ApiService } from "../../services/api.services";
import { useAuth } from "../../shared/hooks/useAuth";
import { validateEmail } from "../../shared/helpers/validators";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useNotificationContext } from "../../shared/context/notificationContext";

const login: React.FC = () => {
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();

  const apiService = useMemo(
    () => new ApiService("http://localhost:3000/api/public"),
    []
  );
  const { login, loading } = useAuth(apiService, "/login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });
    setError({
      ...error,
      email: validateEmail(value) ? "" : "Correo electronico invalido",
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });
    setError({
      ...error,
      password: "",
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      if (localStorage.getItem("token")) {
        showNotification("success", "Inicio de sesión exitoso");
        navigate("/home");
      }

    } catch (error: any) {
      showNotification("error", error.message);
    }
  };

  return (
    <div className="bg-primary bg-UniBg bg-no-repeat h-screen w-full m-auto">
      <div className="grid grid-cols-2 h-full w-full items-center ">
        <div>
          <img src={LogoUni} alt="LogoUni" className="ml-[10vw] h-48" />
        </div>
        <div className="flex flex-col w-[760px] h-[720px] border-xl bg-white p-8 rounded-xl shadow-2xl ">
          <form
            onSubmit={handleLogin}
            className="shadow-lg rounded-xl h-full w-full p-6"
          >
            <h1 className="text-4xl font-bold text-center mt-16">
              Programa Estudiantil de Tutorías (Peer-Tutor)
            </h1>
            <div className="mt-16">
              <label className="block text-2xl font-medium text-black mb-2">
                Correo electronico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                disabled={loading}
                placeholder="example@upqroo.edu.mx"
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent
                    ${error.email ? "border-red-600" : "border-gray-300"}`}
                required
              />
              {error.email && (
                <p className="mt-2 text-sm text-red-600">{error.email}</p>
              )}
            </div>
            <div className="mt-8">
              <label className="block text-2xl font-medium text-black mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handlePasswordChange}
                disabled={loading}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent
                    ${error.password ? "border-red-600" : "border-gray-300"}`}
                required
              />
              {error.password && (
                <p className="mt-2 text-sm text-red-600">{error.password}</p>
              )}
            </div>
            <div className="mt-16">
              <button
                type="submit"
                disabled={loading || !!error.email || !!error.password}
                className={`w-full bg-primary-600 text-lg text-white px-4 py-4 disabled:opacity-60
                  rounded-lg flex items-center justify-center  gap-2 hover:bg-primary-700 transition-colors`}
              >
                Iniciar sesión
                {loading ? (
                  <LoadingSpinner size="md" className="text-white" />
                ) : (
                  <LogIn size={24} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
