import React from "react";
import uuid from "react-uuid";
import "./Popup.css";
import Input from "../InputField/Input";
import { useStoreActions } from "../../store/hook";
import { createBook, updateBook } from "../../repository/book";
import Swal from "sweetalert2";
import { IPropupType } from "../../types/propsType";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { motion } from "framer-motion";
import { UtilConstants } from "../../shared/constant";

function Popup(props: IPropupType) {
  const { isVisible, onClose, isEdit, initialData } = props;
  const [book, setBook] = React.useState(isEdit ? initialData?.name : "");
  const [author, setAuthor] = React.useState(isEdit ? initialData?.author : "");
  const [price, setPrice] = React.useState(isEdit ? initialData?.price : "");
  const [publish, setPublish] = React.useState(
    isEdit ? initialData?.publish : ""
  );
  const [image, setImage] = React.useState(isEdit ? initialData?.imgUrl : "");
  const [loading, setLoading] = React.useState(false);
  let popupRef = React.useRef(null);

  const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME;

  const addBook = useStoreActions((actions) => actions.addBook);
  const updateBookStore = useStoreActions((actions) => actions.updateBookStore);

  React.useEffect(() => {
    setBook(isEdit ? initialData?.name : "");
    setAuthor(isEdit ? initialData?.author : "");
    setPrice(isEdit ? initialData?.price : "");
    setPublish(isEdit ? initialData?.publish : "");
    setImage(isEdit ? initialData?.imgUrl : "");
  }, [isEdit, initialData]);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef?.current?.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!book || !author || !price) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    try {
      const bookInfo = {
        _id: initialData ? initialData._id : uuid(),
        name: book,
        author: author,
        price: price,
        publish: publish === "true" ? true : false,
        imgUrl: image ? image : "https://kutty.netlify.app/brand/og.png",
      };

      if (isEdit) {
        await updateBook(initialData?._id ?? "", bookInfo);
        updateBookStore({ bookInfo, _id: initialData?._id ?? "" });
      } else {
        await createBook(bookInfo);
        addBook(bookInfo);
      }

      onClose();
      setBook("");
      setAuthor("");
      setPrice("");
      setPublish("");
    } catch (error) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error: " + error,
        showConfirmButton: true,
      });
    }
  };

  const handleImageUpload = async (e: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "wv59iewr");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setImage(res.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isVisible ? (
        <motion.div
          className=" popup z-[100000000]"
          variants={UtilConstants.variants}
          initial="initial"
          animate="visible"
          exit="exit"
        >
          <div className="popup-content" ref={popupRef}>
            <div className="header flex justify-end">
              <button onClick={onClose}>X</button>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="input-container w-[500px]">
                <Input label="Book" data={book} setData={setBook} />
                <Input label="Author" data={author} setData={setAuthor} />

                <label className="block" htmlFor="">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {loading ? (
                  <Spinner />
                ) : image ? (
                  <div>
                    <motion.img
                      src={image}
                      alt="Uploaded"
                      style={{ maxWidth: "70%" }}
                      whileHover={{ scale: 0.8 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  </div>
                ) : null}

                <Input label="Price" data={price} setData={setPrice} />
                <Input
                  label="Public"
                  data={publish?.toString()}
                  setData={setPublish}
                />
              </div>

              <div className="flex justify-end">
                <button className="close bg-[#2979ff] p-3 rounded">SAVE</button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Popup;
