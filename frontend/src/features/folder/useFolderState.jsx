import {
    useChangeStatusMutation,
    useCreateFolderMutation,
    useDeleteFolderMutation,
    useGetFavoriteFoldersQuery,
    useGetFoldersByIdQuery,
    useGetTrashFoldersQuery,
} from "./folderApiSlice";

export const useFolderState = (id) => {
    const { data: folder } = useGetFoldersByIdQuery(id, {
        refetchOnMountOrArgChange: true,
        skip: id === undefined,
    });

    const [changeStatus] = useChangeStatusMutation();
    const { data: trashFolders } = useGetTrashFoldersQuery();
    const { data: favoriteFolders } = useGetFavoriteFoldersQuery();
    const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();
    const [createFolder, { isLoading }] = useCreateFolderMutation();

    // create new folder
    const addNewFolder = async (folder, cb) => {
        try {
            await createFolder(folder)
                .unwrap()
                .then((res) => cb());
        } catch (err) {
            console.log("err", err);
        }
    };

    // move folder to trash
    const moveToTrash = async (id) => {
        try {
            await changeStatus({ id, status: "trash" })
                .unwrap()
                .then((res) => {
                    console.log(res);
                });
        } catch (err) {
            console.log("err", err);
        }
    };

    // move folder to favorite
    const moveToFavorite = async (id) => {
        try {
            await changeStatus({ id, status: "favorite" });
        } catch (err) {
            console.log("err", err);
        }
    };

    // delete folder
    const deleteFolderById = async (id) => {
        try {
            await deleteFolder(id);
        } catch (err) {
            console.log("err", err);
        }
    };

    return {
        folder: folder?.data,
        addNewFolder,
        isLoading,
        moveToTrash,
        moveToFavorite,
        deleteFolderById,
        trashFolders: trashFolders?.data,
        favoriteFolders: favoriteFolders?.data,
    };
};
