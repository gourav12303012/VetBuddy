import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import profiePic from "../../../assets/human6.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import UserSidebar from "./UserSidebar";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function UserBookAppointment() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const [userData, setuserData] = useState([]);
    const [userName, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [doctor, setDoctor] = useState("");
    const [reason, setReason] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [time, setTime] = useState("");
    const [doctors, setDoctors] = useState([]);

    const getDay = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchInfo = async (e) => {
            const user = JSON.parse(localStorage.getItem("user"));
            setuserData(user);
            setName(user.userName);
            setMobileNumber(user.phoneNumber);
            setAddress(user.address.street);
            setGender(user.gender);
            setEmail(user.email);
        };
        const fetchDoctors = async (e) => {
            const res = await axios.get("https://hmsmern.onrender.com/doctor/get-doctors");
            setDoctors(res.data);
        };

        fetchDoctors();
        fetchInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post('https://hmsmern.onrender.com/appointment/add-appointment', {
                patient: userData.userName,
                phone: mobileNumber,
                doctor: doctor,
                appointmentDate: appointmentDate,
                reason: reason,
                email: email,
                time: time,
            })
            .then((res) => {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    confirmButtonText: "Ok",
                    text: "Appointment Request Sent Successfully! We will get back to you soon!",
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    confirmButtonText: "Ok",
                    text: "Error Sending Appointment Request! Please Try Again!",
                });
            });
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
                            Book Appointment
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                                    <input
                                        value={appointmentDate}
                                        onChange={(e) => setAppointmentDate(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="date"
                                        min={getDay()}
                                        placeholder="Date Of Appointment"
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
                                    <select
                                        value={doctor}
                                        onChange={(e) => setDoctor(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Choose your Consultant</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor._id} value={doctor._id}>
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                                    <input
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="text"
                                        placeholder="Reason"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
                                    <input
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        type="time"
                                        placeholder="Time"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >
                                Book Appointment
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default UserBookAppointment;
