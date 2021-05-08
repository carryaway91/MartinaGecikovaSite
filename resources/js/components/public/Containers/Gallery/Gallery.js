import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Thumbnail from '../../components/Thumbnail/Thumbnail'

const Gallery = ({message}) => {
    const [coverPhotos, setCoverPhotos] = useState()

    useEffect(() => {
        axios.get('/api/gallery').then(res => {
            setCoverPhotos(res.data.data)

        })
    },[])

    
    return (
        <div className="flex justify-center">
        <ul className="flex flex-wrap justify-start">
            {
                coverPhotos && coverPhotos.map(pic => {
                    return <Thumbnail key={pic.name} name={pic.name} bg={pic.image} galleryID={pic.id} 
                    galleryThumb={ true } />
                })
            }
        </ul>
        </div>
    )
}

export default Gallery;