import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function Logoutbtn() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const logouthandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logouthandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;

