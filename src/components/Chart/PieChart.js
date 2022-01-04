import { PieChart, Pie, Tooltip } from "recharts";

export default function TinyPieChart({ data }) {
  return (
    <>
      <PieChart width={1000} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          outerRadius={150}
          fill="red"
          label
        />
        <Tooltip />
      </PieChart>
    </>
  );
}
