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
      className="inline-block px-5 py-2 rounded-full font-semibold transition-colors bg-white/10 hover:bg-blue-700/70 hover:text-white active:scale-95 shadow-sm"
      onClick={logouthandler}
    >
      Logout
    </button>
  );
}

export default Logoutbtn;

