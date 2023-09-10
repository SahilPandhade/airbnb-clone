export interface PlaceType {
    _id:string,
    __v:string,
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
    price:Number,
}

export interface BookingProps {
    __v: string,
    _id: string,
    place: PlaceType,
    user: string,
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
    price: Number,
    name: string,
    mobile: string,
    numberOfGuests: Number,
}