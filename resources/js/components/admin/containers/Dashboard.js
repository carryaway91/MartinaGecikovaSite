import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Portrait from '../components/Portrait/Portrait'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'

const Dashboard = () => {
    
    // Context
    const {changeTitle} = useContext(ChangeTitleContext)


    const [galleries, setGalleries] = useState()
    const [photos, setPhotos] = useState()

    useEffect(() => {
        changeTitle('Dashboard')
    }, [changeTitle])
   
    useEffect(() => {
        axios.get('/api/photos')
            .then(res => {
                setPhotos(res.data.data)
            })
        axios.get('/api/gallery')
                .then(res => {
                    setGalleries(res.data.data)
                })
    }, [])


    return (
        <div className="flex flex-wrap justify-start">
            <div className="flex flex-col">
                <h2 className="text-4xl bold mb-5">My galleries</h2>
                <div className="flex flex-wrap justify-start">
                {
                    galleries && galleries.map(g => <Link to={`/admin/gallery/${g.id}`} key={g.id} className="inline p-2 mr-2 mb-2 bg-blue-400">{ g.name } </Link>) 
                }
                </div>
                <h2 className="text-4xl bold py-5">All paintings</h2>
                <ul className="flex flex-wrap justify-center">
                    {
                        photos && photos.map(p => <li><Portrait image={p} /></li>)
                    }
                </ul>
            </div>
        </div>
    )
}
export default Dashboard