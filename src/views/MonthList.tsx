import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { useFetchIndexMonths } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { fortmatMonth } from "../utils/Formtater";
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Definición de tipos
interface MonthData {
  month_number: number;
  year: number;
}

interface MonthListData extends Array<MonthData> { }

const MonthList: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { data, refetch } = useFetchIndexMonths(token ?? "") as {
    data: MonthListData | undefined;
    refetch: () => void;
  };

  // Estado para el año seleccionado
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // Obtener años únicos para el filtro
  const uniqueYears = Array.from(
    new Set(data?.map((item: MonthData) => item.year))
  ) ?? [];

  // Filtrar datos según el año seleccionado
  const filteredData = selectedYear === "all"
    ? data
    : data?.filter((item: MonthData) => item.year === selectedYear);

  // Refrescar los datos cada vez que cambie el año
  useEffect(() => {
    if (selectedYear !== "all") {
      refetch();
    }
  }, [selectedYear, refetch]);

  return (
    <div className="w-full min-h-screen pt-8 pb-16 px-8 md:px-72 flex flex-col justify-start items-center space-y-8">
      <h1 className="text-xl font-bold">WalletSheet</h1>

      {/** FILTRO POR AÑO */}
      <div className="w-full flex flex-col items-start space-y-4">
        <h1 className="text-base">Filtro de búsqueda</h1>
        <TextField
          required
          className="w-full md:w-1/4"
          id="year"
          select
          label="Año"
          value={selectedYear}
          helperText="Filtrar por año"
          onChange={(e) => setSelectedYear(e.target.value as number | "all")}
        >
          <MenuItem value="all">Todos</MenuItem>
          {uniqueYears.map((year: number) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {/** LISTADO DE MESES CON MOVIMIENTOS */}
      {filteredData && filteredData.length > 0 ? (
        <div className="w-full flex flex-col space-y-4 pb-20 items-start">
          <h1 className="text-base">
            {`Meses con transacciones ${selectedYear === 'all' ? '' : `en ${selectedYear}`} (${filteredData.length})`}
          </h1>
          <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-4">
            {filteredData.map((item: MonthData) => (
              <button
                onClick={() => navigate("/month", {
                  state: {
                    month: item.month_number,
                    year: item.year
                  }
                })}
                key={`${item.year}-${item.month_number}`}
                className="w-full hover:bg-gray-100 border-2 border-solid border-primary rounded-lg p-4 flex flex-col space-y-4 justify-center items-center"
              >
                <h1 className="font-medium">{fortmatMonth(item.month_number)}</h1>
                <h1 className="text-sm">{item.year}</h1>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No se encontraron meses con transacciones.</p>
      )}

      <BottomNav />
    </div>
  );
};

export default MonthList;