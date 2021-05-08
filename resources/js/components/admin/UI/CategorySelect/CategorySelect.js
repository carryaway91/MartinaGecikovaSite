import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CategorySelect = props => {
    const [categories, setCategories] = useState()

    useEffect(() => {
        axios.get('/api/add-painting')
        .then(data => {
            setCategories(data.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
 
    return (
        <div className="mb-5">
            <select name="gallery_id" onChange={(e) => props.inputChange(e)} value={props.currentValue}>
                <option value="" disabled>Choose gallery</option>
                {
                    categories && categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                }
            </select>
            {
                props.err && <p className="font-bold text-red-600">{props.err}</p>
            }
        </div>
    )
}

export default CategorySelect