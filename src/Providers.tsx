// src/Providers.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Asegúrate de importar el AuthProvider
import { QueryClient, QueryClientProvider } from 'react-query';

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000, 
      refetchOnWindowFocus: false,
    },
  },
});

const Providers: React.FC<ProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
      <AuthProvider>  {/* Añadir AuthProvider aquí */}
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
  </QueryClientProvider>
  
);

export default Providers;
