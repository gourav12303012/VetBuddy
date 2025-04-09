import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import profiePic from "../../../assets/human6.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import UserSidebar from "./UserSidebar";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function UserAppointment() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const [appointments, setAppointments] = useState([]);
    const [userData, setuserData] = useState([]);

    const colorForStatus = (status) => {
        switch (status) {
            case "scheduled":
                return "bg-orange-100 text-orange-800";
            case "inProgress":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setuserData(user);
        const email = user.email;
        const fetchAppointments = async (email) => {
            await axios
                .get(`https://hmsmern.onrender.com/appointment/get-appointments/${email}`)
                .then((res) => {
                    setAppointments(res.data);
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        confirmButtonText: "Ok",
                        text: "Error Fetching Appointments! Please Try Again!",
                    });
                });
        };

        fetchAppointments(email);
    }, []);

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
                            Your Appointments
                        </h2>
                        <div className="space-y-6">
                            {appointments.map((appointment, index) => {
                                const appointmentDate = new Date(appointment.appointmentDate);
                                const formattedDate = appointmentDate.toLocaleString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                });
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    Dr. {appointment.doctor.name}
                                                </h3>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Date & Time:</span> {formattedDate}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Reason:</span> {appointment.reason}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${colorForStatus(appointment.status)}`}>
                                                    {appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default UserAppointment;
