const getPopularMovies = async () => {
    const url = `${process.env.MOVIEDB_LINK}/movie/popular?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    return await response.json();
}
const getMovie = async (id) => {
    const url = `${process.env.MOVIEDB_LINK}/movie/${id}?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    return await response.json();
}
const getMovieCredits = async (id) => {
    const url = `${process.env.MOVIEDB_LINK}/movie/${id}/credits?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    return await response.json();
}
//combine detail and credits
const getMovieDetail = async (id) => {
    const movie = await getMovie(id);
    const credits = await getMovieCredits(id);
    credits.cast.sort((a, b) => b.popularity - a.popularity)
    credits.cast = credits.cast.slice(0, 20)
    return {
        ...movie,
        ...credits
    }
}
const getSimilarMovies = async (id) => {
    const url = `${process.env.MOVIEDB_LINK}/movie/${id}/similar?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const data =  await response.json();
    return data.results
}

const getPersonMovies = async (id) => {
    const url = `${process.env.MOVIEDB_LINK}/person/${id}/movie_credits?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    return await response.json();
}
const getPersonDetails = async (id) => {
    const url = `${process.env.MOVIEDB_LINK}/person/${id}?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    return await response.json();
}
const getTopRatedMovies = async () => {
    const url = `${process.env.MOVIEDB_LINK}/movie/top_rated?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    return await response.json();
}
const getUpcomingMovies = async () => {
    const url = `${process.env.MOVIEDB_LINK}/movie/upcoming?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US`;
    const response = await fetch(url);
    return await response.json();
}
const getDiscoverMovies = async (page,vote,year) => {
    const url = `${process.env.MOVIEDB_LINK}/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.gte=${vote}&primary_release_year=${year}&page=${page} `;
    const response = await fetch(url);
    return await response.json();

}
const getSearchMovies = async (query) => {
    const url = `${process.env.MOVIEDB_LINK}/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${query}`;
    const response = await fetch(url);
    return await response.json();
}


export { getPopularMovies,getMovie,getMovieDetail,getSimilarMovies,getPersonMovies,getPersonDetails,getTopRatedMovies,getUpcomingMovies,getDiscoverMovies, getSearchMovies }