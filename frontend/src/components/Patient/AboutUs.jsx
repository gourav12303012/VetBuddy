import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import banner from '../../assets/AboutUs.jpg'
import slide1 from '../../assets/slide2.jpg'
import slide2 from '../../assets/slide3.jpg'
import slide3 from '../../assets/slide4.jpg'
import slide4 from '../../assets/slide5.jpg'
import {motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function AboutUs() {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  });

  const slideImages = [slide1, slide2, slide3, slide4];
  let [current, setCurrent] = useState(0);

  let prevSlide = () => {
    if(current == 0) setCurrent(slideImages.length - 1)
    else setCurrent(current - 1);
  }
  let nextSlide = () => {
    if(current == slideImages.length - 1) setCurrent(0)
    else setCurrent(current + 1);
  }

  return (
    <>
   
      <Navbar/>
      <section className='pt-[80px] bg-[#FEFAE0]'>    
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }} 
          animate={{ opacity: inView ? 1 : 0 }} 
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className='h-screen w-screen'>
          <img src={banner} alt="banner" className='' />
          <div className='z-10 bottom-0 hidden lg:block lg:left-32 py-4 rounded-t-lg lg:w-[400px] text-center bg-[#FAEDCD] absolute'>
            <p className='font-semibold text-3xl'>About VetBuddy</p>
          </div>
        </motion.div>
      </section>

      <section className="py-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }} 
          animate={{ opacity: inView ? 1 : 0 }} 
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                VetBuddy is a premier veterinary care provider dedicated to offering comprehensive and compassionate healthcare services for your beloved pets. Our journey began with a simple mission: to provide exceptional veterinary care with a personal touch.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are committed to providing the highest quality veterinary care while ensuring a stress-free experience for both pets and their owners. Our team of experienced veterinarians and staff work together to create a welcoming environment where your pet's health and well-being are our top priorities.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                From routine check-ups to emergency care, we offer a wide range of veterinary services. Our state-of-the-art facility is equipped with the latest technology to ensure accurate diagnoses and effective treatments. We believe in preventive care and work closely with pet owners to maintain their pets' health and happiness.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-50">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }} 
          animate={{ opacity: inView ? 1 : 0 }} 
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className="max-w-7xl mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Our Facility
            </span>
          </h2>
          
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slideImages.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`Facility ${index + 1}`}
                  className="w-full h-[500px] object-cover"
                />
              ))}
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default AboutUs;