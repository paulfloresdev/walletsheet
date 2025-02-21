import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegación
import { useAuth } from "../context/AuthContext"; // Para obtener el contexto de autenticación
import { getApiBaseUrl } from "../utils/apiConfig";// Importamos la función para obtener la URL base

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Para mostrar errores
  const [loading, setLoading] = useState<boolean>(false); // Para mostrar un loading
  const { login } = useAuth(); // Hook para obtener la función login del contexto
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Activar el loading

    try {
      // Usar la URL base desde el archivo apiConfig
      const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const data = await response.json();
        login(data.token); // Almacenar el token en el contexto de autenticación
        setError(null); // Limpiar el error
        navigate("/home"); // Redirigir al dashboard o página principal
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Hubo un error al iniciar sesión.");
      }
    } catch (error) {
      setError("Hubo un problema con la conexión al servidor");
      console.error("Error de conexión:", error);
    } finally {
      setLoading(false); // Desactivar el loading
    }
  };

  return (
    <div className="min-h-screen px-6 flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      {/* Fondo con leve transparencia para la tarjeta */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-4xl text-gray-800 text-center font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 text-sm font-semibold">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-gray-800 text-sm font-semibold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-100 text-gray-800 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading} // Deshabilitar el botón mientras se carga
          >
            {loading ? "Cargando..." : "Log In"}
          </button>
        </form>

        {/* Mostrar error en caso de que ocurra */}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <p className="text-gray-800 text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:text-indigo-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
