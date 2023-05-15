import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { getMovieDetail, getSimilarMovies } from "../../utils/MovieDb.js";


import PerViewGlass from "../../components/PerViewGlass.js";

import PerView from "../../components/PerView.js";


import { addNewBookmark } from "../../firebase/index.js";

const Id = ({movieDetail,similarMovies}) => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState(null);


  const director = movieDetail?.crew
    .filter((crew) => crew.job === "Director")
    .map((crew) => crew.name)
    .join(", ");

  const story = movieDetail?.crew
    .filter((crew) => crew.job === "Screenplay")
    .map((crew) => crew.name)
    .join(", ");


  const bookmarkHandler = async () => {
    await addNewBookmark({
      title: "sevdigim_Filmler",
      id: movie.id,
      image: movie.poster_path,
    });
  };

  return (
    <div className="container flex flex-col">
        {/*IMAGE AND INFO*/}
      <div className="flex flex-col md:flex-row">
        {/*IMAGE AREA*/}
        <div className="flex flex-col md:w-1/3 md:h-full">


          <img
            className="w-full"
            src={`https://image.tmdb.org/t/p/original/${movieDetail?.poster_path}`}
            alt=""
          />

          {/*IMAGE TEXT*/}
          <div className="flex justify-between mt-2 ">
            <p className="text-text-sm font-semibold text-gray-700">
              {movieDetail?.release_date.toString().slice(0, 4)}
            </p>
            <div className="flex">
              <div className="flex items-center justify-center px-2 py-0.5  rounded-full bg-primary-300 text-white text-text-xs font-medium">
                User Rating: {movieDetail?.vote_average.toString().slice(0, 3)}
              </div>
            </div>
          </div>
        </div>
        {/*IMAGE RIGHT INFO*/}
        <div className="md:ml-4 flex flex-col md:w-2/3">
          {/*TITLE AREA*/}
          <div className="mt-3">
            <p className="text-display-sm font-semibold text-gray-700">
              {movieDetail?.title}
            </p>
          </div>
          {/*OVERVIEW AREA*/}
          <div className="mt-4">
            <p className="text-text-lg font-normal text-gray-600">
              {movieDetail?.overview}
            </p>
          </div>
          {/*INTERRACTION AREA*/}
          <div className="flex justify-center gap-6 md:justify-start mt-6">
            <button className="border-2  border-gray-300 hover:bg-gray-50  rounded-lg text-gray-700 hover:text-gray-800 text-[20px] p-2">
              {/* <MdFavoriteBorder /> */}
            </button>
            <button className="border-2  border-gray-300 hover:bg-gray-50  rounded-lg text-gray-700 hover:text-gray-800 text-[20px] p-2">
              {/* <TbPlayerPlay /> */}
            </button>
            <button
              className="border-2  border-gray-300 hover:bg-gray-50  rounded-lg text-gray-700 hover:text-gray-800 text-[20px] p-2"
              onClick={bookmarkHandler}
            >
              {/* <MdBookmarkBorder /> */}
            </button>
            <button className="border-2  border-gray-300 hover:bg-gray-50  rounded-lg text-gray-700 hover:text-gray-800 text-[20px] p-2">
              {/* <MdStarOutline /> */}
            </button>
          </div>
          {/*SHORT INFO*/}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-0.5 ">
              <p className="text-text-lg font-semibold text-gray-700">
                Director
              </p>
              <p className="tex-text-md text-gray-600 font-normal">
                {director}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-text-lg font-semibold text-gray-700">Story</p>
              <p className="tex-text-md text-gray-600 font-normal">{story}</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-text-lg font-semibold text-gray-700">Budget</p>
              <p className="tex-text-md text-gray-600 font-normal">
                ${movieDetail?.budget.toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-text-lg font-semibold text-gray-700">
                Revenue
              </p>
              <p className="tex-text-md text-gray-600 font-normal">
                ${movieDetail?.revenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*CAST AND OTHER INFOS*/}
      <div className="flex flex-col">
        {/*CAST SWIPER*/}
        <div className="flex flex-col mt-6 h-[50vh] min-h-[450px] max-h-[600px]">
          <p className="text-display-md font-semibold text-gray-700">Cast</p>
          <PerViewGlass
            slidesPerView={"auto"}
            spaceBetween={12}
            arrows={true}
            items={movieDetail}
          />
        </div>
        {/*SIMILAR SWIPER*/}
        <div className="mt-6  flex flex-col h-[50vh] min-h-[450px] max-h-[600px]">
          <p className="text-display-md font-semibold text-gray-700">Similar</p>
          <PerView
            isReload={true}
            slidesPerView={"auto"}
            spaceBetween={12}
            arrows={true}
            items={similarMovies}
          />
        </div>
        {/*COMMENT SECTION*/}
        <div className="mt-6">
          <p className="text-display-md font-semibold text-gray-700">
            Comments
          </p>

          {/* <CommentList /> */}
        </div>
      </div>


    </div>
    
  );
};

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const movieDetail = await getMovieDetail(id);
  const similarMovies = await getSimilarMovies(id);

  return {
    props: {
        movieDetail,similarMovies
    },
  };
};

export default Id;
