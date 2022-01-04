import { useState, useEffect } from "react";
import style from "../../Style/popup.module.scss";

export default function PopUpExpenses({
  categories,
  updateExpenses,
  setShowAddPopUp,
  setShowEditPopUp,
  edit,
  type,
}) {
  const getTitle = (id) => {
    const res = categories.find((x) => x.id === id);
    return res ? res.title : "";
  };

  const [title, setTitle] = useState(edit ? getTitle(edit.productId) : "");
  const [date, setDate] = useState(edit ? edit.date : "");
  const [quantity, setQuantity] = useState(edit ? edit.quantity : 0);

  const categoryOption = categories.map((a) => {
    return { id: a.id, title: a.title };
  });

  const getProductId = (title) => {
    const res = categories.find((x) => x.title === title);
    return res ? res.id : "";
  };

  const handleAdd = () => {
    if (title && date && quantity) {
      updateExpenses(null, {
        date,
        productId: getProductId(title),
        quantity: quantity*1,
      });
      setShowAddPopUp(false);
    } else alert("Bạn phải nhập đầy đủ thông tin");
  };

  const handleEdit = () => {
    if (title && date && quantity) {
      updateExpenses(edit.id, {
        date,
        productId: getProductId(title),
        quantity: quantity,
      });
      setShowEditPopUp(false);
    } else alert("Bạn phải nhập đầy đủ thông tin");
  };

  const handleExit = () => {
    type === "Add" ? setShowAddPopUp(false) : setShowEditPopUp(false);
  };

  const handlePressKeyboard = (e) => {
    if (e.keyCode === 13) {
      type === "Add" ? handleAdd() : handleEdit();
    } else if (e.keyCode === 27) {
      handleExit();
    }
  };

  return (
    <div className={style.popup}>
      <div className={style.popup_inner}>
        {/* <form> */}
        <h2>{type === "Add" ? "Add Expense" : `Edit Expense id ${edit.id}`}</h2>
        <ul className={style.form_style_1}>
          <li>
            <label>
              Date <span className={style.required}>*</span>
            </label>
            <input
              autoFocus
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setDate(e.target.value)}
              defaultValue={date}
              type="datetime-local"
              className={style.field_long}
            />
          </li>
          <li>
            <label>
              Title <span className={style.required}>*</span>
            </label>
            <select
              onKeyUp={(e) => handlePressKeyboard(e)}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={style.field_long}
            >
              {categoryOption.map((val) => (
                <option key={val.id} value={val.title}>
                  {val.title}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label>
              Quantity <span className={style.required}>*</span>
            </label>
            <input
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              type="number"
              min={1}
              className={style.field_long}
            />
          </li>
          <li>
            {type === "Add" && <button onClick={handleAdd}>Add</button>}
            {type === "Edit" && <button onClick={handleEdit}>Edit</button>}{" "}
            <button onClick={handleExit}>Close</button>
          </li>
        </ul>
        {/* </form> */}
      </div>
    </div>
  );
}
