import logo from "../logo.svg";

export default function Logo() {
    return (
        <div className="flex items-center gap-3 py-4 px-4 border-b border-dashed">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                {!logo ? null : (
                    <img
                        src={logo}
                        alt="logo"
                        className="w-full h-full object-fill"
                    />
                )}
            </div>
            <span className="font-medium text-gray-600 text-xl">
                File Manager
            </span>
        </div>
    );
}
