import { useState } from "react";
import PopUpExpenses from "../PopUpExpenses";
import style from "../../Style/table.module.scss";

export default function Expenses({ categories, expenses, updateExpenses }) {
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [edit, setEdit] = useState();

  const getLinkImage = (id) => {
    const res = categories.find((x) => x.id === id);
    return res ? res.image : "";
  };

  const getTitle = (id) => {
    const res = categories.find((x) => x.id === id);
    return res ? res.title : "";
  };

  const getTotalCost = (id, quantity) => {
    const res = categories.find((x) => x.id === id);
    return res ? res.price * quantity : "error";
  };

  return (
    <div className={style.tableContainer}>
      <h1>ALL EXPENSES</h1>
      <button onClick={() => setShowAddPopUp(true)}>Add</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Total Cost</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((val) => (
            <tr key={val.id}>
              <td>{val.date}</td>
              <td>{getTitle(val.productId)}</td>
              <td>{val.quantity}</td>
              <td>
                <img
                  src={getLinkImage(val.productId)}
                  alt={getTitle(val.productId)}
                />
              </td>
              <td>{getTotalCost(val.productId, val.quantity)}</td>
              <td>
                <button
                  onClick={() => {
                    setShowEditPopUp(true);
                    setEdit({
                      id: val.id,
                      date: val.date,
                      productId: val.productId,
                      quantity: val.quantity,
                    });
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => updateExpenses(val.id, null)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPopUp && (
        <PopUpExpenses
          type={"Add"}
          categories={categories}
          updateExpenses={updateExpenses}
          setShowAddPopUp={setShowAddPopUp}
        />
      )}
      {showEditPopUp && (
        <PopUpExpenses
          type={"Edit"}
          categories={categories}
          updateExpenses={updateExpenses}
          setShowEditPopUp={setShowEditPopUp}
          edit={edit}
        />
      )}
    </div>
  );
}
