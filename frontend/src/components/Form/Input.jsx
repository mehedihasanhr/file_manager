export default function Input({
    type,
    value,
    placeholder,
    onChange,
    className,
    ...props
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`px-3 py-2 border border-gray-300 focus:border-slate-500 outline-none rounded-md ${className}`}
            {...props}
        />
    );
}
