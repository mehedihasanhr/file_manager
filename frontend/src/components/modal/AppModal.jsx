import React from "react";
import { ModalContext } from "../../context/ModalContext";
import UplaodFile from "../File/UploadFile";
import CreateFolder from "../Folder/CreateFolder";

export default function AppModal() {
    const modal = React.useContext(ModalContext);

    switch (modal.modalType) {
        case "create-folder":
            return (
                <CreateFolder
                    show={modal.modal}
                    setShow={modal.close}
                    parent={modal.parent}
                />
            );
        case "create-file":
            return (
                <UplaodFile
                    show={modal.modal}
                    setShow={modal.close}
                    parent={modal.parent}
                />
            );
        default:
            return null;
    }
}
