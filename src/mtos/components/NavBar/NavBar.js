import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import './NavBar.css';
import { useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const [showNav, setShowNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeView, setActiveView] = useState('#home');

    const handleToggleNav = () => {
        setShowNav(!showNav);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        if (window.scrollY < 600) {
            setActiveView('#home');
        } else if (window.scrollY >= 600 && window.scrollY < 1200) {
            setActiveView('#features');
        } else if (window.scrollY >= 1200 && window.scrollY < 2200) {
            setActiveView('#pricing');
        } else if (window.scrollY >= 2200 && window.scrollY < 2800) {
            setActiveView('#contact');
        } else if (window.scrollY >= 2800) {
            setActiveView('#about');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className='navbar navbar-expand-lg fixed-top' id={scrolled ? 'scrolled' : 'transparent'}>
            <NavLink to="/#home" className="navbar-brand d-flex align-items-center">
                <img
                    src={require('../../images/siteLogo.png')}
                    alt="MTOS Logo"
                    className="img-fluid"
                />
                <span className="ml-2">MTOS</span>
            </NavLink>

            <button
                className="navbar-toggler"
                type="button"
                onClick={handleToggleNav}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className={`collapse navbar-collapse${showNav ? ' show' : ''}`}
                id="navbarNav"
            >
                <ul className="navbar-nav ml-auto w-100">
                    <li className="nav-item mx-2">
                        <NavLink
                            to="/#home"
                            className={activeView === '#home' ? 'nav-btn' : 'inActive'}
                        >
                            HOME
                        </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <NavLink
                            to="/#features"
                            className={activeView === '#features' ? 'nav-btn' : 'inActive'}
                        >
                            FEATURES
                        </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <NavLink
                            to="/#pricing"
                            className={activeView === '#pricing' ? 'nav-btn' : 'inActive'}
                        >
                            PRICING
                        </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <NavLink
                            to="/#contact"
                            className={activeView === '#contact' ? 'nav-btn' : 'inActive'}
                        >
                            CONTACT
                        </NavLink>
                    </li>
                    <li className="nav-item mx-2">
                        <NavLink
                            to="/#about"
                            className={activeView === '#about' ? 'nav-btn' : 'inActive'}
                        >
                            ABOUT
                        </NavLink>
                    </li>
                    <ul className="navbar-nav ml-auto" id="btnWrapper">
                        <li className="nav-item mx-2 ms-auto">
                            <NavLink
                                to='/login'
                            >
                                <button className="btn btn-dark">LOGIN</button>
                            </NavLink>
                        </li>
                    </ul>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;


