import * as React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";

export default function FileItem({ type = "", ext, name }) {
    const ref = React.useRef(null);

    const fileTypes = {
        music: "/icons/music-file.svg",
        video: "/icons/video-file.svg",
        image: "/icons/image-file.svg",
        document: "/icons/doc-file.svg",
        compressed: "/icons/compressed-file.svg",
        coding: "/icons/coding-file.svg",
        pdf: "/icons/pdf-file.svg",
    };

    const fileType = fileTypes[type] || "others-file.svg";

    return (
        <div
            ref={ref}
            data-target-type="file"
            data-file-id="file-id"
            className=" w-full flex items-center justify-between gap-10 border-b border-slate-100 hover:bg-yellow-50/50 px-4 py-2 hover:rounded-lg"
        >
            <div className="pointer-events-none flex items-center justify-between gap-4 w-full">
                <div className="flex items-center">
                    <div className="">
                        <img src={fileType} alt="file-icon" width={40} />
                    </div>
                    <div className="flex flex-col gap-1 ml-4">
                        <div className="text-base font-medium">
                            web-development.svg
                        </div>
                        <span className="text-xs text-gray-500">.{ext}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">@Mehedi Hasan</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        January 28, 2023
                    </span>
                </div>
            </div>

            <Dropdown>
                <Dropdown.Toggle>
                    <div className="flex items-center gap-2 w-6 h-6 rounded-full hover:cursor-pointer">
                        <i className="bi bi-three-dots" />
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex flex-col w-52">
                            <DropdownItem
                                icon="bi bi-eye-fill"
                                title="Preview"
                            />
                            <DropdownItem
                                icon="bi bi-share-fill"
                                title="Share"
                            />
                            <DropdownItem
                                icon="bi bi-star-fill"
                                title="Add to starred"
                            />
                            <DropdownItem
                                icon="bi bi-pen-fill"
                                title="Rename"
                            />
                            <DropdownItem
                                icon="bi bi-trash-fill"
                                title="Move to Trash"
                            />
                        </div>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

/*
 ** CONTEXT MENU ITEM **
 */

const DropdownItem = ({ title, icon, ...props }) => {
    return (
        <Link
            to="/"
            className="flex items-center space-x-2 text-base px-2 py-2 hover:bg-slate-100 hover:rounded-md hover:text-black"
            {...props}
        >
            <i className={`${icon} text-gray-500`} />
            <span className="text-gray-700">{title}</span>
        </Link>
    );
};
