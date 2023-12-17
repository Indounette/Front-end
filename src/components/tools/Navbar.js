import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../media/Logo.png';

function Navbar() {
  const { user, logout } = useAuth0();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={Logo} ></img>
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {user && (
              <li className='nav-item'>
                <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
                >
                    Hello, {user.name}
                    </Link>
              </li>
            )}
            <li className='nav-item'>
             {/* Logout button */}
             {button && (
              
                  <Button buttonStyle='btn--outline' onClick={() => logout({ returnTo: window.location.origin })}>Log out</Button>
            )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
