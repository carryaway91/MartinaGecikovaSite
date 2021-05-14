import React, { useState, useEffect, useContext } from 'react'
import apiClient from '../../../services/api'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'

const ShowMessages = () => {
    const [msgs, setMsgs] = useState()
    const {changeTitle} = useContext(ChangeTitleContext)

    useEffect(() => {
        changeTitle('Messages')
    }, [changeTitle])
   
    useEffect(() => {
        apiClient.get('/sanctum/csrf-cookie').then(() => {
            apiClient.get('/api/messages').then(res => {
                setMsgs(res.data)
            })
        })
    },[])

    return (
        <div>
            <ul>
                {
                    msgs && msgs.map(m => (
                        <li className="w-3/4 mb-5">
                            <p className="text-gray-900 font-bold">{ m.email }</p>
                            <p className="break-all mb-2">{ m.message }</p>
                            <hr />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ShowMessages