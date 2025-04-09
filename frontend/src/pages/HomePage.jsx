import React from 'react'
import Navbar from '../components/Shared/Navbar'
import Footer from '../components/Shared/Footer'
import { FaClock, FaUserMd, FaAmbulance, FaCalendarCheck } from 'react-icons/fa'

function HomePage() {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-r from-[#FEFAE0] to-[#E9EDC9] pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Your Pet's Health, <span className="text-emerald-600">Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get professional veterinary care at your doorstep within 30 minutes. 
                Expert vets, immediate attention, and peace of mind for your beloved pets.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition duration-300">
                Book Now
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3"
                alt="Happy pet with vet"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose VetBuddy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#FEFAE0] rounded-xl text-center hover:shadow-lg transition duration-300">
              <FaClock className="text-4xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">30-Minute Response</h3>
              <p className="text-gray-600">Quick response time for emergency care when your pet needs it most.</p>
            </div>
            <div className="p-6 bg-[#FEFAE0] rounded-xl text-center hover:shadow-lg transition duration-300">
              <FaUserMd className="text-4xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Vets</h3>
              <p className="text-gray-600">Highly qualified and experienced veterinarians at your service.</p>
            </div>
            <div className="p-6 bg-[#FEFAE0] rounded-xl text-center hover:shadow-lg transition duration-300">
              <FaAmbulance className="text-4xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Home Visits</h3>
              <p className="text-gray-600">Comfortable care in your pet's familiar environment.</p>
            </div>
            <div className="p-6 bg-[#FEFAE0] rounded-xl text-center hover:shadow-lg transition duration-300">
              <FaCalendarCheck className="text-4xl text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and quick appointment scheduling process.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-[#FEFAE0]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Emergency Care</h3>
              <p className="text-gray-600 mb-4">Immediate medical attention for your pet in critical situations.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• 24/7 Emergency Response</li>
                <li>• Critical Care Treatment</li>
                <li>• Immediate Diagnosis</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Regular Check-ups</h3>
              <p className="text-gray-600 mb-4">Comprehensive health examinations for your pet's well-being.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Vaccination</li>
                <li>• Health Monitoring</li>
                <li>• Preventive Care</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4">Specialized Care</h3>
              <p className="text-gray-600 mb-4">Expert treatment for specific health conditions.</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Surgery</li>
                <li>• Dental Care</li>
                <li>• Rehabilitation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Book Your Pet's Care?</h2>
          <p className="text-xl text-white mb-8">Join thousands of happy pet parents who trust VetBuddy for their pet's health.</p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
            Schedule Appointment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage 