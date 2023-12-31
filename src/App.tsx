import { RouteType } from './types/interface';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './page/Signin';
import Signup from './page/Signup';
import ListBook from './page/ListBook';
import ShopBook from './page/ShopBook';
import ImageUpload from './components/Test/ImageUpload';

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
    },
    {
      path: "/shop",
      component: <ShopBook/>,
      isPublic: true,
    },
    {
      path: "/test",
      component: <ImageUpload/>,
      isPublic: true,
    }
  ];
   
  return (
    <>
      <BrowserRouter>
     
     <Routes>
     <Route path="/" element={<Navigate to="/signin" />} />
       {ROUTE.map((e, i) => (
         <Route key={i} path={e.path} element={e.component}/>
       ))}       
     </Routes>
      
   </BrowserRouter>
       
    </>
  )
}

export default App
