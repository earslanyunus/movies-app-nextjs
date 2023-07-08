import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {getProfilePicture, signOut} from "../firebase/index.js";
import Button from "./Button.jsx";
import { useRouter } from 'next/router'
import Link from 'next/link.js';
import Image from 'next/image.js';


// 40px to rem
function Navbar({setIsMenuOpen, isMenuOpen}) {
    const router = useRouter()
    const [profilePic, setProfilePic] = useState(null)
    // const isAuth= false
    const isAuth = useSelector(state => state.auth.isAuth)
    const user = useSelector(state => state.auth.user)
    const [search, setSearch] = useState('')
    React.useEffect(() => {
        if (user) {
            getProfilePicture(user.uid).then((url) => {
                    setProfilePic(url)
                }
            )

        }
    }, [user])
    const buttonHandler = () => {
        router.push('/login')
        // setIsMenuOpen(false)
    }
    const menuButtonHandler = () => {
        // setIsMenuOpen(!isMenuOpen)
    }
    const searchHandler = (e) => {
        setSearch(e.target.value)
    }
    const searchButtonHandler = (e) => {
        e.preventDefault()
        router.push(`/search/${search}`)
        setSearch('')
        // setIsMenuOpen(false)
    }
    const navbtnClickedHandler = () => {
        if (isMenuOpen) {
            // setIsMenuOpen(false)
        }
    }
    return (
        <div className=' flex  border-b border-gray-200 mb-6'>
            <nav
                className={isMenuOpen ? 'w-[80vw] flex flex-col justify-between h-screen  py-4 px-4' : 'flex  justify-between items-center w-full  py-4 container mx-auto '}>
                {/*NAVBAR TOP AREA*/}
                <div className='flex flex-col gap-5 items-start lg:flex-row lg:items-center'>

                    <Link href={'/'}><img src={'/LogoandLogotype.svg'}  className='h-8' alt=""/></Link>
                    {/*NAVBAR SEARCH*/}
                    <form onSubmit={searchButtonHandler} action='#'  className={isMenuOpen ? 'flex gap-3' : 'hidden lg:flex lg:gap-3 '}>
                        <div className={isMenuOpen ? 'relative w-full' : 'hidden lg:block lg:relative '}>
                            <input value={search} onChange={searchHandler} type="text" placeholder='Search' name="" id=""
                                   className='w-full px-3.5 w-full py-2.5 pl-11 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 placeholder:text-text-md placeholder:font-normal focus:primary focus:shadow-[0px_0px_0px_4px_#F4EBFF]'/>
                            
                        </div>
                        <button type='submit'  className='btn-primary'>Ara</button>
                    </form>
                    {/*NAVBAR LINK*/}
                    <div className={isMenuOpen ? 'flex flex-col gap-1 w-full' : 'hidden lg:block lg:flex-row lg:flex lg:gap-4'}>
                        <div className='w-full'>
                            <Link href={'/'} onClick={navbtnClickedHandler} className={
                                `flex items-center  py-2 px-3 w-full gap-3 text-text-md font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 ${router.pathname=='/' && 'bg-gray-50 text-gray-900'}`
}>
                                Home
                            </Link>
                        </div>
                        <div className='w-full'>
                            <Link  href={'/explore-movie'}  onClick={navbtnClickedHandler} className={
                                `flex items-center  py-2 px-3 w-full gap-3 text-text-md font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-900 ${router.pathname=='/explore' && 'bg-gray-50 text-gray-900'}`
                            }>
                                Explore
                            </Link>
                        </div>
                        <div>

                        </div>

                    </div>


                </div>
                {/*NAVBAR MENU BUTTON*/}

                <button className={isMenuOpen ? 'hidden' : 'h-auto flex lg:hidden'} onClick={menuButtonHandler}><span
                    className="material-symbols-rounded text-gray-500">menu</span></button>

                {/*  NAVBAR BOTTOM AREA  */}
                <div className={isMenuOpen ? 'w-full' : 'hidden lg:block'}>
                    {isAuth && (
                        <div className='flex justify-between w-full border-t pt-6 lg:border-0 lg:pt-0 gap-6'>
                            <Link href={'/profile'} className='flex gap-3'>
                                <img src={profilePic} alt="" className='rounded-full h-10'/>
                                <div className='flex flex-col'>
                                    <p className='text-text-sm font-semibold text-gray-700'>{user.displayName}</p>
                                    <p className='text-text-sm font-normal text-gray-600'>{user.email}</p>
                                </div>

                            </Link>
                            <button onClick={signOut}><span className="material-symbols-rounded">logout</span></button>

                        </div>

                    )
                    }
                    {!isAuth && (
                        <Button type={'button'} onClick={buttonHandler} variant={'primary'} text='Login'></Button>
                    )}
                </div>

            </nav>
            {/*NAVBAR CLOSE SIDE*/}
            <div
                className={isMenuOpen ? 'w-[20vw] bg-gray-500 h-screen flex justify-center items-start pt-4' : 'hidden'}>
                <button onClick={menuButtonHandler}><span className="material-symbols-rounded text-white">close</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;