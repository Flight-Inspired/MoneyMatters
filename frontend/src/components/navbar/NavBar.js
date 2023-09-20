import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {
    const location = useLocation();


    return (
        <nav className="navbar navbar-light bg-white navbar-expand-lg border-bottom">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">MoneyMatters</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current={location.pathname === '/map' ? 'page' : null} to="/">Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={`nav-link ${location.pathname === '/map' ? 'active' : ''}`}  aria-current={location.pathname === '/map' ? 'page' : null}to="/map">Map</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;