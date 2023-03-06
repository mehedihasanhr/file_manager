export default function Button({
    type = "button",
    className = "",
    children,
    onClick,
    title,
    ...props
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-md font-medium ${className}`}
            {...props}
        >
            {children || title}
        </button>
    );
}
