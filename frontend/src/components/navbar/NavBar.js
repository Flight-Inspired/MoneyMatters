import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {

    return (
        <nav class="navbar navbar-light bg-white navbar-expand-lg border-bottom">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MoneyMatters</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/map">Projects</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;