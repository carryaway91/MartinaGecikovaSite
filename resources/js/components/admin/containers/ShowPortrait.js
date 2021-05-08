import React, { useState, useEffect, useContext } from 'react'
import apiClient from '../../../services/api'
import { Redirect, useParams } from 'react-router-dom'
import ControlPanel from '../components/ControlPanel/ControlPanel'
import Portrait from '../components/Portrait/Portrait'
import CategorySelect from '../UI/CategorySelect/CategorySelect'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'
import Input from '../../../UI/Input'

const ShowPortrait = () => {
    const {changeTitle} = useContext(ChangeTitleContext)

    const { id } = useParams()
    const [photo, setPhoto] = useState()
    const [formData, setFormData] = useState({ title: '', description: '', gallery_id: '' })
    const [editing, setEditng] = useState(false)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        changeTitle('Painting details')
    }, [changeTitle])

    useEffect(() => {
        apiClient.get(`/api/photos/${id}`).then(res => {
            setPhoto(res.data[0])
            setFormData({
                ...formData,
                image: res.data[0].image,
                title: res.data[0].title,
                description: res.data[0].description,
                gallery_id: res.data[0].gallery_id
            })
        })
    }, [])

    const handleChangeInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleDeletePortrait = () => {
        const confirmation = window.confirm('Do you want to delete this photo?')
        
        if(confirmation) {
            apiClient.get('/sanctum/csrf-cookie').then(() => {
                apiClient.post(`/api/photos/${id}/delete`).then(res => setRedirect(true))
            })
        }
    }
    
    const handleSubmitForm = () => {
        const confirmation = window.confirm('Do you want to save these changes?')
        
        let data = new FormData()
        data.append('title', formData.title)
        data.append('description', formData.description)
        data.append('gallery_id', formData.gallery_id)
        
        if(confirmation) {
            apiClient.get('/sanctum/csrf-cookie').then(() => {
                apiClient.post(`/api/photos/${id}/update`, data).then(res => {
                    setRedirect(true)
                }).catch(err => {
                    setErrors(err.response.data.errors)
                })
            })
        }
    }

    const handleToggleEditing = () => {
        setEditng(!editing)
    }

    return (
        <div className="flex justify-between mobile:flex-col">
            { redirect && <Redirect to="/admin" />}
            <div className="flex mobile:flex-col">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold mb-3">Photo: </h1>
                        {
                            photo && <img src={photo.image} style={{ width: '250px'}} /> 
                        }
                </div>
                <div className="flex flex-col ml-12 mobile:ml-0 mobile:mt-2 mobile:mb-2">
                    <h3 className="text-2xl font-bold mb-3">Portrait Details: </h3>
                    {
                        photo && !editing ? (
                            <div>
                                <p><span className="font-bold">Title: </span>{ photo.title ? photo.title : 'Untitled' }</p>
                                <p><span className="font-bold">Description: </span>{ photo.description ? photo.description : 'No description' }</p>
                            </div>
                        )
                        : 
                        editing
                        ?
                        <form className="flex flex-col">
                            <Input inputType="input" type="text" name="title" placeholder="New photo title" 
                                    changeVal={e => handleChangeInput(e)} 
                                    value={  formData.title ? formData.title : '' }
                            />
                            
                            <Input inputType="textarea" type="text" name="description" placeholder="New photo description" 
                                    changeVal={e => handleChangeInput(e)} 
                                    value={formData.description ? formData.description : ''} /> 

                            <CategorySelect inputChange={handleChangeInput} currentValue={formData.gallery_id}/>
                        </form>
                        :
                        null
                    }
                </div>
            </div>

                <ControlPanel delete={handleDeletePortrait} submitForm={handleSubmitForm} editing={editing} toggleEditing={handleToggleEditing}/>

        </div>
    )
}

export default ShowPortrait