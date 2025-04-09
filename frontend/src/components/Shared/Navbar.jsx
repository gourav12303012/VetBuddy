import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
    const navLinkStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? '600' : '400',
            color: isActive ? '#4F46E5' : '#374151',
            position: 'relative',
            transition: 'all 0.3s ease',
        };
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/sign-in');
    }

    const [isMobNav, setIsMobNav] = useState(false);
    const handleNav = () => {
        setIsMobNav(!isMobNav);
    }

    return (
        <div className='bg-white shadow-md h-[80px] w-full fixed z-20'>
            <div className='flex max-w-7xl items-center justify-between m-auto h-full px-4'>
                <div className='flex items-center'>
                    <span className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text'>VetBuddy</span>
                </div>
                <div className='justify-center items-center gap-8 text-lg hidden md:flex'>
                    <NavLink 
                        style={navLinkStyle} 
                        to="/"
                        className="hover:text-indigo-600 hover:scale-105 transition-all duration-300"
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        style={navLinkStyle} 
                        to="/appointment"
                        className="hover:text-indigo-600 hover:scale-105 transition-all duration-300"
                    >
                        Appointment
                    </NavLink>
                    <NavLink 
                        style={navLinkStyle} 
                        to="/about-us"
                        className="hover:text-indigo-600 hover:scale-105 transition-all duration-300"
                    >
                        About Us
                    </NavLink>
                    <NavLink 
                        style={navLinkStyle} 
                        to="/contact-us"
                        className="hover:text-indigo-600 hover:scale-105 transition-all duration-300"
                    >
                        Contact Us
                    </NavLink>
                    <button 
                        className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95'
                        onClick={handleClick}
                    >
                        LogIn
                    </button>
                </div>
                <button 
                    className={`md:hidden z-50 transition-all duration-300 ${isMobNav ? 'text-white' : 'text-gray-800'}`}
                    onClick={handleNav}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobNav ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
                <div 
                    className={`fixed top-0 left-0 w-full h-screen bg-gradient-to-b from-indigo-600 to-purple-600 transform transition-all duration-500 ease-in-out ${
                        isMobNav ? 'translate-x-0' : 'translate-x-full'
                    } md:hidden`}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <NavLink 
                            className="text-white text-2xl hover:scale-110 transition-all duration-300" 
                            style={navLinkStyle} 
                            to="/"
                            onClick={() => setIsMobNav(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            className="text-white text-2xl hover:scale-110 transition-all duration-300" 
                            style={navLinkStyle} 
                            to="/appointment"
                            onClick={() => setIsMobNav(false)}
                        >
                            Appointment
                        </NavLink>
                        <NavLink 
                            className="text-white text-2xl hover:scale-110 transition-all duration-300" 
                            style={navLinkStyle} 
                            to="/about-us"
                            onClick={() => setIsMobNav(false)}
                        >
                            About Us
                        </NavLink>
                        <NavLink 
                            className="text-white text-2xl hover:scale-110 transition-all duration-300" 
                            style={navLinkStyle} 
                            to="/contact-us"
                            onClick={() => setIsMobNav(false)}
                        >
                            Contact Us
                        </NavLink>
                        <button 
                            className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-full text-xl font-semibold hover:scale-105 transition-all duration-300"
                            onClick={() => {
                                handleClick();
                                setIsMobNav(false);
                            }}
                        >
                            LogIn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar