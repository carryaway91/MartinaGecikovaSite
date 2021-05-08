import React, { useState, useEffect, useContext} from 'react'
import apiClient from '../../../services/api'
import Thumbnail from '../../public/components/Thumbnail/Thumbnail'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'
import Input from '../../../UI/Input'
import { Redirect } from 'react-router'

const CreateGallery = () => {
    const { changeTitle } = useContext(ChangeTitleContext)
    const [formData, setFormData] = useState({ coverPhoto: '', name: ''})
    const [imageData, setImageData] = useState({ image: '', alt: ''})
    const [errors, setErrors] = useState()
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        changeTitle('Add new gallery')
    }, [changeTitle])

    const handleFormInput = e => {
        setFormData({
            ...formData,
            name : e.target.value
        })
    }


    const handleUploadImage = e => {
        
        if(e.target.files[0]) {
            setFormData({
                ...formData,
                coverPhoto: e.target.files[0],
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
        data.append('coverPhoto', formData.coverPhoto);
        data.append('name', formData.name);
        
        apiClient.get('/sanctum/csrf-cookie').then(() => {
            apiClient.post('/api/gallery', data).then(res => {
                if(res.status == 200) {
                    setRedirect(true)
                }
            }).catch(err => {
                setErrors(err.response.data.errors)
            })
        })
    }

    return (
        <div style={{ minHeight: '100%'}} className="w-full flex mobile:flex-col-reverse">
            { redirect && <Redirect to="/admin" /> }
            <form onSubmit={ (e) => handleSubmitForm(e)} encType="multipart/form-data" className="w-2/3">
                <Input inputType="input" type="text" name="name" placeholder="Gallery Name"
                    changeVal={e => handleFormInput(e)
                    }
                    err={ errors && errors.name}
                />

                <Input inputType="file" type="file" name="coverPhoto"
                    changeVal={e => handleUploadImage(e)} err={ errors && errors.coverPhoto }/>
                <button type="submit" style={{ fontWeight: 'bold'}} className="mt-2 hover:text-gray-700">Send</button>
            </form>
            <div>
                { imageData.image && <img src={imageData.image} alt={imageData.alt} style={{ width: '20vw' }} className="ml-12 mobile:ml-0 mobile:mb-2" />}
            </div>
        </div>
    )
}

export default CreateGallery