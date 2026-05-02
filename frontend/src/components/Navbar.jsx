import { UserIcon } from '@heroicons/react/24/solid';

function Navbar(){
    return(
    <>
        <div className="flex-shrink-0 h-20 bg-white border flex justify-between px-3">
            <div className='flex items-center'>
                <UserIcon className="w-7 h-7 md:w-8 md:h-8 text-white bg-blue-500 m-2 p-1 rounded" />
                <h1 className='font-sans font-medium text-[17px] md:text-[19px] ml-1 md:ml-2'>Contact Manager</h1>
            </div>
            <div className='hidden lg:flex items-center'>
                <UserIcon className="w-8 h-8 text-white bg-blue-500 m-2 p-[7px] rounded-full" />
            </div>
            
        </div>
    </>
    )
}

export default Navbar