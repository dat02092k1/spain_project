import { useState, useEffect } from 'react' 
import { addSpain, getSpain, updateSpain } from './repository/spain';
import { firestore } from './firebase/firebase';
import { RouteType } from './types/interface';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './page/Signin';
import Signup from './page/Signup';
import ListBook from './page/ListBook';

function App() {
  const ROUTE: Array<RouteType> = [
    {
      path: "/signin",
      component: <Signin />,
      isPublic: true,
    },
    {
      path: "/signup",
      component: <Signup />,
      isPublic: true,
    },
    {
      path: "/book",
      component: <ListBook />,
      isPublic: true,
    }
  ];
   
  return (
    <>
      <BrowserRouter>
     
     <Routes>
       {ROUTE.map((e, i) => (
         <Route key={i} path={e.path} element={e.component}/>
       ))}       
     </Routes>
      
   </BrowserRouter>
       
    </>
  )
}

export default App
