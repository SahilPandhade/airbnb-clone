import { faTableCells, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
interface PlaceType {
    photos: string[],
    __v: string,
    _id: string,
    owner: string,
    title: string,
    address: string,
    description: string,
    perks: string[],
    extraInfo: string,
    checkIn: string,
    checkOut: string,
    maxGuests: Number,
   
}
const PlaceGallery = ({ place }: { place: PlaceType }) => {
    const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false);

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='bg-black grid p-8 gap-4'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'>
                            <FontAwesomeIcon className='w-6 h-6' icon={faXmark} />
                            Close Button
                        </button>
                    </div>
                    {
                        place.photos?.length > 0 && place.photos.map((photo) => (
                            <div>
                                <img src={'http://localhost:4000/uploads/' + photo} alt='' />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {
                        place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos[0]} />
                            </div>
                        )
                    }
                </div>
                <div className='grid'>
                    {
                        place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/' + place.photos[1]} />
                        )
                    }
                    <div className='overflow-hidden'>
                        {
                            place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className='cursor-pointer aspect-square object-cover relative top-2' src={'http://localhost:4000/uploads/' + place.photos[2]} />
                            )
                        }
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                <FontAwesomeIcon icon={faTableCells} className='w-6 h-6' />
                Show more Photos
            </button>
        </div>
    )
}

export default PlaceGallery