import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
interface PlacesProps {
    _id:string,
    __v:string,
    owner: string,
    title: string,
    address: string,
    photos: [string],
    description: string,
    perks: [string],
    extraInfo: string,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price:Number,
}
export const IndexPage = () => {
    const [places, setPlaces] = useState<PlacesProps[]>([])
    useEffect(() => {
        axios.get('/places').then((response) => {
            console.log(response.data)
            setPlaces(response.data)
        })
    }, [])
    return (
        <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                places.length > 0 && places.map((place,index) => (
                    <Link to={'/places/'+place._id} key={index}>
                        <div className='bg-gray-500 mb-2 rounded-2xl'>
                            {
                                place.photos?.[0] && (
                                    <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt='' />
                                )
                            }
                        </div>
                        <h2 className='font-bold'>{place.address}</h2>
                        <h3 className='text-sm text-gray-500'>{place.title}</h3>
                        <div>
                            {/* {(place.price===undefined ? 'Price NA' : "$ "+place.price+"  per Night")} */}
                            <span className='font-bold'>{"$ "+place.price}</span> per Night
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
