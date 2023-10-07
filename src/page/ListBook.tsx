import React from "react";
import { useStoreActions, useStoreState } from "../store/hook";
import Header from "../components/Header/Header";
import Content from "../components/Content/Content";
import { getBook } from "../repository/book";
import { Link } from "react-router-dom";

function ListBook() {
  const currentUser = useStoreState((state) => state.currentUser);
  const setBook = useStoreActions((actions) => actions.setBook);

  React.useEffect(() => {
    const fetchBooks = async () => {
        const fetchedBooks = await getBook();
        setBook(fetchedBooks);
    }
    
    fetchBooks();
  }, [])
  return <>{currentUser?.loggedIn 
  ? 
  <>
  <Header />
  <Content/>
  </> 
  : 
  
  <Link to="/signin">Signin first</Link>}</>;
}

export default ListBook;
