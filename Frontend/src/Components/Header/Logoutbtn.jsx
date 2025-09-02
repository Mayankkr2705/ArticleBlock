import React from "react";
import { useDispatch } from "react-redux";
import authserve from "../../api/auth";
import { logout } from "../../Store/AuthSlice";

function Logoutbtn() {
  const dispatch = useDispatch();

  const logouthandler = async () => {
    await authserve.logout();
    dispatch(logout());
  };

  return (
    <button onClick={logouthandler} className="px-3 py-2 rounded bg-gray-200">
      Logout
    </button>
  );
}

export default Logoutbtn;
