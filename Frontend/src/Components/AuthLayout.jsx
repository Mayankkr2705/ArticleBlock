import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const isAuthenticated = !!(token && user);

    if (authentication && !isAuthenticated) {
      
      navigate('/login');
    } else if (!authentication && isAuthenticated) {
      
      navigate('/');
    } else {
      // User has correct auth status for this route → show content
      setLoader(false);
    }
  }, [navigate, authentication]);


  return loader ? (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    children
  );
}
