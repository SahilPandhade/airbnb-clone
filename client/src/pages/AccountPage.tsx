import React, { useContext } from 'react'
import { UserContext } from '../context/Context'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AccountPage = () => {
    const { ready, user } = useContext(UserContext)
    let { subpage } = useParams()
    if(subpage===undefined){
        subpage = 'profile'
    }
    const linkClasses = (type: string | null = null) => {
        let classes = 'py-2 px-6'
        if (type === subpage) {
            classes += ' bg-primary rounded-full'
        }
        return classes
    }
    if (!ready) {
        return 'Loading...'
    }
    if (!ready && !user) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-4'>
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>

            </nav>
        </div>
    )
}

export default AccountPage