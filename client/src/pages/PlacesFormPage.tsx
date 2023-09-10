import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
    const { id } = useParams()
    const [addedPhotos, setAddedPhotos] = useState<string[]>([])
    const [title, setTitle] = useState<string>('');
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState<string[]>([]);
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(0)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then((response) => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
        })
    }, [id])

    const inputHeader = (text: string) => {
        return <h2 className='text-xl mt-4'>{text}</h2>
    }
    const inputDescription = (text: string) => {
        return <p className='text-gray-500 text-sm'>{text}</p>
    }
    const preInput = (header: string, description: string) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>)
    }

    const savePlace = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const placeData = {
            title,
            address,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        }
        if (id) {
            //update a place
            axios.put('/places', { id, ...placeData }).then((data) => {
                console.log(data)
                setRedirect(true)
            }).catch((err) => {
                console.log("Error in updating place info", err);
            })
        }
        else {
            //add a new place
            axios.post('/places', placeData).then((data) => {
                console.log(data)
                setRedirect(true)
            }).catch((err) => {
                console.log("Error in Adding new place", err);
            })
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place.Should be short and catchy as in advertisement')}
                <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' placeholder='title, for example: My lovely apt' />

                {preInput('Address', 'Address to this place.')}
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder='address' />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <h2 className='text-xl mt-4'>Description</h2>
                <p className='text-gray-500 text-sm'>description of the place</p>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <h2 className='text-xl mt-4'>Perks</h2>
                <p className='text-gray-500 text-sm'>select all the perks of your place</p>
                <Perks selected={perks} onChange={setPerks} />

                <h2 className='text-xl mt-4'>Extra info</h2>
                <p className='text-gray-500 text-sm'>house rules, etc</p>
                <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />

                <h2 className='text-xl mt-4'>Check in&out times</h2>
                <p className='text-gray-500 text-sm'>add check in and out times,remember to have some window for cleaning the room between guests.</p>

                <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-2'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="text" placeholder='14' />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="text" placeholder='11' />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(Number(e.target.value))} />
                    </div>

                    <div>
                        <h3 className='mt-2 -mb-1'>Price per Night</h3>
                        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                    </div>
                </div>

                <div>
                    <button className='primary my-4'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage