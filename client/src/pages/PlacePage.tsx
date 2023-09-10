import { faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTableCells } from '@fortawesome/free-solid-svg-icons/faTableCells';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';
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
const PlacePage = () => {
    const [place, setPlace] = useState<PlacesProps | null>(null)
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data)
        })
    }, [id])

    if (!place) return ''

    

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
            <h1 className='text-3xl mr-36'> {place.title}</h1>
            <AddressLink>{place.address}</AddressLink>

            <PlaceGallery place={place} />

            <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn as React.ReactNode} <br />
                    Check-out: {place.checkOut as React.ReactNode} <br />
                    Max number of guests: {place.maxGuests as React.ReactNode}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className='font-semibold text-2xl'>Extra Info</h2>
                </div>
                <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>
            </div>
        </div>
    )
}

export default PlacePage