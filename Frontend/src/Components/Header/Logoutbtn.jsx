import React from "react";
import { useNavigate } from "react-router-dom";
import{logout as apiLogout} from '../../api/api';


function Logoutbtn() {
  const navigate = useNavigate();
  const logouthandler = () => {
    apiLogout(); 
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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
