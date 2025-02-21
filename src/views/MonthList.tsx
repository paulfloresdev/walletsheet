import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { useFetchIndexMonths } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { fortmatMonth } from "../utils/Formtater";
import { TextField, MenuItem } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MonthList: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useFetchIndexMonths(token ?? "");

  // Estado para el año seleccionado
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // Obtener años únicos para el filtro
  const uniqueYears = Array.from(new Set(data?.map((item: any) => item.year))) ?? [];

  // Filtrar datos según el año seleccionado
  const filteredData = selectedYear === "all" ? data : data?.filter((item: any) => item.year === selectedYear);

  // Refrescar los datos cada vez que cambie el año o el mes
  useEffect(() => {
    if (selectedYear !== "all") {
      refetch(); // Refresca los datos cuando cambies de año
    }
  }, [selectedYear, refetch]);

  return (
    <div className="w-full min-h-screen pt-8 pb-16 px-8 md:px-72 flex flex-col justify-start items-center space-y-8">
      <h1 className="text-xl font-bold">WalletSheet</h1>

      {/** FILTRO POR AÑO */}
      <TextField
        required
        className="w-full"
        id="year"
        select
        label="Filtro"
        value={selectedYear}
        helperText="Filtrar por año"
        onChange={(e) => setSelectedYear(e.target.value as number | "all")}
      >
        <MenuItem value="all">Todos</MenuItem>  {/* Opción para todos los años */}
        {uniqueYears?.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>

      {/** LISTADO DE MESES CON MOVIMIENTOS */}
      <div className="w-full flex flex-col space-y-6">
        <h1 className="text-base font-medium text-center">Meses con transacciones</h1>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((item: any) => (
            <button
              onClick={() => {
                const month = item.month_number;
                const year = item.year;
                navigate("/month", { state: { month, year } });
              }}
              key={item.month_number}
              className="w-full hover:bg-gray-100 border-2 border-solid border-primary rounded-lg p-4 flex flex-row justify-between"
            >
              <h1 className="text-gray-700">{`${fortmatMonth(item.month_number)} ${item.year}`}</h1>
              <ArrowForwardIos fontSize="small" />
            </button>
          ))
        ) : (
          <p className="text-center">No se encontraron meses con transacciones.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default MonthList;
