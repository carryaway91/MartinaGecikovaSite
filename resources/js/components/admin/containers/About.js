import React, { useState, useEffect, useContext } from 'react'
import Input from '../../../UI/Input'
import { ChangeTitleContext } from '../TitleContext/ChangeTitleContext'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const About = () => {
    const { changeTitle } = useContext(ChangeTitleContext)
    const [introFormData, setIntroFormData] = useState({ front_title: '', front_second_title: '', photo: '' })
    const [aboutTextFormData, setAboutTextFormData] = useState({ about: '', photo: ''})

    useEffect(() => {
        changeTitle('Intro & About info details')
    }, [changeTitle])

    useEffect(() => {
        axios.get('/api/intro').then(res => {
            setIntroFormData({
                ...introFormData,
                front_title: res.data.data.main_title,
                front_second_title: res.data.data.second_title,
            })
        })

        
        axios.get('/api/about-me').then(res => {
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
        data.append('photo', aboutTextFormData.photo)
        axios.post('/api/about-me', data).then(res => {
            alert('Your about page has been updated!')
        }).catch(err => {
            console.log(err.response)
        })
    }

    const handleSubmitIntroData = () => {
        const data = new FormData
        data.append('front_title', introFormData.front_title)
        data.append('front_second_title', introFormData.front_second_title)
        data.append('photo', introFormData.photo)

        axios.post('/api/intro', data).then(res => {
            alert('Your into page has been updated!')
        })
    }

    const handleSubmitAboutPhoto = e => {
        if (e.target.files[0]) {
            setAboutTextFormData({
                ...aboutTextFormData,
                photo: e.target.files[0]
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
                />
               
                <Input inputType="input"
                    type="text"
                    name="front_second_title"
                    placeholder="Second title"
                    value={introFormData.front_second_title}
                    changeVal={e => handleSetIntroFormData(e)}
                />

                <Input inputType="file" 
                    type="file"
                    name="profilePic"
                    changeVal={e => handleSubmitIntroPhoto(e)}
                    />

                <button type="submit" onClick={handleSubmitIntroData}>Send</button>
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
                
                <Input inputType="file" type="file" name="photo" changeVal={e => handleSubmitAboutPhoto(e)} />
                <button type="submit" onClick={handleSubmitAboutData}>Send about me info</button>
            </div>
            
        </div>
    )
}

export default About