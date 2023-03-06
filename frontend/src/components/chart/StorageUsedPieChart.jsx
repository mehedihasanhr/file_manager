import { Cell, Pie, PieChart } from "recharts";

export default function StorageUsedPieChart({ data }) {
    return (
        <PieChart width={280} height={140}>
            <Pie
                data={data}
                width={400}
                height={150}
                cx={140}
                cy={110}
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={110}
                dataKey="value"
                paddingAngle={0}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={data[index].color} />
                ))}
            </Pie>

            <text
                x={140}
                y={90}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={24}
                fill="#666"
            >
                <tspan fontSize={24} className="font-bold">
                    {data[0].value} <tspan fontSize={12}>GB</tspan>
                </tspan>
            </text>

            <text
                x={140}
                y={110}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fill="#666"
            >
                Used
            </text>
        </PieChart>
    );
}
