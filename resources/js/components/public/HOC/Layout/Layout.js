import React, {useState, useEffect, useRef } from 'react'
import MainNav from '../../components/MainNav/MainNav'
import { LayoutContext } from '../../../../context/LayoutContext';

 
const Layout = props => {
    const [overlay, setOverlay] = useState(false)
    
    const nav = useRef()

    useEffect(() => {
        console.log(nav)
    },[])

    const handleShowOverlay = () => {
        setOverlay(true)
    }
    
    const handleCloseOverlay = () => {
        setOverlay(false)
    }

    return (
        <div className="w-full relative" style={{ background: 'rgb(11 11 11)'}}>
            <MainNav  />
            <main className="w-4/5 m-auto flex justify-center" style={{ minHeight: 'calc(100vh - 104px'}}>
                <LayoutContext.Provider className="w-full" value={
                    {   showOverlay: handleShowOverlay, 
                        closeOverlay: handleCloseOverlay 
                    }
                }>
                    { props.children }
                </LayoutContext.Provider>
            </main>

            <div className="relative">

            {
                overlay &&
                <div className="fixed w-full bg-black opacity-80 top-0 h-full max-h-full box-border overflow-x-hidden overflow-y-hidden" >
                </div>
            }
            </div>
        </div>
    )
}

export default Layout;