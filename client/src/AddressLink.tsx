import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface PlacesProps {
    _id: string,
    __v: string,
    owner: string,
    title: string,
    address: string,
    photos: string[],
    description: string,
    perks: string[],
    extraInfo: string,
    checkIn: string,
    checkOut: string,
    maxGuests: Number,
    price: Number,
}
const AddressLink = ({children,className=null}:{children:React.ReactNode,className?:string|null}) => {
    if(!className){
        className = 'my-3 block'
    }
    className+=' flex gap-1 font-semibold underline'
    return (
        <a className={className}
            target='_blank' href={'https://maps.google.com/?q=' + {children}}>
            <FontAwesomeIcon icon={faLocationDot} className='h-6 w-6' />
            {children}
        </a>
    )
}

export default AddressLink