import React, { useState, useEffect, useContext } from 'react'
import { TitleContext } from '../../TitleContext/TitleContext'


const UpperPanel = () => {
    const title = useContext(TitleContext)

    return (
        <div className="p-8 border-b-2 bg-gray-600 text-gray-300 text-bold mobile:hidden">{title}</div>
    )
}

export default UpperPanel