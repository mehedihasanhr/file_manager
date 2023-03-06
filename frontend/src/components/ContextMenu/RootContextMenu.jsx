import { useParams } from "react-router-dom";
import ContextMenuItem from "./ContextMenuItem";

export default function RootContextMenu({ modal, folderId }) {
    const param = useParams();
    // open create folder modal
    const createFolder = (e) => {
        e.preventDefault();
        modal("create-folder", param.folderId || folderId);
    };

    // open upload file modal
    const uploadFile = (e) => {
        e.preventDefault();
        modal("create-file", param.folderId || folderId);
    };

    return (
        <div className="flex flex-col gap-1.5 w-64">
            <ContextMenuItem
                href="#"
                title="New Folder"
                icon="bi bi-folder-plus"
                onClick={createFolder}
            />
            <ContextMenuItem
                href="#"
                icon="bi bi-cloud-arrow-up"
                title="Upload File"
                onClick={uploadFile}
            />
        </div>
    );
}
