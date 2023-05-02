import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import Link from "next/link";

function PerViewGlass({
  items,
  spaceBetween,
  slidesPerView,
  extraClass = "",
  arrows = false,
}) {
  const leftArrow = useRef();
  const rightArrow = useRef();
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        className={`mySwiper h-full ${extraClass}`}
        loading="lazy"
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = leftArrow.current;
          swiper.params.navigation.nextEl = rightArrow.current;
        }}
        navigation={{
          nextEl: rightArrow.current,
          prevEl: leftArrow.current,
        }}
        modules={[Navigation]}
      >
        {items?.cast.map((item) => (
          <SwiperSlide key={item.id} className="  h-full w-auto relative">
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt={item.title}
              className="h-full"
            />
            <Link
              href={`/cast/${item.id}`}
              className="absolute bottom-0 w-full  bg-white bg-opacity-30 backdrop-blur-md border-t px-5 pt-6 pb-8"
            >
              <div className="flex justify-between items-center">
                <p className="text-display-xs font-semibold text-white">
                  {item?.name}
                </p>
                <button type={"button"} className="text-[1.5rem] text-white">
                  {/* <MdArrowOutward /> */}
                </button>
              </div>
              <p className="text-text-md font-semibold text-white">
                {item?.character}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {arrows && (
        <div className="flex gap-6 container mx-auto mt-3">
          <button ref={leftArrow}>
            {/* <img src={swiperLeftArrow} alt={"left arrow"} /> */}
          </button>
          <button ref={rightArrow}>
            {/* <img src={swiperRightArrow} alt={"right arrow"} /> */}
          </button>
        </div>
      )}
    </>
  );
}

export default PerViewGlass;
