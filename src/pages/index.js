import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/utils/MovieDb";
import PerView from "@/components/PerView.js";
import Navbar from "@/components/Navbar";

function index({popularMovies,topRatedMovies,upcomingMovies}) {
  return (
    <div>
        <Navbar/>

    <div className='h-[40vh] flex flex-col min-h-[25rem]'>
        <p className='container mx-auto text-display-md  font-semibold text-gray-900 mb-3'>Popular Movies</p>
        <PerView slidesPerView={"auto"} spaceBetween={12} items={popularMovies?.results} arrows={true}/>
    </div>
    <div className='h-[40vh] mt-6 flex flex-col min-h-[25rem]'>
        <p className='container mx-auto text-display-md  font-semibold text-gray-900 mb-3'>Top Rated Movies</p>
        <PerView slidesPerView={'auto'} spaceBetween={12} items={topRatedMovies?.results} arrows={true}/>

    </div>
    <div className='h-[40vh] mt-6 flex flex-col min-h-[25rem]'>
        <p className='container mx-auto text-display-md  font-semibold text-gray-900 mb-3'>Upcoming Movies</p>
        <PerView slidesPerView={'auto'} spaceBetween={12} items={upcomingMovies?.results} arrows={true}/>

    </div>

</div>
  )
}
export async function getServerSideProps(){
    const popularMovies = await getPopularMovies();
    const topRatedMovies = await getTopRatedMovies();
    const upcomingMovies = await getUpcomingMovies();


    return{
        props:{popularMovies,topRatedMovies,upcomingMovies}
    }

}
export default index