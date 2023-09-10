import { faDog, faDoorOpen, faRadio, faSquareParking, faTv, faWifi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface PerksProps{
    selected:string[],
    onChange:React.Dispatch<React.SetStateAction<string[]>>
}
const Perks:React.FC<PerksProps> = ({selected,onChange}) => {
    const handleSelect = (e:React.ChangeEvent<HTMLInputElement>)=>{
       const {checked,name}  = e.target;
        if(checked){
            onChange([...selected,name])
        } else {
            onChange([...selected.filter(selectedName=>selectedName !== name)]);
        }
    }
    return (
        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' checked={selected.includes('wifi')} name='wifi' onChange={handleSelect}/>
                <FontAwesomeIcon icon={faWifi} className='w-6 h-6'/>
                <span>Wifi</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' checked={selected.includes('parking')} name='parking' onChange={handleSelect}/>
                <FontAwesomeIcon icon={faSquareParking}  className='w-6 h-6'/>
                <span>Free parking spot</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' checked={selected.includes('tv')} name='tv' onChange={handleSelect}/>
                <FontAwesomeIcon icon={faTv}  className='w-6 h-6'/>
                <span>TV</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' checked={selected.includes('radio')} name='radio' onChange={handleSelect}/>
                <FontAwesomeIcon icon={faRadio}  className='w-6 h-6'/>
                <span>Radio</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' checked={selected.includes('pets')} name='pets' onChange={handleSelect}/>
                <FontAwesomeIcon icon={faDog}  className='w-6 h-6'/>
                <span>Pets</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' checked={selected.includes('entrance')} name='entrance' onChange={handleSelect}/>
                <FontAwesomeIcon icon={faDoorOpen}  className='w-6 h-6'/>
                <span>Private entrance</span>
            </label>
        </div>
    )
}

export default Perks