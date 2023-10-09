import React from 'react'
import BookContainer from '../components/BookContainer/BookContainer'
import Header from '../components/Header/Header'
import { useStoreActions, useStoreState } from '../store/hook';
import { getBook } from "../repository/book";
import Spinner from '../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

function ShopBook() {
  const books = useStoreState((state) => state.books);
  const currentUser = useStoreState((state) => state.currentUser);
  const setBook = useStoreActions((actions) => actions.setBook);

  React.useEffect(() => {
    const fetchBooks = async () => {
        const fetchedBooks = await getBook();
        setBook(fetchedBooks);
    }
    
    fetchBooks();
  }, [])

  return (
    <>
    {currentUser?.loggedIn 
  ? 
  <>
  <Header />
    <BookContainer books={books} />  
  {!books && <Spinner/>}
  </> 
  : 
  <Link to="/signin">Signin first</Link>
  }
  </>
  )
}

export default ShopBook