import { Link } from "react-router-dom";

export default function ContextMenuItem({
    icon,
    title,
    onClick,
    href = "#",
    ...props
}) {
    return (
        <Link
            to={href}
            onClick={onClick}
            className="flex items-center space-x-2 text-base px-2 py-2 hover:bg-slate-100 hover:rounded-md hover:text-black"
            {...props}
        >
            <i className={`${icon} text-gray-500`} />
            <span className="text-gray-700">{title}</span>
        </Link>
    );
}
