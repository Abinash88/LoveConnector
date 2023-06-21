import Link from 'next/link'
import React from 'react'
import { HeartIcon} from '@heroicons/react/24/solid'

const Header = () => {
  return (
    <div className='flex justify-between items-center h-[60px]  px-8'>
        <div className="logo">
            <Link href='/' className='flex space-x-1 items-center'><h1 className='text-[22px] font-bold text-gray-600'>Love Connector</h1> <HeartIcon className='h-7 text-red-500'/> </Link>
        </div>
        <nav>
            <ul>
                <li> <Link className='login' href={'/'}>Login</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header