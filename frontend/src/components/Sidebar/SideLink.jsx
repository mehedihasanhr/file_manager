import { NavLink } from "react-router-dom";

export const SideLink = ({
    icon,
    className = "",
    title,
    href = "/",
    ...rest
}) => {
    return (
        <NavLink
            to={href}
            className={`flex items-center text-slate-700 gap-3 px-4 text-lg py-2 rounded-lg hover:bg-slate-100 hover:text-slate-700 ${className}
            `}
            {...rest}
            style={({ isActive }) => ({
                background: isActive ? "rgb(51 65 85/5%)" : "",
            })}
        >
            {rest.children || (
                <>
                    {icon && <i className={`${icon} text-slate-500`} />}
                    <span>{title}</span>
                </>
            )}
        </NavLink>
    );
};
