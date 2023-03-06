import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

export default function Public() {
    const { auth, loading } = useAuth();

    let content = null;

    if (!loading && !auth) {
        content = <Outlet />;
    } else if (!loading && auth && auth.token) {
        content = <Navigate to="/" />;
    }

    return content;
}
