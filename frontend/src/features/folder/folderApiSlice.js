import { apiSlice } from "../../app/api/apiSlice";


export const folderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFoldersById: builder.query({
            query: (id) => `folder/${id}`,
            providesTags: ["Folder"],
        }),

        // get trash folders
        getTrashFolders: builder.query({
            query: () => `folder/trash/folders`,
            providesTags: ["Folder"],
        }),

        // get favorite folders
        getFavoriteFolders: builder.query({
            query: () => `folder/favorite/folders`,
            providedTags: ["Folder"],
        }),

        createFolder: builder.mutation({
            query: (folder) => ({
                url: "folder/create",
                method: "POST",
                body: folder,
            }),
            async onQueryStarted(folder, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    // if query was successful, invalidate the folder list
                    if (result.data) {
                        dispatch(folderApiSlice.util.invalidateTags(["Folder"]));
                    }

                } catch (e) {
                    console.log(e)
                }

            }
        }),

        // folder move to trash
        changeStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `folder/update/status/${id}`,
                method: "PUT",
                body: { status },
            }),

            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    // if query was successful, invalidate the folder list
                    if (result.data) {
                        dispatch(folderApiSlice.util.invalidateTags(["Folder"]));
                    }

                } catch (e) {
                    console.log(e)
                }
            }
        }),

        // delete folder
        deleteFolder: builder.mutation({
            query: (id) => ({
                url: `folder/delete/${id}`,
                method: "DELETE",
            }),

            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    // if query was successful, invalidate the folder list
                    if (result.data) {
                        dispatch(folderApiSlice.util.invalidateTags(["Folder"]));
                    }

                } catch (e) {
                    console.log(e)
                }
            }
        }),

    }),
});


export const {
    useGetFoldersByIdQuery,
    useCreateFolderMutation,
    useChangeStatusMutation,
    useDeleteFolderMutation,
    useGetTrashFoldersQuery,
    useGetFavoriteFoldersQuery
} = folderApiSlice;