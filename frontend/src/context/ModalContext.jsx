import React, { createContext } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [state, setState] = React.useState({
        modal: true,
        parent: null,
        modalType: null,
    });

    const modalClose = () => {
        setState({
            modal: false,
            parent: null,
            folderName: "",
            modalType: null,
        });
    };

    const modalOpen = (modalType, parent) => {
        setState({
            modal: true,
            parent,
            modalType,
        });
    };

    const modal = {
        modal: state.modal,
        parent: state.parent,
        modalType: state.modalType,
        close: modalClose,
        open: modalOpen,
    };

    return (
        <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
    );
};
