export const fortmatMonth = (numeroMes: number): string => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    return meses[numeroMes - 1] || "Mes inválido";
};

export const formatCurrency = (amount: number): string => {
  // Verifica si amount es un número válido antes de formatearlo
  if (isNaN(amount)) {
    return "Invalid amount";  // O algún valor predeterminado o error
  }

  return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};

