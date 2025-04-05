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

      <section className='bg-[#FEFAE0] pt-5'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }} 
          animate={{ opacity: inView ? 1 : 0 }} 
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className='h-screen max-w-7xl flex flex-col m-auto justify-center text-justify gap-1'>
          <p className='text-2xl font-semibold'>Our Story</p>
          <p className='text-lg'>
            VetBuddy was founded with a simple yet powerful mission: to make quality veterinary care accessible to every pet parent within 30 minutes. We understand that pets are family, and their health emergencies can't wait. That's why we've created a network of mobile veterinary units ready to respond at a moment's notice.
          </p>
          <p className='text-lg hidden lg:block'>
            Our team of experienced veterinarians brings the clinic to your doorstep, equipped with state-of-the-art medical equipment and supplies. From routine check-ups to emergency care, we ensure your pets receive the best possible care in the comfort of their own home.

            What sets VetBuddy apart is our commitment to comprehensive pet care. Beyond emergency services, we offer regular health check-ups, vaccination schedules, grooming services, and connections to specialized care when needed. We've also partnered with rescue centers and pet insurance providers to ensure your pets have access to all the care they need throughout their lives.

            Today, VetBuddy serves thousands of pet parents across the city, maintaining our promise of quick response times and professional care. Our success is measured not just in the number of pets we treat, but in the peace of mind we provide to pet parents who know help is just a call away.
          </p>
        </motion.div>
      </section>

      <section className='bg-[#FEFAE0] lg:pt-5'>
        <motion.div 
          ref={ref}
          initial={{ opacity: 0 }} 
          animate={{ opacity: inView ? 1 : 0 }} 
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className='h-screen max-w-7xl flex flex-col m-auto justify-center text-justify gap-1'>
          <p className='text-2xl font-semibold'>Founder's Message</p>
          <p className='text-lg font-medium self-center'>- Dr. Sarah Mitchell</p>
          <p className='text-lg'>
            At VetBuddy, we believe that every pet deserves immediate access to quality veterinary care. As a pet parent myself, I understand the anxiety that comes with seeing your beloved companion in distress. This understanding led to the creation of VetBuddy - a service that brings professional veterinary care directly to your doorstep within 30 minutes.

            Our team of dedicated veterinarians and support staff work tirelessly to ensure that your pets receive the best possible care, whether it's a routine check-up or an emergency situation. We've built VetBuddy on the principles of compassion, expertise, and accessibility, making sure that no pet has to wait for care when they need it most.
          </p>
          <p className='hidden lg:block text-lg'>
            What makes VetBuddy unique is our comprehensive approach to pet care. We don't just treat emergencies; we're your partner in your pet's lifelong health journey. From regular vaccinations to specialized care, from grooming services to connecting you with rescue centers, we're here to support every aspect of your pet's wellbeing.

            Our commitment to excellence extends beyond just medical care. We've created a network of support services, including pet insurance partnerships and emergency ambulance services, to ensure your pets have access to all the resources they need. We're constantly innovating and expanding our services to better serve our growing community of pet parents.

            As we continue to grow, our mission remains unchanged: to provide immediate, professional, and compassionate veterinary care to every pet in need. We're proud to be your trusted partner in pet care, and we look forward to serving you and your beloved pets for many years to come.
          </p>
        </motion.div>
      </section>

      <section className='bg-[#FEFAE0]'>
        <motion.div  
          ref={ref}
          initial={{ opacity: 0 }} 
          animate={{ opacity: inView ? 1 : 0 }} 
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className='max-w-7xl m-auto h-full flex flex-col justify-center items-center gap-3'>
          <p className='text-3xl font-semibold'>Our Facilities</p>
          <div 
            className='h-[70%] w-[70%] flex shadow-lg border border-5 shadow-black transition ease-out duration-40'
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}>
            {slideImages.map((images, index) => {
              return (
                <img src={images} alt="slider" key={index} />
              )
            })}
          </div>
          <div className='absolute w-[59%] h-full flex justify-between items-center pt-5'>
            <button 
              onClick={prevSlide}
              className='bg-black rounded-full p-1 ms-1 flex justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className='size-10' viewBox="0 0 24 24" fill="white">
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className='bg-black rounded-full p-1 me-2 flex justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-10' fill="white">
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </button>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default AboutUs