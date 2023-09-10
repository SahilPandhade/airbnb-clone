import { faCloudArrowUp, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'

const PhotosUploader = ({addedPhotos,onChange}:{addedPhotos:string[],onChange:React.Dispatch<React.SetStateAction<string[]>>}) => {
    const [photoLink, setPhotoLink] = useState<string>('')
    const addPhotoByLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink });
        onChange((prevPhotos) => {
            return [...prevPhotos, fileName]
        })
        setPhotoLink('')
    }
    const uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files!;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => {
            const { data: fileNames } = response;
            onChange((prevPhotos) => {
                return [...prevPhotos, ...fileNames]
            })
            console.log(data)
        })
    }

    const removePhoto = (e:React.MouseEvent<HTMLButtonElement>,link:string) =>{
        e.preventDefault()
        onChange([...addedPhotos.filter((photo)=>photo !== link)])
    }

    const selectAsMainPhoto = (e:React.MouseEvent<HTMLButtonElement> ,link:string) => {
        e.preventDefault()
        onChange([link,...[...addedPhotos.filter((photo)=>photo !== link)]]);
    }
    return (
        <>
            <div className='flex gap-2'>
                <input value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} type='text' placeholder={'Add using a link ....jpg'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 grow rounded-2xl'>Add&nbsp;photo</button>
            </div>
            <div className="mt-2 grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map((link, index) => {
                    return (
                        <div key={index} className='h-32 flex relative'>
                            <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/' + link}></img>
                            <button onClick={(e)=>removePhoto(e,link)} className='absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
                                <FontAwesomeIcon icon={faTrash} className='w-6 h-6'/>
                            </button>
                            <button onClick={(e)=>selectAsMainPhoto(e,link)} className='absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
                                {
                                    link===addedPhotos[0] && (
                                        <FontAwesomeIcon icon={faStar} className='w-6 h-6 text-black'/>
                                    )
                                }
                                {
                                    link!==addedPhotos[0] && (
                                        <FontAwesomeIcon icon={faStar} className='w-6 h-6'/>
                                    )
                                }
                                
                            </button>
                        </div>
                    )
                })}
                <label
                    className='cursor-pointer h-32 flex gap-1 items-center justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                    <input type='file' multiple className='hidden' onChange={uploadPhoto} />
                    <FontAwesomeIcon className='w-8 h-8 p-2' icon={faCloudArrowUp} />
                    Upload
                </label>
            </div>
        </>
    )
}

export default PhotosUploader