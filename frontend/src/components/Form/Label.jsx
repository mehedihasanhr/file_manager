


export default function Label({ children, className = "flex-col", ...props }) {
    return (
        <label
            className={`text-slate-500 flex gap-y-1 ${className}`}
            {...props}
        >
            {children}
        </label>
    )
}