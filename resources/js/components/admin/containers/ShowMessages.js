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
                        <li className="flex w-3/4 justify-between mb-5">
                            <span>{m.email}</span>
                            <span>{m.message}</span>
                            <hr />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ShowMessages