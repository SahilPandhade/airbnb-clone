import axios from 'axios'
import React, { FormEvent, useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context/Context'

const LoginPage = () => {
    const {setUser} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect,setRedirect] = useState(false)
    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            })
            setUser(data)
            alert('Login Successful')
            setRedirect(true)
        } catch (e) {
            alert('Login failed!')
        }

    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type="text" placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="primary" type='submit'>Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet ? <Link className='underline text-black' to={'/register'} >Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage