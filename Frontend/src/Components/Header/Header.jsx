import React from 'react';
import Logo from '../Logo';
import Logoutbtn from './Logoutbtn';
import Container from '../Container/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navitems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !isAuthenticated },
    { name: 'Signup', slug: '/signup', active: !isAuthenticated },
    { name: 'All Article', slug: '/all-article', active: isAuthenticated },
    { name: 'Add Article', slug: '/add-article', active: isAuthenticated },
  ];

  return (
    <header className="sticky top-0 z-40 shadow-lg bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
      <Container>
        <nav className="flex items-center h-20">
          {/* Logo */}
          <div className="mr-6 flex items-center">
            <Link to="/" className="w-32 h-16 flex items-center">
              <Logo width={110} />
            </Link>
          </div>
          {/* Navigation */}
          <ul className="flex ml-auto items-center space-x-4">
            {navitems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-5 py-2 rounded-full font-semibold transition-colors bg-white/10 hover:bg-blue-700/70 hover:text-white active:scale-95 shadow-sm"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {isAuthenticated && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
      {/* Subtle bottom border effect */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-30" />
    </header>
  );
}

export default Header;
