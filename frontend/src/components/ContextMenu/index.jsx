import * as React from "react";
import { usePopper } from "react-popper";

const DropdownContext = React.createContext();

/*
 ** TOGGLE**
 */
const Toggle = ({ children, ...props }) => {
    return <>{children}</>;
};

/*
 ** CONTEXT MENU **
 */

const Menu = ({ children, ...props }) => {
    const { open, toggle, setPopperElement, styles, attributes } =
        React.useContext(DropdownContext);

    const contextRef = React.useRef(null);

    // close context menu when clicked outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                open &&
                contextRef.current &&
                !contextRef.current.contains(event.target)
            ) {
                toggle();
            }

            clearTimeout(timeout);
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
            className={`absolute right-0 top-full z-10 bg-white shadow-md shadow-gray-300 rounded-md py-2 px-2 ${
                open
                    ? "visible pointer-events-auto"
                    : "invisible pointer-events-none"
            }`}
            style={styles.popper}
            ref={setPopperElement}
            onMouseUp={() => toggle()}
            {...attributes.popper}
        >
            <div ref={contextRef}>{children}</div>
        </div>
    );
};

/*
 ** CONTEXT MENU COMPONENT **
 */

function ContextMenu({
    children,
    menuRenderer, // custom menu renderer
    ...props
}) {
    const [open, setOpen] = React.useState(false);
    const [target, setTarget] = React.useState(null); // target element
    const [virtualRef, setVirtualRef] = React.useState({
        getBoundingClientRect: () => ({
            width: 0,
            height: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }),
    });

    /*
     ** SET VIRTUAL REFERENCE ELEMENT FOR CONTEXT MENU **
     */
    const setReferenceElement = (e) => {
        e.preventDefault();
        setTarget(e.target);
        toggle();
        setVirtualRef({
            getBoundingClientRect: () => ({
                width: 0,
                height: 0,
                top: e.clientY,
                right: e.clientX,
                bottom: e.clientY,
                left: e.clientX,
            }),
        });
    };

    /*
     **TOGGLE CONTEXT MENU **
     */
    const toggle = () => {
        setOpen(!open);
    };

    const [popperElement, setPopperElement] = React.useState(null); // popper element

    /*
     ** POPPER INSTANCE FOR CONTEXT MENU POSITIONING & STYLING **
     */
    const { styles, attributes } = usePopper(virtualRef, popperElement, {
        placement: "bottom-start",
    });

    return (
        <div
            id="context-menu"
            className="relative"
            onContextMenu={setReferenceElement}
            {...props}
        >
            <DropdownContext.Provider
                value={{
                    open,
                    toggle,
                    setVirtualRef,
                    setPopperElement,
                    styles,
                    attributes,
                }}
            >
                {children}
                <Menu>{menuRenderer ? menuRenderer(target) : null}</Menu>
            </DropdownContext.Provider>
        </div>
    );
}

ContextMenu.Toggle = Toggle;

export default ContextMenu;
