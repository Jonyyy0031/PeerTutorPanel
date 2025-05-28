import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import LogoUni from "../../assets/LogoPoli.svg";
import { useAuth } from "../../shared/hooks/useAuth";
import { validateEmail } from "../../shared/helpers/validators";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useNotificationContext } from "../../shared/context/notificationContext";
import { useForm } from "../../shared/hooks/useForm";
import { usePublicAPI } from "../../shared/hooks/usePublicAPI";

const login: React.FC = () => {
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();

  const apiService = usePublicAPI();
  const { login, loading } = useAuth(apiService, "/login");


  const validationRules = {
    email: (value: string) =>
      !validateEmail(value) ? "Correo electrónico inválido" : undefined,
    password: (value: string) =>
      !value ? "La contraseña es requerida" : undefined
  };

  const { formData, errors, handleChange, isValid } = useForm(
    {
      email: "",
      password: "",
    },
    validationRules
  );



  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) return;
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="example@upqroo.edu.mx"
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent
                    ${errors.email ? "border-red-600" : "border-gray-300"}`}
                required
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="mt-8">
              <label className="block text-2xl font-medium text-black mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-primary-600 focus-visible:outline-none focus:border-transparent
                    ${errors.password ? "border-red-600" : "border-gray-300"}`}
                required
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div className="mt-16">
              <button
                type="submit"
                disabled={loading || !!errors.email || !!errors.password}
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
