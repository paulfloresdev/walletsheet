import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { CalendarMonth, CreditCard, Home } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  // Verificar si la ruta corresponde a una página de mes (/month/:year/:monthNumber) o a /transaction o /transaction/edit
  const isMonthPage = /^\/month(\/\d{4}\/\d{1,2})?$/.test(location.pathname) || 
                      location.pathname === "/transaction" || 
                      location.pathname === "/transaction/edit";

  return (
    <BottomNavigation
      showLabels
      value={location.pathname} // Usa la ruta actual como valor
      onChange={(event, newValue) => navigate(newValue)} // Navega a la nueva ruta
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        boxShadow: 4,
        zIndex: 50,
      }}
    > 
      <BottomNavigationAction
        label="Inicio"
        icon={<Home />}
        value="/home"
        sx={{
          color: location.pathname === "/home" ? "primary.main" : "text.secondary",
        }}
      />
      <BottomNavigationAction
        label="Meses"
        icon={<CalendarMonth />}
        value="/months"
        sx={{
          // Resalta "Meses" si estamos en la página de meses o en cualquier ruta de tipo /month/:year/:monthNumber, /transaction o /transaction/edit
          color: location.pathname === "/months" || isMonthPage ? "primary.main" : "text.secondary",
          fontSize: location.pathname === "/months" || isMonthPage ? '1.2rem' : '1.2rem', // Ajusta el tamaño de la letra
        }}
      />
      <BottomNavigationAction
        label="Cuentas de banco"
        icon={<CreditCard />}
        value="/accounts"
        sx={{
          color: location.pathname === "/accounts" ? "primary.main" : "text.secondary",
        }}
      />
    </BottomNavigation>
  );
};

export default BottomNav;