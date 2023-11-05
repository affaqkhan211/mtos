import React, { useState, useEffect } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
// import './NavBar.css';
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
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;


// <nav className='navbar navbar-expand-lg fixed-top' id={scrolled ? 'scrolled' : 'transparent'}>
//             <NavLink to="/#home" className="navbar-brand d-flex align-items-center">
//                 <img
//                     src={require('../../images/siteLogo.png')}
//                     alt="MTOS Logo"
//                     className="img-fluid"
//                 />
//                 <span className="ml-2">MTOS</span>
//             </NavLink>

//             <button
//                 className="navbar-toggler"
//                 type="button"
//                 onClick={handleToggleNav}
//             >
//                 <span className="navbar-toggler-icon"></span>
//             </button>

//             <div
//                 className={`collapse navbar-collapse${showNav ? ' show' : ''}`}
//                 id="navbarNav"
//             >
//                 <ul className="navbar-nav ml-auto w-100">
//                     <li className="nav-item mx-2">
//                         <NavLink
//                             to="/#home"
//                             className={activeView === '#home' ? 'nav-btn' : 'inActive'}
//                         >
//                             HOME
//                         </NavLink>
//                     </li>
//                     <li className="nav-item mx-2">
//                         <NavLink
//                             to="/#features"
//                             className={activeView === '#features' ? 'nav-btn' : 'inActive'}
//                         >
//                             FEATURES
//                         </NavLink>
//                     </li>
//                     <li className="nav-item mx-2">
//                         <NavLink
//                             to="/#pricing"
//                             className={activeView === '#pricing' ? 'nav-btn' : 'inActive'}
//                         >
//                             PRICING
//                         </NavLink>
//                     </li>
//                     <li className="nav-item mx-2">
//                         <NavLink
//                             to="/#contact"
//                             className={activeView === '#contact' ? 'nav-btn' : 'inActive'}
//                         >
//                             CONTACT
//                         </NavLink>
//                     </li>
//                     <li className="nav-item mx-2">
//                         <NavLink
//                             to="/#about"
//                             className={activeView === '#about' ? 'nav-btn' : 'inActive'}
//                         >
//                             ABOUT
//                         </NavLink>
//                     </li>
//                     <ul className="navbar-nav ml-auto" id="btnWrapper">
//                         <li className="nav-item mx-2 ms-auto">
//                             <NavLink
//                                 to='/login'
//                             >
//                                 <button className="btn btn-dark">LOGIN</button>
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </ul>
//             </div>
//         </nav>