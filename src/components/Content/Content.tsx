import { useState } from "react";
import { useStoreActions } from "../../store/hook";
import { delBook } from "../../repository/book";
import { IBook } from "../../types/interface";
import "./Content.css";
import Popup from "../Popup/Popup";
import Swal from "sweetalert2";
import Spinner from "../Spinner/Spinner";
import { IBookProp } from "../../types/propsType";

function Content(props: IBookProp) {
  // const [books, setBooks] = useState<IBook[]>([]);
  const books = props.books;
  const removeBook = useStoreActions((actions) => actions.removeBook);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<IBook | null>(null);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
    setIsEdit(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setIsEdit(false); // Reset edit mode when closing the popup
    setEditData(null);
  };

  const deleteBook = async (id: string) => {
    try {
      await delBook(id);
      removeBook(id);
    } catch (error) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error: " + error,
        showConfirmButton: true,
      });
    }
  };

  const handleEdit = (data: IBook) => {
    setIsEdit(true);
    setEditData(data);
    setPopupVisible(true);
  };

  return (
    <>
    {
      books.length > 0 ? (
        <>
        <div className="m-5 flex justify-end">
        <button
          onClick={openPopup}
          className="p-4 bg-red-600 text-[#ffffff] rounded"
        >
          Add book
        </button>
      </div>
      <Popup
        isVisible={isPopupVisible}
        onClose={closePopup}
        isEdit={isEdit}
        initialData={editData}
      />

      <div className="contain-table overflow-x-auto">
        <table className="striped-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Book</th>
              <th>Author</th>
              <th>Price</th>
              <th>Public</th>
              <th colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books ? (
              books.map((book, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.price}$</td>
                  <td>{book.publish ? "Yes" : "No"}</td>
                  <td className="text-right" onClick={() => handleEdit(book)}>
                    <button>Edit</button>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="button muted-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>heh</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </>
      ) : (<div>
        <Spinner/>
      </div>)
    }
    </>
  )
}

export default Content;
