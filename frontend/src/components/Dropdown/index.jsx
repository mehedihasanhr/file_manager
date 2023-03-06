import * as React from "react";
import { usePopper } from "react-popper";

export const DropdownContext = React.createContext();

// toggle button for dropdown
const DropdownToggle = ({ children, ...props }) => {
    const { toggle, setDDToggleRef } = React.useContext(DropdownContext);
    return (
        <div onClick={toggle} ref={setDDToggleRef} {...props}>
            {children}
        </div>
    );
};

// dropdown menu
const DropdownMenu = ({ children, ...props }) => {
    const { open, toggle, setDDMenuRef, styles, attributes } =
        React.useContext(DropdownContext);
    const ddRef = React.useRef(null);

    // if dropdown is open, close it when clicked outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ddRef.current && !ddRef.current.contains(event.target)) {
                open && toggle();
                clearTimeout(timeout);
            }
        };

        let timeout = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <div
            {...props}
            className={`absolute right-0 top-full z-10 ${
                open
                    ? "visible pointer-events-auto"
                    : "invisible pointer-events-none"
            } ${props.className}`}
            style={styles.popper}
            ref={setDDMenuRef}
            onMouseUp={toggle}
            {...attributes.popper}
        >
            <div
                ref={ddRef}
                className="bg-white shadow-md shadow-gray-300 rounded-md py-2 px-2"
            >
                {children}
            </div>
        </div>
    );
};

// dropdown

// dropdown
function Dropdown({ children }) {
    const [open, setOpen] = React.useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const [DDToggleRef, setDDToggleRef] = React.useState(null);
    const [DDMenuRef, setDDMenuRef] = React.useState(null);

    const { styles, attributes } = usePopper(DDToggleRef, DDMenuRef, {
        placement: "bottom-end",

        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 6],
                },
            },
        ],
    });

    return (
        <div className="relative">
            <DropdownContext.Provider
                value={{
                    open,
                    toggle,
                    setDDToggleRef,
                    setDDMenuRef,
                    styles,
                    attributes,
                }}
            >
                {children}
            </DropdownContext.Provider>
        </div>
    );
}

Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;

export default Dropdown;
