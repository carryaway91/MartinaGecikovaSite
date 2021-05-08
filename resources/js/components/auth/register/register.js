import axios from 'axios'
import React, { useState } from 'react'
import Input from '../../../UI/Input'

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm_password: ''})
    const [errors, setErrors] = useState()

    const handleChangeVal = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitData = () => {

        let data = new FormData
        data.append('name', formData.name)
        data.append('email', formData.email)
        data.append('password', formData.password)
        data.append('password_confirmation', formData.confirm_password)

        axios.post('/register', data).then(res => {
            if(res.status == 201) {
                window.location = '/admin'
            }
        }).catch(err => {
            setErrors(err.response.data.errors)
        })
    }
    
    return (
        <div className="bg-gray-600 h-screen flex align-middle">
            <form className="w-1/4 m-auto bg-white" onSubmit={e => e.preventDefault()}>
            <div className="bg-gray-800 px-6 py-6 flex justify-center mb-4"><h2 className="text-white">REGISTER</h2></div>
            <div className="px-8 pb-4">
                <Input inputType="input" type="text" placeholder="Name" name="name" changeVal={handleChangeVal} err={errors && errors.name} />
                <Input inputType="input" type="email" placeholder="Email" name="email" changeVal={handleChangeVal} err={errors && errors.email} />
                <Input inputType="input" type="password" placeholder="Password" name="password" changeVal={handleChangeVal} err={errors && errors.password} />
                <Input inputType="input" type="password" placeholder="Confirm Password" name="confirm_password" changeVal={handleChangeVal} err={errors && errors.password[1] } />
            </div>
                <button onClick={handleSubmitData} className="flex justify-center w-full bg-gray-800 text-white py-4">Register</button>
            </form>
        </div>
    )
}

export default Register