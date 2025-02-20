import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { CalendarMonth, CreditCard, Home } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  return (
    <BottomNavigation
      showLabels
      value={location.pathname} // Usa la ruta actual como valor
      onChange={(event, newValue) => navigate(newValue)}
      sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", boxShadow: 3 }}
    >
      <BottomNavigationAction 
        label="Inicio" 
        icon={<Home />} 
        value="/" 
        sx={{ color: location.pathname === "/" ? "primary.main" : "text.secondary" }}
      />
      <BottomNavigationAction 
        label="Meses" 
        icon={<CalendarMonth />} 
        value="/perfil" 
        sx={{ color: location.pathname === "/perfil" ? "primary.main" : "text.secondary" }}
      />
      <BottomNavigationAction 
        label="Cuentas y tarjetas" 
        icon={<CreditCard />} 
        value="/configuracion" 
        sx={{ color: location.pathname === "/configuracion" ? "primary.main" : "text.secondary" }}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
