import {
  createBrowserRouter
} from "react-router-dom";
// 
import Home from "../Pages/Home";
import AddProduct from "../Pages/AddProduct";
import UpdateProduct from "../Pages/UpdateProduct";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ManageProduct from "../Pages/ManageProduct";
import MainLayout from "../MainLayout/MainLayout";
import Error from "../Pages/Error";

 
// 
 const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    errorElement: <Error/>,
    children:[
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path: '/addproduct',
        element:<AddProduct></AddProduct>
      },
      {
        path: '/updatejob/:id',
        element:<UpdateProduct></UpdateProduct>
      },
      {
        path: '/login',
        element:<Login></Login>
      },
      {
        path: '/register',
        element:<Register/>
      },
      {
        path: '/allproduct',
        element:<ManageProduct></ManageProduct>
      },
    ]
  },
]);

export default router;

// change the path, element and loader as per your requirement