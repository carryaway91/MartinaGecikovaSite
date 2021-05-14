import axios from 'axios'
import React, { useState } from 'react'
import Input from '../../../UI/Input'
import apiClient from '../../../services/api'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'


const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState()

    const handleChangeVal = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitData = e => {
        let data = new FormData
        data.append('email', formData.email)
    data.append('password', formData.password)

        axios.get('/sanctum/csrf-cookie').then( res => {
            axios.post('/login', data).then(res => {
                window.location = '/admin'
            }).catch(err => {
                setErrors(err.response.data.errors)
            })
        })
    }

    return (
        <div className="bg-gray-600 h-screen flex align-middle">
            <form className="w-1/4 m-auto bg-white mobile:w-4/5" onSubmit={e => e.preventDefault()}>
            <div className="bg-gray-800 px-6 py-6 flex justify-center mb-4"><h2 className="text-white">ADMIN LOGIN</h2></div>
            <div className="px-8 pb-4">
                <Input inputType="input" type="email" name="email" placeholder="Email" changeVal={handleChangeVal} err={errors && errors.email}/>
                <Input inputType="input" type="password" name="password" placeholder="Password" changeVal={handleChangeVal} err={errors && errors.password} />
            </div>
                <button onClick={handleSubmitData} className="flex justify-center w-full bg-gray-800 text-white py-4">Login</button>
            </form>
        </div>
    )
}

export default Login