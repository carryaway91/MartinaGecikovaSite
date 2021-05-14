import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from '../../../../UI/Input'
import { TweenMax, Power3} from 'gsap'

const Contact = () => {
    const [formData, setFormData] = useState({ email: '', message: ''})
    const [errors, setErrors] = useState()
    const [sent, setSent] = useState(false)

    useEffect(() => {
        TweenMax.fromTo('.anime', {
            opacity: 0,
            y: -20
        }, {
            opacity: 1,
            y: 0,
            ease: Power3.easeInOut,
            stagger: 0.2
        },)
    },[])

    const handleChangeVal = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitData = (e) => {
        let data = new FormData
        data.append('email', formData.email)
        data.append('message', formData.message)

        axios.post('/api/contact', data).then(res => {
            setSent(true)
        }).catch(err => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div className="w-full">
            <h2 className="text-white flex justify-center text-5xl anime opacity-0">Feel free to contact me!</h2>
            <div className="bg-white mt-4 anime opacity-0" style={{ height: '1px'}}></div>
            <div className="w-3/4 mobile:w-full flex justify-center mobile:flex-col mt-10">
                
                {
                    !sent ? (

                <form className="w-3/4 mobile:w-full anime opacity-0" onSubmit={e => e.preventDefault()}>
                    <div className="mb-3">
                        <Input inputType="input" type="email" name="email" placeholder="Your Email" changeVal={e => handleChangeVal(e)} err={errors && errors.email} />
                    </div>
                    <div className="mb-3">
                        <Input inputType="textarea" type="text" height="250px" name="message" placeholder="Message" changeVal={e => handleChangeVal(e)} err={errors && errors.message} /> 
                    </div>
                    <button type="submit" onClick={handleSubmitData} className="w-3/4 flex justify-center bg-white py-3">Send</button>
                </form>
                    )
                        :
                        (
                            <p className="text-3xl text-white">Thank you for your feedback!</p>
                        )
                }
                <ul className="text-white flex flex-col ml-24 mobile:ml-0 anime mobile:mt-10 opacity-0">
                    <li className="flex mb-8">
                        <span className="mr-10">
                        <svg width="30px" height="30px" viewBox="0 0 97.713 97.713" fill="white">
                            <g>
                                <path d="M48.855,0C29.021,0,12.883,16.138,12.883,35.974c0,5.174,1.059,10.114,3.146,14.684
                                    c8.994,19.681,26.238,40.46,31.31,46.359c0.38,0.441,0.934,0.695,1.517,0.695s1.137-0.254,1.517-0.695
                                    c5.07-5.898,22.314-26.676,31.311-46.359c2.088-4.57,3.146-9.51,3.146-14.684C84.828,16.138,68.69,0,48.855,0z M48.855,54.659
                                    c-10.303,0-18.686-8.383-18.686-18.686c0-10.304,8.383-18.687,18.686-18.687s18.686,8.383,18.686,18.687
                                    C67.542,46.276,59.159,54.659,48.855,54.659z"/>
                            </g> 
                        </svg>
                        </span>
                        Fake street 15</li>
                    <li className="flex mb-8">
                        <span className="mr-10">
                            <svg width="30px" height="30px" viewBox="0 0 513.64 513.64" fill="white">
                                <g>
                                    <g>
                                        <path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72
                                            c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68
                                            c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44
                                            l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z"/>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        +421911111111</li>
                    <li className="flex mb-8">
                        <span className="mr-10">
                            <svg width="30px" height="30px" viewBox="0 0 512 512" fill="white">
                                <g>
                                    <g>
                                        <path d="M467,61H45C20.218,61,0,81.196,0,106v300c0,24.72,20.128,45,45,45h422c24.72,0,45-20.128,45-45V106
                                            C512,81.28,491.872,61,467,61z M460.786,91L256.954,294.833L51.359,91H460.786z M30,399.788V112.069l144.479,143.24L30,399.788z
                                            M51.213,421l144.57-144.57l50.657,50.222c5.864,5.814,15.327,5.795,21.167-0.046L317,277.213L460.787,421H51.213z M482,399.787
                                            L338.213,256L482,112.212V399.787z"/>
                                    </g>
                                </g>

                            </svg>
                        </span>
                        <a href="mailto: fake@email.com">fake@email.com</a>
                        </li>
                </ul>
            </div>
        </div>
    )
}

export default Contact