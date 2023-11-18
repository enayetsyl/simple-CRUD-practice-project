import { Link } from "react-router-dom";
// import useAuth from "../hook/useAuth";
import { useContext } from "react";
import AuthProvider from "../Provider/AuthProvider";
import useAuth from "../hook/useAuth";

const Navbar = () => {
 const {user, logOut} = useAuth()
//  console.log(user)
  return (
    <div className="flex justify-center items-center gap-10 py-10">
      <Link to='/addproduct'>
      <button className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl">Add Product</button>
      </Link>      
      <Link to='/allproduct'>
      <button className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl">Manage Product</button>
      </Link>      
           
      {
        user ? (<><p>{user.displayName}</p>
        <button onClick={logOut}
        className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl"
        >Logout</button></>
        ) : (<Link to='/login'>
        <button className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl">Login</button>
        </Link> )
      }
    </div>
  );
};

export default Navbar;