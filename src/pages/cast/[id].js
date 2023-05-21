import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {getPersonDetails, getPersonMovies} from "../../utils/MovieDb.js";
import PerView from "../../components/PerView.js";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";

function CastDetail({playerMovies,player}) {
    const router = useRouter();
    const { id } = router.query;


    


    // useEffect(() => {


    //     getPersonDetails(id).then((data) => {
    //         console.log(data)
    //         setPlayer(data)
    //     })
    //     getPersonMovies(id).then((data) => {
    //             console.log(data)
    //         data = data.cast.sort((a, b) => b.popularity - a.popularity)
    //         setPlayerMovies(data)
    //     }
    //     )

    // }, [])

    return (
        <div className='container flex flex-col'>
            {/*IMAGE AND INFO*/}
            <div className='flex flex-col md:flex-row'>
                {/*IMAGE AREA*/}
                <div className='flex flex-col md:w-1/3 md:h-full'>


                    <img className='w-full' src={`https://image.tmdb.org/t/p/original/${player?.profile_path}`} alt=""/>
                    {/*IMAGE TEXT*/}

                </div>
                {/*IMAGE RIGHT INFO*/}
                <div className='md:ml-4 flex flex-col md:w-2/3'>
                    {/*TITLE AREA*/}
                    <div className='mt-3'>
                        <p className='text-display-sm font-semibold text-gray-700'>{player?.name}</p>
                    </div>
                    {/*OVERVIEW AREA*/}
                    <div className='mt-4'>
                        <p className='text-text-md font-normal text-gray-600'>{player?.biography}</p>
                    </div>
                    {/*INTERRACTION AREA*/}
                    <div className='flex justify-center gap-6 md:justify-start mt-6'>
                    <button className="border-2  border-gray-300 hover:bg-gray-50  rounded-lg text-gray-700 hover:text-gray-800 text-[20px] p-2">
              <AiOutlineHeart />
            </button>
            <button className="border-2  border-gray-300 hover:bg-gray-50  rounded-lg text-gray-700 hover:text-gray-800 text-[20px] p-2">
              <BsBookmarkPlus />
            </button>
                    </div>
                    {/*SHORT INFO*/}
                    <div className='mt-6 flex flex-col gap-3'>
                        <div className='flex flex-col gap-0.5 '>
                            <p className='text-text-lg font-semibold text-gray-700'>
                                Birthday
                            </p>
                            <p className='tex-text-md text-gray-600 font-normal'>{player?.birthday}</p>
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <p className='text-text-lg font-semibold text-gray-700'>
                                Place of Birth
                            </p>
                            <p className='tex-text-md text-gray-600 font-normal'>{player?.place_of_birth}</p>
                        </div>
                        {
                            player?.deathday && (
                        <div className='flex flex-col gap-0.5'>
                            <p className='text-text-lg font-semibold text-gray-700'>
                                Death Day
                            </p>
                            <p className='tex-text-md text-gray-600 font-normal'>{player?.deathday}</p>
                        </div>)
                        }
                    </div>
                </div>
            </div>
            {/*CAST AND OTHER INFOS*/}
            <div className='flex flex-col'>
                {/*CAST SWIPER*/}

                {/*SIMILAR SWIPER*/}
                <div className='mt-6  flex flex-col h-[50vh] min-h-[450px] max-h-[600px]'>
                    <p className='text-display-md font-semibold text-gray-700'>Movies acted in</p>
                    <PerView isReload={true} slidesPerView={'auto'} spaceBetween={12} arrows={true}
                             items={playerMovies?.cast}/>
                </div>
                {/*COMMENT SECTION*/}

            </div>

        </div>


    );
}




export const getServerSideProps = async (context) => {
    const id = context.params.id
    const player = await getPersonDetails(id)
    const playerMovies = await getPersonMovies(id)
    playerMovies.cast.sort((a, b) => b.popularity - a.popularity)


    return {
        props: {
            player, playerMovies
            
        }
    }


}

export default CastDetail;