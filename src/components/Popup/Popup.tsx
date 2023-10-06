import React from 'react'
import uuid from 'react-uuid';
import './Popup.css';
import Input from '../InputField/Input';
import { useStoreActions } from '../../store/hook';
import { createBook, getBook, updateBook } from '../../repository/book';

function Popup(props: any) {
    const { isVisible, onClose, isEdit, initialData } = props;
    const [book, setBook] = React.useState(isEdit ? initialData.name : 'Add bôk');
    const [author, setAuthor] = React.useState(isEdit ? initialData.author : 'Add author');
    const [price, setPrice] = React.useState(isEdit ? initialData.price : 'Add price');
    const [publish, setPublish] = React.useState(isEdit ? initialData.publish : 'Add public');
    const addBook = useStoreActions((actions) => actions.addBook);
    const updateBookStore = useStoreActions((actions) => actions.updateBookStore);

    React.useEffect(() => {
        setBook(isEdit ? initialData.name : 'Add book');
        setAuthor(isEdit ? initialData.author : 'Add author');
        setPrice(isEdit ? initialData.price : 'Add price');
        setPublish(isEdit ? initialData.publish : 'Add public');
    }, [isEdit, initialData])

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        console.log(initialData);
        const bookInfo = {
            _id: initialData? initialData._id : uuid(),
            name: book, 
            author: author,
            price: price,
            publish: (publish === 'true' ? true : false),
        }; 
         
        if (isEdit) {
            await updateBook(initialData._id, bookInfo); 
            updateBookStore({bookInfo, _id: initialData._id});
            getBook();
          } else {
            await createBook(bookInfo);
            addBook(bookInfo);
            getBook();
          }

        onClose();
        setBook('');
        setAuthor('');
        setPrice('');
        setPublish('');
     }
  return (
    <>
    {
        isVisible ?
        <div className="popup">
            
      <div className="popup-content">
      <div className='header flex justify-end'>
      <button onClick={onClose}>X</button>
      </div>
        <form action="" onSubmit={handleSubmit}>
        <div className='input-container w-[500px]'>
            <Input label="Book" data={book} setData={setBook} />
            <Input label="Author" data={author} setData={setAuthor} />
            <Input label="Price" data={price} setData={setPrice} />
            <Input label="Public" data={publish.toString()} setData={setPublish} />
        </div>
        
        <div className='flex justify-end'>
        <button className="close bg-[#2979ff] p-3 rounded">
                SAVE
            </button> 
        </div>
        </form>
      </div>
    </div>
    : <div></div>
    }
    </>
  )
}

export default Popup