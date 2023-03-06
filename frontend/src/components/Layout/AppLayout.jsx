import React from "react";
import {
    Navigate,
    Outlet,
    useLocation,
    useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import ContextMenu from "../ContextMenu";
import AppContextMenu from "../ContextMenu/AppContextMenu";
import AppModal from "../modal/AppModal";
import LeftSidebar from "../Sidebar/LeftSitebar";
import RightSidebar from "../Sidebar/RightSidebar";

export default function AppLayout({ children }) {
    const { auth, loading } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearchParams = React.useMemo(() => location, [location.search]);

    React.useEffect(() => {
        setSearchParams(location.search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSearchParams]);

    return !loading && auth && auth.token ? (
        <div className="flex">
            <LeftSidebar />

            {/* main */}
            <main className="flex-1">
                <ContextMenu
                    menuRenderer={(e) =>
                        AppContextMenu(e, searchParams, auth?.rootFolder)
                    }
                >
                    <Outlet />
                </ContextMenu>
            </main>

            {/* right sidebar */}
            <RightSidebar />

            <AppModal />
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
}
