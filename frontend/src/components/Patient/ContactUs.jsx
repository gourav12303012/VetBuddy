import React, { useState, useEffect } from "react";
import Navbar from "../Shared/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import {motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNo] = useState("");
  const [message, setComment] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNo("");
    setComment("");
  };

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4451/user/add-contact-us", {
        name: name,
        phone: phone,
        email: email,
        message: message
      });
      Swal.fire({
        title: "Success",
        icon: "success",
        confirmButtonText: "Ok",
        text: "Message Sent Successfully! We will get back to you soon!",
      });
      resetForm();
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        confirmButtonText: "Ok",
        text: "Error Sending Message! Please Try Again!",
      });
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        ref={ref}
        initial={{ opacity: 0 }} 
        animate={{ opacity: inView ? 1 : 0 }} 
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1 }}
        className="min-h-screen flex justify-center items-center pt-24"
      >
        <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-10 mx-4 lg:mx-14 py-14">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }} 
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1 }}
            className="flex-col w-full lg:w-1/2 space-y-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Our Location</h3>
                <p className="text-gray-600 mt-2">
                  VetBuddy Veterinary Clinic<br />
                  123 Pet Care Avenue<br />
                  Trivandrum – XXXXXX, Kerala, India
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Telephone</h3>
                  <p className="text-gray-600 mt-2">+91 123 456 7890</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Emergency</h3>
                  <p className="text-gray-600 mt-2">+91 123 456 7890</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-2">contact@vetbuddy.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Business Hours</h3>
                  <p className="text-gray-600 mt-2">
                    Mon - Fri: 9:00 AM - 8:00 PM<br />
                    Sat - Sun: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }} 
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1 }}
            className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-center mb-8">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setPhoneNo(e.target.value)}
                  value={phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  onChange={(e) => setComment(e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactUs;
