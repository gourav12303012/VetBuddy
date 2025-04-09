import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import appoint from "../../assets/appoint.png";
import axios from "axios";
import Swal from "sweetalert2";
import {motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function Appointment() {
  const [doctors, setDoctors] = useState([]);

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  const [appointment, setAppointment] = useState({
    patient: "",
    phone: "",
    appointmentDate: "",
    date: new Date(),
    time: "",
    doctor: "",
    reason: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    const fetchDoctors = async (e) => {
      const res = await axios.get("http://localhost:4451/doctor/get-doctors");
      setDoctors(res.data);
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:4451/appointment/add-appointment`, {
        patient: appointment.patient,
        phone: appointment.phone,
        doctor: appointment.doctor,
        appointmentDate: appointment.appointmentDate,
        reason: appointment.reason,
        email: appointment.email,
        time: appointment.time,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          confirmButtonText: "Ok",
          text: "Appointment Request Sent Successfully!",
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
    <motion.section className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-8 p-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }} 
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1 }}
            className="hidden lg:block lg:w-1/2"
          >
            <img src={appoint} className="w-full max-w-lg" alt="Veterinary appointment illustration" />
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }} 
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1 }}
            className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Book Your Appointment
              </h2>
              <p className="text-gray-600 mt-2">Schedule a visit for your pet with our expert veterinarians</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    onChange={(e) => setAppointment({ ...appointment, patient: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    onChange={(e) => setAppointment({ ...appointment, appointmentDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Veterinarian</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    onChange={(e) => setAppointment({ ...appointment, doctor: e.target.value })}
                  >
                    <option value="">Choose your Veterinarian</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor.name}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    onChange={(e) => setAppointment({ ...appointment, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea
                  rows="4"
                  placeholder="Describe your pet's condition"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Book Appointment
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Appointment;
