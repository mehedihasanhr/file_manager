import React from "react";
import { createPortal } from "react-dom";
import Button from "../Button";

export default function Modal({
    title,
    children,
    open,
    close,
    showHeader = true,
    showCloseButton = true,
}) {
    const ref = React.useRef();
    const wrapperRef = React.useRef();

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                close();
            }
        };

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                close();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const modalDOM = document.getElementById("root-modal");
    if (!modalDOM || !children || !open) return null;

    return createPortal(
        <div
            ref={wrapperRef}
            className="w-screen h-screen bg-black/10 fixed top-0 left-0 z-[999] flex items-center justify-center"
        >
            <div ref={ref} className="bg-white rounded-lg min-w-fit">
                {showHeader && (
                    <div className="flex items-center justify-between py-2">
                        <h6 className="font-medium px-4">{title}</h6>
                        {showCloseButton && (
                            <Button
                                aria-describedby="modalCloseButton"
                                type="button"
                                className="px-4 text-gray-400 hover:text-red-500"
                                onClick={close}
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                                    />
                                </svg>
                            </Button>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>,
        modalDOM
    );
}
