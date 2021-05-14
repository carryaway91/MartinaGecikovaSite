
import React, { useState, useEffect, useContext } from 'react'
import Input from '../../../UI/Input'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import apiClient from '../../../services/api'

const About = () => {
    const { changeTitle } = useContext(ChangeTitleContext)
    const [introFormData, setIntroFormData] = useState({ front_title: '', front_second_title: '', photo: '' })
    const [aboutTextFormData, setAboutTextFormData] = useState({ about: '', aboutPhoto: ''})
    const [errors, setErrors] = useState()
    
    useEffect(() => {
        changeTitle('Intro & About info details')
    }, [changeTitle])
    
    useEffect(() => {
        apiClient.get('/api/intro').then(res => {
            setIntroFormData({
                ...introFormData,
                front_title: res.data.data.main_title,
                front_second_title: res.data.data.second_title,
            })
        })
        
        
        apiClient.get('/api/about-me').then(res => {
            setAboutTextFormData({
                ...aboutTextFormData,
                about: res.data.data.about
            })
        })
    }, [])
    
    const handleSubmitIntroPhoto = e => {
        if(e.target.files[0]) {
            setIntroFormData({
                ...introFormData,
                photo: e.target.files[0]
            })
        }
    }
    
    const handleSetIntroFormData = e => {
        setIntroFormData({
            ...introFormData,
            [e.target.name]: e.target.value
        })
    }   
    
    const handleSubmitAboutData = () => {
        const data = new FormData
        data.append('about', aboutTextFormData.about)
        data.append('aboutPhoto', aboutTextFormData.aboutPhoto)
        apiClient.get('/sanctum/scrf-cookie').then(() => {
            apiClient.post('/api/about-me', data).then(res => {
                alert('Your about page has been updated!')
            }).catch(err => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors)
            })
        })
    }
    
    const handleSubmitIntroData = () => {
        const data = new FormData
        data.append('front_title', introFormData.front_title)
        data.append('front_second_title', introFormData.front_second_title)
        data.append('photo', introFormData.photo)
        
        apiClient.get('sanctum/csrf-cookie').then(() => {
            apiClient.post('/api/intro', data).then(res => {
                alert('Your intro page has been updated!')
            }).catch(err => {
                setErrors(err.response.data.errors)
            })
        })
    }
    
    const handleSubmitAboutPhoto = e => {
        if (e.target.files[0]) {
            setAboutTextFormData({
                ...aboutTextFormData,
                aboutPhoto: e.target.files[0]
            })
        }
    }
    
    
    return (
        <div>

            <h2 className="text-4xl pb-5">Front page info</h2>
            
            <form encType="multipart/form-data" onSubmit={e => e.preventDefault()}>
                <Input inputType="input"
                    type="text"
                    name="front_title"
                    placeholder="Main title"
                    value={introFormData.front_title}
                    changeVal={e => handleSetIntroFormData(e)}
                    err={errors && errors.front_title }          
                />
               
                <Input inputType="input"
                    type="text"
                    name="front_second_title"
                    placeholder="Second title"
                    value={introFormData.front_second_title}
                    changeVal={e => handleSetIntroFormData(e)}
                    err={errors && errors.front_second_title }                
                />

                <Input inputType="file" 
                    type="file"
                    name="profilePic"
                    changeVal={e => handleSubmitIntroPhoto(e)}
                    err={errors && errors.photo}
                 />

                <button className="font-bold my-2 hover:text-gray-600" type="submit" onClick={handleSubmitIntroData}>Send</button>
                </form>


            <hr />



            <div>
                <h2 className="text-4xl py-5">About info</h2>
                <CKEditor
                    editor={ClassicEditor}
                    data={aboutTextFormData.about}
                    config={{
                        options: [{
                            model: 'paragraph', class: 'span'
                        }]
                    }}
                    onChange={(e, editor) => {
                        const data = editor.getData()
                        setAboutTextFormData({ 
                            ...aboutTextFormData,
                            about: data })
                    }} />
                    { errors && errors.about && (<p className="text-red-600 font-bold">{errors.about}</p>)}
                <Input inputType="file" type="file" name="aboutPhoto" changeVal={e => handleSubmitAboutPhoto(e)} err={ errors && errors.aboutPhoto} />
                <button className="font-bold mt-2 hover:text-gray-600" type="submit" onClick={handleSubmitAboutData}>Send about me info</button>
            </div>
            
        </div>
    )
}

export default About