import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {
    const location = useLocation();


    return (
        <nav className="navbar navbar-light bg-white navbar-expand-lg border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">ElectSum</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current={location.pathname === '/map' ? 'page' : null} to="/">Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/all-candidates' ? 'active' : ''}`}  aria-current={location.pathname === '/map' ? 'page' : null}to="/all-candidates">All Candidates</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/congress' ? 'active' : ''}`}  aria-current={location.pathname === '/congress' ? 'page' : null}to="/congress">Congress</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/presidential' ? 'active' : ''}`}  aria-current={location.pathname === '/map' ? 'page' : null}to="/presidential">Presidential</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}  aria-current={location.pathname === '/about' ? 'page' : null}to="/about">About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;