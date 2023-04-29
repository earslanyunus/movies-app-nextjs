import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";

import Link from 'next/link'
import Image from 'next/image'



function PerView({items,spaceBetween,slidesPerView,extraClass='',arrows=false,isReload=false}) {
    const leftArrow = useRef()
    const rightArrow = useRef()
    return (
        <>
        <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        className={`mySwiper h-full ${extraClass}`}
        loading='lazy'
        onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = leftArrow.current;
            swiper.params.navigation.nextEl = rightArrow.current;}
        }

        navigation={{

            nextEl: rightArrow.current,
            prevEl: leftArrow.current,
        }}
        modules={[Navigation]}

        >
            {items?.map((item) => (
                
                <SwiperSlide key={item.id} className='h-full'>
                    <Link href={`/movie/${item.id}`}><img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} className='h-full w-auto object-cover' /></Link>
                </SwiperSlide>
            ))}


        </Swiper>
            {arrows && (
                <div className='flex gap-6 container mx-auto mt-3'>

                <button ref={leftArrow}><Image  src="/carouse_left_arrow.svg" alt={'left arrow'} width={50} height={50}/></button>
                <button ref={rightArrow}><Image src="/carouse_right_arrow.svg" alt={'right arrow'} width={50} height={50}/></button>
                </div>
            )}
        </>


    );
}

export default PerView;