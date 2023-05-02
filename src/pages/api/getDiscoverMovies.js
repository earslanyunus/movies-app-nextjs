//create api

// const getDiscoverMovies = async (page,vote,year) => {
//     const url = `${process.env.MOVIEDB_LINK}/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.gte=${vote}&primary_release_year=${year}&page=${page} `;
//     const response = await fetch(url);
//     return await response.json();

// }
export default async function handler(req, res) {
    console.log('req.query', req.query);
    const { page, vote, year } = req.query
    const url = `${process.env.MOVIEDB_LINK}/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.gte=${vote}&primary_release_year=${year}&page=${page} `;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data)
    console.log('data', data);
    
}