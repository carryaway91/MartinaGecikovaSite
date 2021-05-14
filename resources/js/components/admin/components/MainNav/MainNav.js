import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import apiClient from '../../../../services/api'

const MainNav = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if(window.innerWidth > 950) {
            setShow(true)
        }
        const printSize = () => {
            window.innerWidth < 950 ? setShow(false) : setShow(true)
              
        }
        window.addEventListener('resize', printSize)
    }, [])

    const handleShow = () => {
        setShow(!show)
    }

    const handleLogout = () => {
        apiClient.get('/sanctum/csrf-cookie').then(() => {
            apiClient.post('/logout', {}).then(res => {
                window.location = '/login'
            }).catch(err => 
                console.log(err))
            })
    }

    return (
        <nav className="p-8 w-1/5 border-r-2 bg-gray-800 mobile:w-full mobile:border-r-0">
            <svg style={{ fill: 'lightgray'}} height="30px" viewBox="0 -53 384 384" width="30px" xmlns="http://www.w3.org/2000/svg"className="hidden mobile:block" onClick={handleShow} >
                <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/>
                <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg>
            
            {
                show && (
                    <ul className="flex flex-col mt-12 mobile:mt-0 mobile:text-center">
                        <li className="pb-8">
                            <NavLink onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="text-gray-300" exact to='/admin' activeStyle={{ fontWeight: 'bold' }}>Dashboard</NavLink>
                        </li>
                        <li className="pb-8">
                            <NavLink onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="text-gray-300" exact to="/admin/add-painting" activeStyle={{ fontWeight: 'bold' }}>Add painting</NavLink>
                        </li>
                        <li className="pb-8">
                            <NavLink onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="text-gray-300" exact to="/admin/add-gallery" activeStyle={{ fontWeight: 'bold' }}>Add gallery</NavLink>
                        </li>
                        <li className="pb-8">
                            <NavLink onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="text-gray-300" exact to='/admin/about' activeStyle={{ fontWeight: 'bold' }}>Modify Intro page and about info</NavLink>
                        </li>
                        <li className="pb-8">
                            <NavLink onClick={() => window.innerWidth < 950 ? setShow(false) : null} className="text-gray-300" exact to='/admin/messages' activeStyle={{ fontWeight: 'bold' }}>Messages</NavLink>
                        </li>
                        <li className="pb-8">
                            <button  className="text-gray-300" type="submit" value="Logout" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                )
            }
        </nav>
    )
}

export default MainNav