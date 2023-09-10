import React from 'react'
import { PlaceType } from '../Types/Types'
const PlaceImg = ({ place,index=0,className=null }: { place: PlaceType,index?:number,className?:string | null }) => {
    if (!place.photos?.length) {
        return ''
    }

    if(!className){
        className = 'object-cover'
    }
    return (
        <img className={className} src={"http://localhost:4000/" + place.photos[index]} alt="Place img" />
    )
}

export default PlaceImg