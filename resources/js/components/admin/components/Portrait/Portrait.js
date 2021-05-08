import React from 'react'
import { Link } from 'react-router-dom'

const Portrait = props => {
    return (
        <Link to={`/admin/photo/${props.image.id}`}>
            <img src={props.image.image} style={{ objectFit: 'contain', height: '240px', width: '240px'}} className="mr-5 mb-10 bg-white" />
        </Link>
    )
}

export default Portrait