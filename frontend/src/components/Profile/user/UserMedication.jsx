import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import profiePic from '../../../assets/human6.jpg'
import UserSidebar from './UserSidebar'
import axios from 'axios';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function UserMedication() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const userData = JSON.parse(localStorage.getItem('user'))
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4451/user/get-medications/${userData.email}`);
                const data = response.data;
                const medicationsArray = data.map(({ medications }) => medications);
                const detailsArray = medicationsArray.map(medications => medications.map(({ name, dosage, frequency }) => ({ name, dosage, frequency })));
                setMedicines(detailsArray);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
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
                            Your Medications
                        </h2>
                        <div className="w-full">
                            {!medicines.length ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-lg">No medications have been prescribed yet.</p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative overflow-auto rounded-xl border border-gray-200"
                                >
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-medium">
                                                    #
                                                </th>
                                                <th scope="col" className="px-6 py-4 font-medium">
                                                    Medicine Name
                                                </th>
                                                <th scope="col" className="px-6 py-4 font-medium">
                                                    Dosage
                                                </th>
                                                <th scope="col" className="px-6 py-4 font-medium">
                                                    Frequency
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicines.map((value, index) => (
                                                <motion.tr
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {value[0].name}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {value[0].dosage}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">
                                                        {value[0].frequency}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default UserMedication