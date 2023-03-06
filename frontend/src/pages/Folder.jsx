import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import FileItem from "../components/File/FileItem";
import FolderIcon from "../components/Folder/FolderIcon";
import { ModalContext } from "../context/ModalContext";
import { useFolderState } from "../features/folder/useFolderState";

const OpenedFolder = () => {
    const { folderId } = useParams();
    const modal = useContext(ModalContext);
    const { folder } = useFolderState(folderId);

    const folders = folder
        ? folder.folders?.filter((f) => f.status !== "trash")
        : [];

    return (
        <div className="w-full">
            <div className="py-10 px-5 flex flex-col gap-y-8">
                <div className="flex items-center justify-between gap-3">
                    <h4 className="">{folder?.name}</h4>

                    <Button
                        title="+ Add Folder"
                        onClick={() => modal.open("create-folder", folderId)}
                        className="bg-[#fca926] font-medium text-white hover:bg-[#fca926]/10 hover:text-[#fca926] transition-colors duration-300"
                    />
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    {folders.length !== 0 ? (
                        folders.map(
                            (f) =>
                                f.status !== "trash" && (
                                    <FolderIcon key={f._id} folder={f} />
                                )
                        )
                    ) : (
                        <div className="text-gray-500">No Folders</div>
                    )}
                </div>
            </div>

            {/* files */}

            <div className="pt-10 px-5 flex flex-col gap-y-8">
                <div className="flex items-center justify-between">
                    <h4 className="">My Files</h4>
                    <Button
                        title="+ Upload Files"
                        className="bg-[#fca926] font-medium text-white hover:bg-[#fca926]/10 hover:text-[#fca926] transition-colors duration-300"
                    />
                </div>
                <div className="flex flex-col xl:gap-x-6">
                    <FileItem type="document" name="Document" ext="doc" />
                    <FileItem type="image" name="Document" ext="png" />
                    <FileItem type="music" name="Document" ext="mp3" />
                    <FileItem type="video" name="Document" ext="mp4" />
                    <FileItem type="compressed" name="Document" ext="zip" />
                    <FileItem type="coding" name="Document" ext="php" />
                    <FileItem type="pdf" name="Document" ext="pdf" />
                </div>
            </div>
        </div>
    );
};

export default OpenedFolder;
