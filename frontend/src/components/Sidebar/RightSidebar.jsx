import FileAndFolderDetails from "./FileAndFolderDetails";
import SidebarProfile from "./SidebarProfile";
import StorageIndicator from "./StorageIndicator";

export default function RightSidebar() {
    return (
        <aside
            onContextMenu={(e) => e.preventDefault()}
            className="w-80 border-l border-dashed"
        >
            <div className="w-80 sticky top-0 right-0 px-4">
                <SidebarProfile />
                {/* storage used */}
                <div className="mt-10">
                    <StorageIndicator used={180} total={256} />
                </div>
                {/* selected file or folder details */}
                <div className="mt-10">
                    <FileAndFolderDetails />
                </div>
            </div>
        </aside>
    );
}
