import React, { useEffect, useRef} from 'react';
import { NavLink, Link } from 'react-router-dom'
import { TweenMax, Power3 } from 'gsap'


const MainNav = () => {
    const navigation = useRef(null)
    
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
    return(
        <nav className="flex justify-between py-9 w-10/12 m-auto" ref={navigation}>
            
            <Link to="/">
                <h2 style={{ fontFamily:'Zen Dots, cursive'}} className="text-2xl text-white">Martina Gecikova</h2>
            </Link>
            <ul className=" flex flex-row justify-center">
                <li className="px-6 text-white flex items-center">
                    <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/about">About me</NavLink>
                </li>
                <li className="px-6 text-white flex items-center">
                    <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/gallery">Gallery</NavLink>
                </li>
                <li className="px-6 text-white flex items-center">
                    <NavLink activeStyle={{ fontWeight: 'bold' }} exact to="/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MainNav;