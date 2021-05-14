import React, { useEffect, useState, useRef} from 'react';
import { NavLink, Link } from 'react-router-dom'
import { TweenMax, Power3 } from 'gsap'


const MainNav = () => {
    const [show, setShow] = useState(false)
    const navigation = useRef(null)
    
    useEffect(() => {
        if(window.innerWidth > 950) {
            setShow(true)
        }
        const printSize = () => {
            window.innerWidth < 950 ? setShow(false) : setShow(true)
              
        }
        window.addEventListener('resize', printSize)
    }, [])

    useEffect(() => {
        TweenMax.from(
            navigation.current,
            .8,
            {
                opacity: 0,
                ease: Power3.easeIn
            }
        )
    }, [])


    const handleShow = () => {
        setShow(!show)
    }

    return(
        <nav className="flex justify-between py-9  w-10/12 m-auto relative" ref={navigation}>
            <Link to="/" className="mobile:hidden">
                <h2 style={{ fontFamily:'Zen Dots, cursive'}} className="text-2xl text-white">Martina Gecikova</h2>
            </Link>
             <svg style={{ fill: 'lightgray'}} height="30px" viewBox="0 -53 384 384" width="30px" xmlns="http://www.w3.org/2000/svg" className="hidden mobile:block" onClick={handleShow} >
                <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
            </svg>
            {
                show && (
                    <ul className="flex flex-row justify-center mobile:flex-col 
                        mobile:w-full
                        mobile:-left-0
                        mobile:top-0
                    ">
                        <li onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="px-6 text-white hidden mobile:flex mobile:mb-5 mobile:text-center items-center">
                            <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/">Home</NavLink>
                        </li>
                        <li onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="px-6 text-white flex mobile:mb-5 mobile:text-center items-center">
                            <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/about">About me</NavLink>
                        </li>
                        <li onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="px-6 text-white flex mobile:mb-5 mobile:text-center items-center">
                            <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/gallery">Gallery</NavLink>
                        </li>
                        <li onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="px-6 text-white flex mobile:mb-5 mobile:text-center items-center">
                            <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                )
            }
        </nav>
    )
}

export default MainNav;