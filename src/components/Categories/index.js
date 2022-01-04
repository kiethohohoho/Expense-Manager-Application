import { useState } from "react";
import PopUpCategory from "../PopUpCategory";
import style from "../../Style/table.module.scss";

export default function Categories({ categories, updateCategories }) {
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [edit, setEdit] = useState();

  return (
    <div className={style.tableContainer}>
      <h1>ALL CATEGORIES</h1>
      <button onClick={() => setShowAddPopUp(true)}>Add</button>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Category</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((val, ind) => (
            <tr key={val.id}>
              <td>{ind + 1}</td>
              <td>{val.category}</td>
              <td>{val.title}</td>
              <td>{val.description}</td>
              <td>
                <img src={val.image} alt={val.categories} />
              </td>
              <td>{val.price}</td>
              <td>
                <button
                  onClick={() => {
                    setShowEditPopUp(true);
                    setEdit(val);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => updateCategories(val.id, null)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPopUp && (
        <PopUpCategory
          type={"Add"}
          updateCategories={updateCategories}
          setShowAddPopUp={setShowAddPopUp}
        />
      )}
      {showEditPopUp && (
        <PopUpCategory
          type={"Edit"}
          updateCategories={updateCategories}
          setShowEditPopUp={setShowEditPopUp}
          edit={edit}
        />
      )}
    </div>
  );
}
