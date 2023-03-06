import { ModalProvider } from "./ModalContext";

export default function ContextProvider({ children }) {
    return <ModalProvider>{children}</ModalProvider>;
}
