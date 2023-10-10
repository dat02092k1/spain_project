import { useState } from "react";
import { IBook } from "../../types/interface";
import Popup from "../Popup/Popup";
import { delBook } from "../../repository/book";
import { useStoreActions } from "../../store/hook";
import Swal from "sweetalert2";
import "./BookContainer.css";
import { motion } from "framer-motion";

function BookContainer(props: any) {
  const { books } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<IBook | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [deleteIconVisibility, setDeleteIconVisibility] = useState<boolean[]>(
    Array(books.length).fill(false)
  );
  const removeBook = useStoreActions((actions) => actions.removeBook);

  const handleEdit = (data: IBook) => {
    setIsEdit(true);
    setEditData(data);
    setPopupVisible(true);
  };

  const openPopup = () => {
    setPopupVisible(true);
    setIsEdit(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setIsEdit(false); // Reset edit mode when closing the popup
    setEditData(null);
  };

  const handleMouseEnter = (index: number) => {
    const updatedVisibility = [...deleteIconVisibility];
    updatedVisibility[index] = true;
    setDeleteIconVisibility(updatedVisibility);
  };

  const handleMouseLeave = (index: number) => {
    const updatedVisibility = [...deleteIconVisibility];
    updatedVisibility[index] = false;
    setDeleteIconVisibility(updatedVisibility);
  };

  const handleRemove = async (id: string) => {
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
  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
      <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
        Skcript Blog
      </h2>
      <p className="mb-20 text-lg text-gray-500">
        Comes directly from the desk of engineers, creators and managers at
        Skcript.
      </p>

      <div className="m-5 flex justify-end">
        <button
          onClick={openPopup}
          className="p-4 bg-[#c391fa] text-[#ffffff] rounded hover:bg-[#9e58e9]"
        >
          Create book
        </button>
      </div>

      <Popup
        isVisible={isPopupVisible}
        onClose={closePopup}
        isEdit={isEdit}
        initialData={editData}
      />

      <motion.div
        className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        animate={{ rotate: 360 }}
        transition={{ type: "spring", stiffness: 50, velocity: 2 }}
      >
        {books.map((book: IBook, index: number) => (
          <div key={index}>
            <motion.div
              onDoubleClick={() => handleEdit(book)}
              className="hover:cursor-pointer relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <img
                src={book.imgUrl ?? "https://kutty.netlify.app/brand/og.png"}
                className="object-cover w-full h-56 mb-5 bg-center rounded"
                alt="Kutty"
                loading="lazy"
              />
              {deleteIconVisibility[index] && (
                <button
                  key={index}
                  className="absolute text-[#fff] bottom-0 right-2"
                  onClick={() => handleRemove(book._id)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              )}
            </motion.div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              <a href="" className="text-gray-900 hover:text-purple-700">
                {book.name}
              </a>
            </h2>
            <p className="mb-3 text-sm font-normal text-gray-500">
              Ký giả: {book.author}
            </p>
            <p className="mb-3 text-sm font-normal text-gray-500">
              <a
                href=""
                className="font-medium text-gray-900 hover:text-purple-700"
              >
                {book.publish ? "Đã phát hành" : "Chưa phát hành"}
              </a>
              • {book.price}$
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default BookContainer;
