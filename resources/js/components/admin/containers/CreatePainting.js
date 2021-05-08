import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import CategorySelect from '../UI/CategorySelect/CategorySelect'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'
import Input from '../../../UI/Input'

const CreatePainting = props => {

    const {changeTitle} = useContext(ChangeTitleContext)

    const [photos, setPhotos] = useState()
    const [formData, setFormData] = useState({ gallery_id: '', title: '', description: '', image: ''})
    const [imageData, setImageData] = useState({ image: '', alt: ''})
    const [errors, setErrors] = useState()
    const [redirect, setRedirect] = useState(false)


    useEffect(() => {
        changeTitle('Add new painting')
    }, [changeTitle])



    const setGalleryId = id => {
        setFormData({
            ...formData,
            gallery_id: id
        })
    }


    const handleFormInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleUploadImage = e => {
        
        if(e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            })
            handleShowPreview(e)
        }
    }
    
    const handleShowPreview = e => {
            setImageData({
                ...imageData,
                image: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            })
    }

    const handleSubmitForm = e => {
        e.preventDefault()

        let data = new FormData;
        data.append('image', formData.image);
        data.append('gallery_id', formData.gallery_id);
        data.append('title', formData.title);
        data.append('description', formData.description);
        
        axios.post('/api/photos', data).then(res => {
            if(res.status == 201) {
                setRedirect(true)
            }
        }).catch(err => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div style={{ minHeight: '100%'}} className="w-full">
            { redirect && <Redirect to="/admin" />}
            <div className="flex mobile:flex-col-reverse">

                <form onSubmit={ (e) => handleSubmitForm(e)} encType="multipart/form-data" className="w-2/3 mobile:mt-3 mobile:w-full">
                    
                    
                    <Input inputType="input" type="text" name="title" placeholder="Title (optional)" changeVal={e => handleFormInput(e)} />
                    <Input inputType="textarea" type="text" name="description" placeholder="Description (optional)" changeVal={e => handleFormInput(e)} ></Input>

                    <CategorySelect inputChange={handleFormInput} currentValue={formData.gallery_id} gallerySelected={(id) => setGalleryId(id)} err={errors && errors.gallery_id} />

                    
                    <Input inputType="file" type="file" name="image" changeVal={ e => handleUploadImage(e) } err={ errors && errors.image} />
                    <button type="submit" style={{ fontWeight: 'bold'}} className="mt-2 hover:text-gray-700">Send</button>
                </form>
                { 
                    imageData.image ? <img src={imageData.image} style={{ width: '30%' }} className="block ml-16 mobile:ml-0" /> 
                        : 
                        <div style={{ width: '40%', height: '300px'}} className="bg-gray-300 flex justify-center items-center ml-16 mobile:ml-0">Preview</div>
                }
                </div>

        </div>
    )
}

export default CreatePainting