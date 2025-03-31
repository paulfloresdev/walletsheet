import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404

const SplashScreen = React.lazy(() => import("../views/SplashScreen.tsx"));
const Home = React.lazy(() => import("../views/Home.tsx"));
const Login = React.lazy(() => import("../views/Login.tsx"));
const MonthList = React.lazy(() => import("../views/MonthList.tsx"));
const Month = React.lazy(() => import("../views/Month.tsx"));
const Transaction = React.lazy(() => import("../views/Transaction.tsx"));
const EditTransaction = React.lazy(() => import("../views/EditTransaction.tsx"));
const Accounts = React.lazy(() => import("../views/Accounts.tsx"));

const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
            path="/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <SplashScreen />
                </React.Suspense>
            }
        />
        <Route
            path="/home"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </React.Suspense>
            }
        />
        <Route
            path="/login"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Login />
                </React.Suspense>
            }
        />
        <Route
            path="/months"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <MonthList />
                </React.Suspense>
            }
        />
        <Route
            path="/month/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Month />
                </React.Suspense>
            }
        />
        <Route
            path="/transaction/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Transaction></Transaction>
                </React.Suspense>
            }
        />
        <Route
            path="/transaction/edit/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <EditTransaction></EditTransaction>
                </React.Suspense>
            }
        />
        <Route
            path="/accounts"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Accounts />
                </React.Suspense>
            }
        />
    </Routes>
);

export default AppRoutes;