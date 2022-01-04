import { useState } from "react";
import clsx from "clsx";
import style from "../../Style/popup.module.scss";

export default function PopUpCategory({
  updateCategories,
  setShowAddPopUp,
  setShowEditPopUp,
  edit,
  type,
}) {
  const [category, setCategory] = useState(edit ? edit.category : "");
  const [title, setTitle] = useState(edit ? edit.title : "");
  const [price, setPrice] = useState(edit ? edit.price : 0);
  const [image, setImage] = useState(edit ? edit.image : "");
  const [description, setDescription] = useState(edit ? edit.description : "");

  const handleAdd = () => {
    if (category && price && image && description) {
      updateCategories(null, { category, price, image, description, title });
      setShowAddPopUp(false);
    } else alert("Bạn phải nhập đầy đủ thông tin");
  };

  const handleEdit = () => {
    if (category && price && image && description) {
      updateCategories(edit.id, { category, price, image, description, title });
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
        <h2>
          {type === "Add" ? "Add Category" : `Edit Category id ${edit.id}`}
        </h2>
        <ul className={style.form_style_1}>
          <li>
            <label>
              Category <span className={style.required}>*</span>
            </label>
            <input
              autoFocus
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              type="text"
              className={style.field_long}
            />
          </li>
          <li>
            <label>
              Title <span className={style.required}>*</span>
            </label>
            <input
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className={style.field_long}
            />
          </li>
          <li>
            <label>
              Price <span className={style.required}>*</span>
            </label>
            <input
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              min={0}
              className={style.field_long}
            />
          </li>
          <li>
            <label>
              Link image <span className={style.required}>*</span>
            </label>
            <input
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setImage(e.target.value)}
              value={image}
              type="text"
              className={style.field_long}
            />
          </li>
          <li>
            <label>
              Description <span className={style.required}>*</span>
            </label>
            <textarea
              onKeyUp={(e) => handlePressKeyboard(e)}
              onChange={(e) => setDescription(e.target.value)}
              className={clsx(style.field_long, style.field_textarea)}
              value={description}
              spellCheck="false"
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
