import React, { useContext, useState } from 'react'
import { UserContext } from '../context/Context'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../components/AccountNav'

const AccountPage = () => {
    const { ready, user, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState<string | null>(null)
    
    let { subpage } = useParams()
    if (subpage === undefined) {
        subpage = 'profile'
    }

    const handleLogOut = async () => {
        await axios.post('/logout');
        setRedirect('/')
        setUser(null)
    }
    if (!ready) {
        return 'Loading...'
    }
    if (!ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {
                subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto">
                        Logged in as {user?.name} ({user?.email})<br />
                        <button onClick={handleLogOut} className='primary max-w-sm mt-2'>Logout</button>
                    </div>
                )
            }
            {
                subpage === 'places' && (
                    <PlacesPage />
                )
            }
        </div>
    )
}

export default AccountPage