import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { UserContext } from './context/Context'
import { Link } from 'react-router-dom'
const Header = () => {
    const {user} = useContext(UserContext)
    return (
        <div>
            <header className='flex justify-between'>
                <Link to="/" className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faAirbnb} className='w-8 h-8' />
                    <span className='font-bold text-xl'>airbnb</span>
                </Link>
                <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                    <div>Anywhere</div>
                    <div className='border-l border-gray-300'></div>
                    <div>Any week</div>
                    <div className='border-l border-gray-300'></div>
                    <div>Add guests</div>
                    <button className='bg-primary text-white p-1 rounded-full'><FontAwesomeIcon icon={faMagnifyingGlass} className='w-4 h-4' /></button>
                </div>
                <Link to={user? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
                    <FontAwesomeIcon icon={faBars} className='w-6 h-6' />
                    <div className="flex bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                        <FontAwesomeIcon icon={faUser} className='w-6 h-6 relative top-1' />
                    </div>
                    {
                        !!user && (
                            <div>
                                {user.name}
                            </div>
                        )
                    }
                </Link>
            </header>
        </div>
    )
}

export default Header