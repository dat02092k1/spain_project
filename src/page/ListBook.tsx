import React from 'react'
import { useStoreState } from '../store/hook';

function ListBook() {
    const currentUser = useStoreState((state) => state.currentUser);
    const todos = useStoreState((state) => state.todos);
  return (
    <>
    {currentUser?.loggedIn ? <div><div><h2>ListBook</h2></div>
    <div>
      {todos.map((todo, idx) => (
        <div key={idx}>{todo}</div>
      ))}
    </div></div>
    : <div>Not found</div>
    }
     
    </>
  )
}

export default ListBook