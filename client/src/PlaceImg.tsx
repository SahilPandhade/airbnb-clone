import React from 'react'
interface PlaceType {
    photos: string[],
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
    __v: number
}
const PlaceImg = ({ place,index=0,className }: { place: PlaceType,index?:number,className?:string }) => {
    if (!place.photos?.length) {
        return ''
    }

    if(!className){
        className = 'object-cover'
    }
    return (
        <img className={className} src={"http://localhost:4000/uploads/" + place.photos[index]} alt="Place img" />
    )
}

export default PlaceImg