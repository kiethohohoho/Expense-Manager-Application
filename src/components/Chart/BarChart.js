// import "./styles.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function TinyBarChart({ data }) {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend wrapperStyle={{position: 'relative', marginTop: 5}}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
}
