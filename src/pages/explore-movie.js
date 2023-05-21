import React from 'react'
import {getDiscoverMovies} from "../utils/MovieDb.js";

import MovieCard from "../components/MovieCard";

export default function ExploreMovie() {
  const [year, setYear] = React.useState();
  const [point, setPoint] = React.useState('default');
  const [movies, setMovies] = React.useState([]);
  const pointHandler = (e) => {
      console.log(e.target.value)
      setPoint(e.target.value);

  }
  const yearHandler = (e) => {
      setYear(e.target.value);
  }
  const sendHandler = async () => {
      const data = await fetch(`/api/getDiscoverMovies?year=${year}&vote=${point}&page=1`);
      const response = await data.json();
      setMovies(response.results);      
      
  }
  return (
      <>
          <div className='container'>
              {/*    input areas*/}
              <div className='flex flex-col gap-6 md:flex-row justify-between  items-center justify-center'>
                  <div className='w-full md:w-auto'>
                  <input  type="number" name="" id="" className='input-text mb-3' value={year} onChange={yearHandler} placeholder='Please enter the year'/>
                  <select title={'select'} placeholder={'test'} className='select-input' value={point} onChange={pointHandler}>
                      <option disabled  value="default">Please select point</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>


                  </select>
                  </div>
                  <button className={'btn-primary w-full md:w-auto'} onClick={sendHandler}>Send</button>
              </div>
              <p className='mx-auto text-display-md  font-semibold text-gray-900 mb-3 mt-6'>Customized Film Recommendations</p>
              <MovieCard movies={movies}/>

          </div>



      </>
  );
}
