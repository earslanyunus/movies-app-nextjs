import PerView from "@/components/PerView";
import { getLikedMovies } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user)
  const [likedMovies, setLikedMovies] = useState(null);


  useEffect(() => {
    if(user){
      getLikedMovies().then((res) => {
        res.map((movie) => {
          //change key name
          movie.poster_path = movie.image;
        });


        setLikedMovies(res);
        
      });
    }
  }, [user]);


  return (
    <>
      <div className="h-[40vh] flex flex-col min-h-[25rem]">
        <p className="container mx-auto text-display-md  font-semibold text-gray-900 mb-3">
          Liked Movies
        </p>
        <PerView slidesPerView={"auto"} spaceBetween={12} items={likedMovies} arrows={true}/>
      </div>
    </>
  );
}
