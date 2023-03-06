import * as React from "react";
import { ModalContext } from "../../context/ModalContext";
import { useFolderState } from "../../features/folder/useFolderState";
import FileContextMenu from "./FileContextMenu";
import FolderContextMenu from "./FolderContextMenu";
import RootContextMenu from "./RootContextMenu";

/*
 ** CRATE CONTEXT MENU FOR OPENED FOLDER **
 */
export default function AppContextMenu(e, params, root) {
    const modal = React.useContext(ModalContext);
    const data = e?.dataset;
    const type = data?.targetType;
    const folderId = data?.folderId || root;
    const file = {
        fileId: data?.fileId,
        folderId: params.get("f") || "root",
    };
    const { moveToTrash: FolderMoveToTrash } = useFolderState(folderId);

    // folder move to trash
    const folderMoveToTrash = async (e, id) => {
        e.preventDefault();
        console.log("folderMoveToTrash", id);
        FolderMoveToTrash(id);
    };

    const content = () => {
        switch (type) {
            case "folder": {
                return (
                    <FolderContextMenu
                        folderId={folderId}
                        moveToTrash={folderMoveToTrash}
                    />
                );
            }

            case "file": {
                return <FileContextMenu />;
            }

            default: {
                return <RootContextMenu folderId={root} modal={modal.open} />;
            }
        }
    };

    return content();
}
