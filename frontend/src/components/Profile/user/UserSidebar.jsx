import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { logout } from "../../../redux/UserSlice.js";

const UserSidebar =({ profiePic, userName }) => {
    const navLinkStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? "600" : "400",
            color: isActive ? "#4F46E5" : "#374151",
            backgroundColor: isActive ? "rgba(79, 70, 229, 0.1)" : "transparent",
            borderRadius: "0.5rem",
            transition: "all 0.3s ease",
        };
    };

    const dispatch = useDispatch();
    
    const handleSignOut = async (e) => {
        e.preventDefault();
        await axios.get("http://localhost:4451/auth/logout").then((res) => {
            if (res.data.message === "User Logged Out") {
                localStorage.removeItem("user");
                dispatch(logout());
                window.location.href = "/";
            }
        });
    };

    return (
        <div className="bg-white h-full w-[18%] flex flex-col justify-between p-6 shadow-lg rounded-xl">
            <div className="flex flex-col gap-8">
                <div className="w-full flex flex-col items-center">
                    <img
                        src={profiePic}
                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-md"
                        alt="profile"
                    />
                    <p className="mt-4 text-xl font-semibold text-gray-800">{userName}</p>
                </div>
                <div className="flex flex-col items-start w-full gap-2">
                    <NavLink
                        style={navLinkStyle}
                        className="w-full p-3 hover:bg-indigo-50 transition-all duration-300"
                        to="/user-profile"
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        style={navLinkStyle}
                        className="w-full p-3 hover:bg-indigo-50 transition-all duration-300"
                        to="/user-appointments"
                    >
                        Appointments
                    </NavLink>
                    <NavLink
                        style={navLinkStyle}
                        className="w-full p-3 hover:bg-indigo-50 transition-all duration-300"
                        to="/user-book-appointment"
                    >
                        Book Appointment
                    </NavLink>
                    <NavLink
                        style={navLinkStyle}
                        className="w-full p-3 hover:bg-indigo-50 transition-all duration-300"
                        to="/user-medication"
                    >
                        Medication
                    </NavLink>
                </div>
            </div>
            <div className="w-full text-center p-2">
                <button
                    onClick={handleSignOut}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-md font-medium py-2 px-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-95"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserSidebar;