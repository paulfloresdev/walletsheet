import React from "react";
import Providers from "./Providers.tsx";
import AppRoutes from "./routes";


const App: React.FC = () => {
    return (
        <Providers>
            <div className="bg-gray-900 w-full h-full">
                <AppRoutes />
            </div>
        </Providers>
    );
}

export default App;