import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404

const SplashScreen = React.lazy(() => import("../views/SplashScreen.tsx"));
const Home = React.lazy(() => import("../views/Home.tsx"));
const Login = React.lazy(() => import("../views/Login.tsx"));


const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
            path="/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <SplashScreen/>
                </React.Suspense>
            }
        />
        <Route
            path="/home"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Home/>
                </React.Suspense>
            }
        />
        <Route
            path="/login"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Login/>
                </React.Suspense>
            }
        />
    </Routes>
);

export default AppRoutes;