import React, { useEffect, useState } from "react";
import profiePic from "../../../assets/human6.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";
import UserSidebar from "./UserSidebar";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function UserProfile() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const [userData, setuserData] = useState([]);
    const [userName, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [dateOfBirth, setdateofBirth] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchInfo = async (e) => {
            const user = JSON.parse(localStorage.getItem("user"));
            setuserData(user);
            setName(user.userName || "");
            setMobileNumber(user.phoneNumber || "");
            setAddress(user.address ? user.address.street || "" : "");
            setCity(user.address ? user.address.city || "" : "");
            setState(user.address ? user.address.state || "" : "");
            const formattedDateOfBirth = user.dateOfBirth
                ? user.dateOfBirth.split("T")[0]
                : "";
            setdateofBirth(formattedDateOfBirth);
            setGender(user.gender || "");
            setEmail(user.email || "");
        };

        fetchInfo();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            axios
                .put("http://localhost:4451/user/profile-update", {
                    userId: userData._id,
                    updatedProfile: {
                        email: email,
                        userName: userName,
                        phoneNumber: mobileNumber,
                        address: {
                            street: address,
                            city: city,
                            state: state,
                        },
                        gender: gender,
                        dateOfBirth: dateOfBirth,
                    },
                })
                .then((res) => {
                    if (res.data.status === "Success") {
                        Swal.fire({
                            title: "Success",
                            icon: "success",
                            confirmButtonText: "Ok",
                            text: "Profile Updated Successfully!",
                        });
                        const user = res.data.user;
                        localStorage.setItem("user", JSON.stringify(user));
                        window.location.href = "/user-profile";
                    }
                });
        } catch (err) {
            Swal.fire({
                title: "Error",
                icon: "error",
                confirmButtonText: "Ok",
                text: "Error Updating Profile! Please Try Again!",
            });
        }
    };

    return (
        <section className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col lg:flex-row gap-8"
                >
                    <UserSidebar profiePic={profiePic} userName={userData.userName} />
                    <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-8">
                            Account Settings
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        value={userName}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="Phone"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        value={dateOfBirth}
                                        onChange={(e) => setdateofBirth(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="date"
                                        placeholder="Date of Birth"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <input
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="Gender"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleUpdate}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default UserProfile;
