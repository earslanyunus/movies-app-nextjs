import { useRouter } from "next/router";
import { getSearchMovies } from "../../utils/MovieDb";
import MovieCard from "../../components/MovieCard";

const Search = ({ movie }) => {
  console.log(movie);
  
  const router = useRouter();
  const { search } = router.query;

  return (
    <>
      <div className="container mx-auto">
        <MovieCard movies={movie.results} />
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const search = context.query.search;
  const movie = await getSearchMovies(search);

  return {
    props: { movie },
  };
}

export default Search;
