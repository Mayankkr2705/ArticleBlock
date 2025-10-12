import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-800 to-blue-900 text-gray-300 border-t border-t-gray-700 pt-12 pb-6">
      {/* Decorative blurred edge gradient */}
      <div
        className="absolute left-0 right-0 top-0 h-5 opacity-40 blur-2xl"
        style={{
          background: 'linear-gradient(90deg, #0ea5e9 0%, #6366f1 50%, #a21caf 100%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap gap-8 md:gap-0">
          {/* Brand / About */}
          <div className="w-full md:w-5/12 pb-10 md:pb-0 flex flex-col justify-between">
            <div className="inline-flex items-center mb-3">
              <Logo width={120} />
            </div>
            <p className="text-md text-gray-400 mb-4 max-w-xs">
              Share your thoughts and ideas with ArticleBlock – the place to discover, write, and grow.
            </p>
            <p className="text-xs text-gray-500 italic">
              &copy; {new Date().getFullYear()} ArticleBlock. All rights reserved.
            </p>
          </div>

          {/* Link Columns */}
          <div className="w-full md:w-2/12 flex flex-col gap-4">
            <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-200 mb-2">Company</h3>
            <ul>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/features">
                  Features
                </Link>
              </li>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="mb-1">
                <a
                  className="transition text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://affiliateprogram.example.com"
                >
                  Affiliate Program
                </a>
              </li>
              <li>
                <Link className="transition text-gray-400 hover:text-white" to="/press">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/12 flex flex-col gap-4">
            <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-200 mb-2">Support</h3>
            <ul>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/account">
                  Account
                </Link>
              </li>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/help">
                  Help
                </Link>
              </li>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="transition text-gray-400 hover:text-white" to="/customer-support">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/12 flex flex-col gap-4">
            <h3 className="uppercase text-sm font-semibold tracking-wider text-gray-200 mb-2">Legals</h3>
            <ul>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/terms">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mb-1">
                <Link className="transition text-gray-400 hover:text-white" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="transition text-gray-400 hover:text-white" to="/licensing">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
      <div className="absolute left-0 right-0 -bottom-2 h-8 bg-gradient-to-r from-blue-900 to-purple-900 opacity-40 blur-sm" />
    </footer>
  );
}

export default Footer;
