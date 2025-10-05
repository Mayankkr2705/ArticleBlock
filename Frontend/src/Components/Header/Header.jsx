import React from 'react';
import Logo from "../Logo";
import Logoutbtn from './Logoutbtn';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navitems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !isAuthenticated },
    { name: "Signup", slug: "/signup", active: !isAuthenticated },
    { name: "All Posts", slug: "/all-posts", active: isAuthenticated },
    { name: "Add Post", slug: "/add-post", active: isAuthenticated },
  ];

  return (
    <header className='py-1 shadow-md bg-gray-700 text-white'>
      <Container  className="h-xl">
        <nav className='flex  items-center'>
          <div className='mr-4'>
            <Link to='/' className='w-24 h-16 flex items-center'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto space-x-4'>
            {navitems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-4 py-2 duration-200 hover:bg-gray-600 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {isAuthenticated && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
