import FolderIcon from "../components/Folder/FolderIcon";
import { useFolderState } from "../features/folder/useFolderState";

export default function Favorite() {
    const { favoriteFolders } = useFolderState();

    return (
        <div>
            <div className="w-full">
                <div className="py-10 px-5 flex flex-col gap-y-8">
                    <div className="flex items-center justify-between gap-3">
                        <h4 className="">Favorite</h4>
                    </div>
                    <div className="flex items-center flex-wrap gap-4">
                        {favoriteFolders && favoriteFolders.length !== 0 ? (
                            favoriteFolders?.map(
                                (f) =>
                                    f.status === "favorite" && (
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
