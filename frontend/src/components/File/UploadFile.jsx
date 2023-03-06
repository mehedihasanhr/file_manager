import * as React from "react";
import { ModalContext } from "../../context/ModalContext";
import Modal from "../modal/Modal";

export default function UplaodFile({ show, setShow, parent }) {
    const modal = React.useContext(ModalContext);
    return (
        <Modal open={true} close={setShow} showHeader={true}>
            <div className="flex flex-col justify-between items-center px-8 pb-16 w-[500px]">
                <div className="text-center mb-10">
                    <h5 className="font-medium leading-[36px]">Upload File</h5>
                    <p className="text-xs text-gray-400">
                        Upload your files to the current folder
                    </p>
                </div>

                <form className="w-full">
                    <div className="relative w-full h-64 border-2 border-dashed hover:bg-gray-50">
                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer rounded-md"
                        />

                        <div className="flex flex-col items-center justify-center w-full h-full ">
                            <i className="bi bi-cloud-arrow-up text-6xl text-gray-300 " />

                            <p className="text-sm text-gray-500">
                                Drag and drop your files here
                            </p>

                            <p className="text-sm text-gray-400">
                                or
                                <span className="text-blue-500 cursor-pointer">
                                    {" "}
                                    browse
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* submit button */}
                </form>
            </div>
        </Modal>
    );
}
