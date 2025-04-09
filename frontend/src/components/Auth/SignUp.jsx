import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

function SignUp() {
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4451/auth/register", data)
            .then((res) => {
                if (res.data.message === "Success") {
                    navigate("/sign-in");
                }
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Error Registering User! Please Try Again!",
                    button: "Ok",
                });
            });
    };

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md p-8"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text text-center mb-2">
                        Create Account
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Already have an account?{" "}
                        <Link
                            to="/sign-in"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                type="text"
                                placeholder="Enter your full name"
                                onChange={(e) => setData({ ...data, userName: e.target.value })}
                                value={data.userName}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                value={data.email}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                type="password"
                                placeholder="Create a password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                value={data.password}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}

export default SignUp;