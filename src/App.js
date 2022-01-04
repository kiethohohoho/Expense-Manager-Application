import Header from "./components/Header";
import Expenses from "./components/Expenses";
import Categories from "./components/Categories";
import { useEffect, useState, useCallback } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Chart from "./components/Chart";

function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  //fake data
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then((res) => res.json())
      .then((json) => {
        let expFixDate = json.map((val, index) => {
          return { ...val, date: val.date.substr(0, 23), id: index + 1 };
        });
        let countId = 0;
        let allExp = expFixDate.map((val) => {
          return val.products.map((prod) => {
            countId++;
            return {
              id: countId,
              date: val.date,
              productId: prod.productId,
              quantity: prod.quantity,
            };
          });
        });
        setExpenses(allExp.flat(Infinity));
      });
  }, []);

  const updateCategories = useCallback((prevId, newObj) => {
    setCategories((prev) => {
      if (prevId && newObj) {
        // edit
        let oldObj = prev.find((x) => x.id === prevId);
        newObj = { ...oldObj, ...newObj };
        prev[prev.indexOf(prev.find((x) => x.id === prevId))] = newObj;
        return [...prev];
      } else if (prevId) {
        //delete
        const newCategories = prev.filter((val) => val.id !== prevId);
        return newCategories;
      } else {
        // add
        newObj = { id: prev[prev.length - 1].id + 1, ...newObj };
        return [...prev, newObj];
      }
    });
  }, []);

  const updateExpenses = useCallback((prevId, newObj) => {
    setExpenses((prev) => {
      if (prevId && newObj) {
        // edit
        let oldObj = prev.find((x) => x.id === prevId);
        newObj = { ...oldObj, ...newObj };
        prev[prev.indexOf(prev.find((x) => x.id === prevId))] = newObj;
        return [...prev];
      } else if (prevId) {
        //delete
        const newExpenses = prev.filter((val) => val.id !== prevId);
        return newExpenses;
      } else {
        // add
        newObj = { id: prev[prev.length - 1].id + 1, ...newObj };
        return [...prev, newObj];
      }
    });
  }, []);

  return (
    <div>
      <Header />

      <nav className="nav">
        <Link to="/">Expenses</Link> | <Link to="/categories">Categories</Link>{" "}
        | <Link to="/chart">Chart</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Expenses
              categories={categories}
              expenses={expenses}
              updateExpenses={updateExpenses}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <Categories
              categories={categories}
              updateCategories={updateCategories}
            />
          }
        />
        <Route
          path="/chart"
          element={<Chart categories={categories} expenses={expenses} />}
        />
      </Routes>
    </div>
  );
}
export default App;
