import { AttachMoney, DirectionsBus, ElectricalServices, LocalHospital, Nightlife, Restaurant, School, SportsEsports } from "@mui/icons-material";
import React from "react";

interface CategoryIcon {
    category: string;
}

const CategoryIcon: React.FC<CategoryIcon> = ({ category }) => {
    if (category === 'Servicios') {
        return <ElectricalServices className="text-gray-500" />;
    }
    if (category === 'Comida') {
        return <Restaurant className="text-gray-500" />;
    }
    if (category === 'Transporte') {
        return <DirectionsBus className="text-gray-500" />;
    }
    if (category === 'Salud') {
        return <LocalHospital className="text-gray-500" />;
    }
    if (category === 'Educación') {
        return <School className="text-gray-500" />;
    }
    if (category === 'Entretenimiento') {
        return <SportsEsports className="text-gray-500" />;
    }
    if (category === 'Ocio') {
        return <Nightlife className="text-gray-500" />;
    }
    return <AttachMoney className="text-gray-500" />;
}

export default CategoryIcon;