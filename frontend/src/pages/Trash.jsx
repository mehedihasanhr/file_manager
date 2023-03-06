import FolderIcon from "../components/Folder/FolderIcon";
import { useFolderState } from "../features/folder/useFolderState";

export default function Trash() {
    const { trashFolders } = useFolderState();

    return (
        <div>
            <div className="w-full">
                <div className="py-10 px-5 flex flex-col gap-y-8">
                    <div className="flex items-center justify-between gap-3">
                        <h4 className="">Trash</h4>

                        {/* <Button
                            title="+ Add Folder"
                            className="bg-[#fca926] font-medium text-white hover:bg-[#fca926]/10 hover:text-[#fca926] transition-colors duration-300"
                        /> */}
                    </div>
                    <div className="flex items-center flex-wrap gap-4">
                        {trashFolders ? (
                            trashFolders.map(
                                (f) =>
                                    f.status === "trash" && (
                                        <FolderIcon key={f._id} folder={f} />
                                    )
                            )
                        ) : (
                            <div className="text-gray-500">No Folders</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
