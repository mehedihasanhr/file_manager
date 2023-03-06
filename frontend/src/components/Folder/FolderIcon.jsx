import React from "react";
import { useNavigate } from "react-router-dom";

export default function FolderIcon({ folder }) {
    const navigate = useNavigate();
    const ref = React.useRef();
    const wrapperRef = React.useRef();

    /*
     ** SWITCH CASE FOR FOLDER ICONS **
     */
    const folderIcon = () => {
        let type = folder.type.toLowerCase();
        switch (type) {
            case "music":
                return "/icons/music-folder.svg";
            case "videos":
                return "/icons/video-folder.svg";
            case "images":
                return "/icons/image-folder.svg";
            case "documents":
                return "/icons/doc-folder.svg";
            case "compressed":
                return "/icons/compressed-folder.svg";
            case "archives":
                return "/icons/arc-folder.svg";
            case "application":
                return "/icons/app-folder.svg";
            case "others":
                return "/icons/others.svg";
            default:
                return "/icons/folder.svg";
        }
    };

    // handle click outside folder icon
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target) &&
                ref.current.checked
            ) {
                ref.current.checked = false;
                ref.current.classList.add("invisible");
                ref.current.classList.remove("visible");
                wrapperRef.current.classList.remove("bg-yellow-50/50");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // handle double click on folder icon
    const handleDoubleClick = (e) => {
        e.preventDefault();
        const folderId = e.target.dataset.folderId;
        if (folderId) {
            navigate(`/folder/${folderId}`);
        }
    };
    // handle click on folder icon
    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.targetType === "folder") {
            ref.current.checked = !ref.current.checked;
            if (ref.current.checked) {
                e.target.classList.add("bg-yellow-50/50");
                ref.current.classList.add("visible");
                ref.current.classList.remove("invisible");
            } else {
                e.target.classList.remove("bg-yellow-50/50");
                ref.current.classList.add("invisible");
                ref.current.classList.remove("visible");
            }
        }
    };

    return (
        <div
            data-target-type="folder"
            data-folder-id={folder._id}
            onClick={handleClick}
            ref={wrapperRef}
            onDoubleClick={handleDoubleClick}
            className="bg-white hover:bg-yellow-50/50"
        >
            <div className="relative rounded-lg border border-slate-100 w-40 h-40 flex items-center flex-col p-4 text-center pointer-events-none select-none">
                <input
                    ref={ref}
                    type="checkbox"
                    readOnly
                    className="absolute top-3 left-3 invisible"
                />
                <div className="flex items-center gap-3 select-none">
                    <img src={folderIcon()} alt="folder_icon" width={80} />
                </div>

                <div className="font-semibold">{folder.name}</div>
                <span className="text-xs text-gray-500">0 files</span>
            </div>
        </div>
    );
}
