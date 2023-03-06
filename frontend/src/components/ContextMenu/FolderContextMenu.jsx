import ContextMenuItem from "./ContextMenuItem";

export default function FolderContextMenu({ folderId, moveToTrash }) {
    return (
        <div className="flex flex-col gap-1.5 w-64">
            <ContextMenuItem
                href={`/folder/${folderId}`}
                title="Open"
                icon="bi bi-eye-fill"
            />
            <ContextMenuItem href="#" icon="bi bi-share" title="Share" />
            <ContextMenuItem
                href="#"
                icon="bi bi-star"
                title="Add to starred"
            />

            <ContextMenuItem href="#" icon="bi bi-pen" title="Rename" />
            <ContextMenuItem
                href="#"
                icon="bi bi-trash"
                title="Move to Trash"
                onClick={(e) => moveToTrash(e, folderId)}
            />
        </div>
    );
}
