import * as React from "react";
import { ModalContext } from "../../context/ModalContext";
import { useFolderState } from "../../features/folder/useFolderState";
import Button from "../Button";
import { Input, Label } from "../Form";
import SelectionInput from "../Form/SelectionInput";
import Modal from "../modal/Modal";

export default function CreateFolder({ show, setShow, parent }) {
    const modal = React.useContext(ModalContext);
    const [folderName, setFolderName] = React.useState("");
    const { addNewFolder, isLoading } = useFolderState();
    const [selected, setSelected] = React.useState("");

    // handle create folder
    const handleCreateFolder = (e) => {
        e.preventDefault();

        if (!folderName || !parent) return;

        addNewFolder(
            {
                name: folderName,
                parent: parent,
                type: selected,
            },
            () => {
                setFolderName("");
                setSelected("");
                setShow(false);
                modal.close();
            }
        );
    };

    return (
        <Modal title="" open={show} close={setShow}>
            <div className="flex justify-between items-center px-5 pb-4">
                <form
                    onSubmit={handleCreateFolder}
                    className="flex flex-col gap-3"
                >
                    <Label>
                        <span>Folder Name</span>
                        <Input
                            type="text"
                            value={folderName}
                            className="text-gray-700"
                            onChange={(e) => setFolderName(e.target.value)}
                        />
                    </Label>

                    <Label>
                        <span>Folder Type</span>
                        <SelectionInput
                            label="Parent"
                            onSelected={setSelected}
                            options={[
                                { label: "Documents", value: "documents" },
                                { label: "Videos", value: "videos" },
                                { label: "Music", value: "music" },
                                { label: "Images", value: "images" },
                                { label: "Compressed", value: "compressed" },
                                { label: "Archives", value: "archives" },
                                { label: "Application", value: "application" },
                                { label: "Others", value: "others" },
                            ]}
                        />
                    </Label>

                    <Button
                        type="submit"
                        className="mt-4 bg-[#feae2b] text-white"
                    >
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </form>
            </div>
        </Modal>
    );
}
