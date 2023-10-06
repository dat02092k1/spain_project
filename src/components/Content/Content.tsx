import React, {useEffect, useState} from 'react'
import { useStoreState } from '../../store/hook';
import { getBook } from '../../repository/book';
import { IBook } from '../../types/interface';
import './Content.css';

function Content() {
    const todos = useStoreState((state) => state.todos);
    // const [books, setBooks] = useState<IBook[]>([]);
    const books = useStoreState((state) => state.books);
  
  return (
    <>
    <div className='m-5 flex justify-end'>
    <button className='p-4 bg-red-600 text-[#ffffff] rounded'>Add book</button>
    </div>

    <div className="contain-table overflow-x-auto">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
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
                <td>{i+1}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td>{book.publish ? 'Yes' : 'No'}</td>
                <td className="text-right">
                  <button
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>hehe</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Content