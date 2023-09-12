import { faAirbnb } from '@fortawesome/free-brands-svg-icons'
import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from './context/Context'
import { Link } from 'react-router-dom'
const Header = () => {
    const { user } = useContext(UserContext)
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    return (
        <div>
            <header className='flex justify-between'>
                <Link to="/" className='flex items-center gap-1'>
                    <FontAwesomeIcon icon={faAirbnb} className='w-8 h-8 text-primary' />
                    <span className='font-bold text-xl text-primary'>airbnb</span>
                </Link>
                <div className="cursor-pointer flex gap-4 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                    <div className='font-medium'>Anywhere</div>
                    <div className='border-l border-gray-300'></div>
                    <div className='font-medium'>Any week</div>
                    <div className='border-l border-gray-300'></div>
                    <div className='text-gray-500'>Add guests</div>
                    <button className='bg-primary text-white p-1 w-8 h-8 rounded-full'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='w-4 h-4' />
                    </button>
                </div>
                {/* <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
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
                </Link> */}
                <div onClick={() => setOpenMenu((prev) => !prev)} className="cursor-pointer relative flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
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

                </div>
            </header>
            {openMenu && <div className='absolute top-200 mt-2 right-20 shadow-md shadow-gray-400 py-2 px-0 rounded-lg '>
                <ul>
                    {user && <><li>Messages</li>
                        <li>Notifications</li>
                        <li>Trips</li>
                        <li>Wishlists</li>
                        <div className='border-t border-gray-300 w-100'></div>
                        <li><Link to={'/account'}>Account</Link></li>
                    </>}
                    {!user && (<>
                        <li>
                            <Link to={'/login'}>Login</Link>
                        </li>
                        <li><Link to={'/register'}>Sign In</Link></li>
                    </>)}
                    <li>Help</li>
                </ul>
            </div>}
        </div>
    )
}

export default Header