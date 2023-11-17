import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
 const {user} = useContext(AuthContext)
 console.log(user)
  return (
    <div className="flex justify-center items-center gap-10 py-10">
      <Link to='/addproduct'>
      <button className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl">Add Product</button>
      </Link>      
      <Link to='/allproduct'>
      <button className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl">Manage Product</button>
      </Link>      
      <Link to='/login'>
      <button className="bg-yellow-400 py-4 px-6 text-white text-center font-bold text-xl">Login</button>
      </Link>      
      {
        user && (<p>{user.displayName}</p>)
      }
    </div>
  );
};

export default Navbar;