import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface RequireAuthProps {
    allowedRoles: string[];
    
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const Role_type=[{roles:auth?.roles}
                 ];

    return (
        Role_type.find(v => allowedRoles?.includes(auth?.roles))
           ? <Outlet /> 
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="../../login" state={{ from: location }} replace />

                 /*  auth?.user
                ? <Outlet /> 
                    //? <Navigate to="/unauthorized" state={{ from: location }} replace />
                    : <Navigate to="../../login" state={{ from: location }} replace />*/
    );
}

export default RequireAuth;