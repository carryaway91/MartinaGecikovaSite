import React, { useState, useEffect, useContext } from 'react'
import apiClient from '../../../services/api'
import { Redirect, useParams } from 'react-router-dom'
import Portrait from '../components/Portrait/Portrait'
import ControlPanel from '../components/ControlPanel/ControlPanel'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'
import Input from '../../../UI/Input'
 
const ShowGallery = (props) => {
    const {changeTitle} = useContext(ChangeTitleContext)

    const [editing, setEditing] = useState(false)

    const [formData, setFormData] = useState({ name: '', coverPhoto: ''})
    const [previewImage, setPreviewImage] = useState({ url: '', alt: ''})
    const [redirect, setRedirect] = useState(false)


    let { id } = useParams()

    const [galleries, setGalleries] = useState()

    useEffect(() => {
        changeTitle('Gallery details')
    }, [changeTitle])

    useEffect(() => {
        axios.get(`/api/gallery/${id}`)
                .then(res => {
                    setGalleries(res.data.data)
                    setFormData({...formData, name: res.data.data.name, image: res.data.data.image })
                })
    }, [])


    const handleDeleteGallery = () => {
        const confirmation = window.confirm('Do you really want to delete' + galleries.name + '?')

        if(confirmation) {
            apiClient.get('/sanctum/csrf-cookie').then(() => {
                apiClient.post(`/api/gallery/${galleries.id}/delete`)
                .then(res => {
                    setRedirect(true)
                })
            })
            }
    }

    const handleUploadPhoto = e => {
        if(e.target.files[0]) {
            setFormData({
                ...formData,
                coverPhoto: e.target.files[0]
            })
        }
        handleShowPreview(e)
    }

    const handleShowPreview = e => {
        setPreviewImage({
            url: URL.createObjectURL(e.target.files[0]),
            alt: e.target.files[0].name
        })
    }  
    
    const handleSubmitForm = () => {
        const confirmation = window.confirm('Do you want to save these changes?')

        if(confirmation) {
           let data = new FormData()
           data.append('coverPhoto', formData.coverPhoto)
           data.append('name', formData.name)
           
            apiClient.get('/sanctum/csrf-cookie').then(() => {
                apiClient.post(`/api/gallery/${galleries.id}/update`, data)
                .then(res => {
                    setRedirect(true)
                    })
                })
        }
    }

    const handleToggleEditing = () => {
        setEditing(!editing)
    }

    return (
        <div className="flex flex-col">
            { redirect && <Redirect to="/admin" />}
            <div className="flex justify-between mobile:flex-col">

            <div className="flex mobile:flex-col  mobile:mb-2">
                <div>
                    <p className="text-2xl font-bold mb-2">Gallery cover photo: </p>
                { 
                    galleries &&  <img src={galleries.image} style={{ width: '250px' }}/> 
                }
                </div>




                <div className="ml-12 mobile:ml-0 mobile:mt-2">
                    <h3 className="text-2xl font-bold mb-2">Gallery name: </h3> 
                    { galleries && !editing 
                    ?
                    <p>{ galleries.name }</p> 
                    :
                    editing 
                    ? 
                    ( 
                        <div>
                        <form encType="multipart/form-data">
                            <Input name="name" inputType="input" type="text" value={formData.name} 
                                changeVal={ e => setFormData({ ...formData, name: e.target.value })} />
                            <Input inputType="file" type="file" changeVal={e => handleUploadPhoto(e)} />
                        </form>
                    </div>
                    )
                    
                    : 
                    null
                }
                {

                    editing && !previewImage.url ?
                    <div className="bg-gray-400 flex justify-center items-center w-40 h-52 mt-6">
                    Preview 
                    </div>
                    : editing && previewImage.url ?
                        <img src={previewImage.url} alt={previewImage.alt} className="w-40 mt-6" />
                    : null
                }        
                </div>
            </div>
            <ControlPanel delete={handleDeleteGallery} submitForm={handleSubmitForm} editing={editing} toggleEditing={ handleToggleEditing }/>
            
            </div>
            <hr className="my-8"/>
            <h1 className="text-1xl font-bold">Gallery photos</h1>
            <ul className="flex flex-wrap">
                {
                    galleries && galleries.photos.map(p => <li><Portrait image={p} /></li>)
                }
            </ul>
        </div>
    )
}

export default ShowGallery