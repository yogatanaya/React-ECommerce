import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (<nav className="flex items-center justify-between flex-wrap bg-black p-6">
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="container mx-auto">
        <div className="text-md lg:flex-grow text-white">
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo mr-4">Shop</Link>
          <Link to="/cart" className="block mt-4 lg:inline-block lg:mt-0 hover:text-indigo mr-4">My Cart</Link>
        </div>
      </div>
    </div>
  </nav>)
}

export default Navbar;
