import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa el hook de autenticación
import { PulseLoader } from "react-spinners";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Accede al token desde el contexto

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate("/home"); // Redirige al home si hay token
      } else {
        navigate("/login"); // Redirige al login si no hay token
      }
    }, 1000); // Simula un splash de 2 segundos
  }, [navigate, token]); // El efecto depende del token

  return (
    <div className="min-h-screen px-6 flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <PulseLoader speedMultiplier={0.75} color="white"/>
    </div>
  );
};

export default SplashScreen;
