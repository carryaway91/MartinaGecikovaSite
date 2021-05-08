import React, { useState } from 'react'
import MainNav from '../components/MainNav/MainNav'
import UpperPanel from '../components/UpperPanel/UpperPanel.js'
import { TitleContext } from '../TitleContext/TitleContext'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'

const Layout = props => {
    const [title, setTitle] = useState('Default title')

    const handleSetTitle = title => {
        setTitle(title)
    }

    return (
        <div className="flex w-full mobile:flex-col" style={{ minHeight: '100vh'}}>
            <MainNav/>

            <div className="w-full">
                <TitleContext.Provider value={title}>
                    <UpperPanel/>
                </TitleContext.Provider>
 
                <main style={{ minHeight: 'calc(100vh - 90px)'}}  className="p-8 bg-red-50">
                    <ChangeTitleContext.Provider value={{
                        changeTitle: (title) => handleSetTitle(title)
                    }}>
                        { props.children }
                    </ChangeTitleContext.Provider>
                </main>
            </div>
        </div>
    )
}

export default Layout