import { faHouse, faListUl, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AccountNav = () => {
    const {pathname} = useLocation()    // /account
    let subpage = pathname.split('/')?.[2]    
    const linkClasses = (type: string | null = null) => {
        if(subpage===undefined){
            subpage = 'profile'
        }   
        let classes = 'inline-flex gap-1 py-2 px-6  rounded-full'
        if (type === subpage) {
            classes += ' bg-primary'
        } else {
            classes += ' bg-gray-200'
        }
        return classes
    }
    return (
        <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
            <Link className={linkClasses('profile')} to={'/account'}>
                <FontAwesomeIcon icon={faUser} className='w-6 h-6' />
                My profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <FontAwesomeIcon icon={faListUl} className='w-6 h-6' />
                My bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <FontAwesomeIcon icon={faHouse} className='w-6 h-6' />
                My accommodations
            </Link>
        </nav>
    )
}

export default AccountNav