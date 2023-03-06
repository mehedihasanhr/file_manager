import { useAuth } from "../../features/auth/useAuth";

export default function SidebarProfile() {
    const { Logout } = useAuth();
    return (
        <div className="flex items-center gap-3 py-4 border-b border-dashed">
            <div className="w-12 h-12 rounded-full bg-slate-200">
                <img
                    src="/woman.svg"
                    alt="profile"
                    className="w-full h-full object-fill rounded-full"
                />
            </div>
            <div>
                <h6 className="leading-5">Andrea Rachel</h6>
                <span className="text-xs block text-gray-500">
                    andreaaa@gmail.com
                </span>
            </div>

            <button type="button" className="ml-auto mr-2 text-xs">
                <i className="bi bi-chevron-down" />
            </button>
        </div>
    );
}
