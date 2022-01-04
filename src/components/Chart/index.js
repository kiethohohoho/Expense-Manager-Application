import TinyPiechart from "./PieChart";
import TinyBarChart from "./BarChart";
import { useLayoutEffect, useState } from "react";

export default function Chart({ categories, expenses }) {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    if (categories.length && expenses.length) {
      const arr = expenses.map((exp) => {
        return {
          name: categories.find((x) => x.id === exp.productId).category,
          value:
            exp.quantity * categories.find((x) => x.id === exp.productId).price,
        };
      });

      let newData = Object.values(
        arr.reduce((result, { name, value }) => {
          if (!result[name]) result[name] = { name, value: 0 };
          result[name].value += value;
          return result;
        }, {})
      );

      setData(newData);
    }
  }, [categories, expenses]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 30,
        justifyContent: "center",
        marginLeft: "-20%",
      }}
    >
      <TinyPiechart data={data} />
      <TinyBarChart data={data} />
    </div>
  );
}
