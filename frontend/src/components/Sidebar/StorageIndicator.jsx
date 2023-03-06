// colors

import StorageUsedPieChart from "../chart/StorageUsedPieChart";

export default function StorageIndicator({ used = 100, total = 256 }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-base font-medium text-gray-700">
                    Storage
                </span>
            </div>
            <div className="pointer-events-none border-b pb-6">
                <StorageUsedPieChart
                    data={[
                        { name: "Used", value: used, color: "#FFB800" },
                        {
                            name: "Free",
                            value: Math.floor(total - used),
                            color: "#fff1cc",
                        },
                    ]}
                />

                <div className="px-6 flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">
                            Total Space
                        </span>
                        <span className="text-lg font-medium">{used} GB</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">
                            Free Space
                        </span>
                        <span className="text-lg font-medium">{total} GB</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
