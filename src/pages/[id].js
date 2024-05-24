import Login from '@/components/Login'
import MovieDetails from '@/components/MovieDetails'
import { getSession, useSession } from 'next-auth/react'
import React, { useState } from 'react'

const MovieDetailPage = ({movie}) => {
    //console.log(movie);
    const {data: session}= useSession();
    const [showPlayer, setShowPlayer] = useState(false)

    //if (!session) return <Login />
    
    const trailerIndex = movie.videos.results.findIndex(
        
        (element) => element.type === "Trailer"
        );
        console.log(trailerIndex);
    const trailerURL = `https://www.youtube.com/watch?v=${movie.videos?.results
    [trailerIndex]?.key}`;
  
    return (
    <div>
    <MovieDetails movie={movie} 
                  showPlayer={showPlayer}
                  setShowPlayer={setShowPlayer}
                  trailerURL={trailerURL}
                  />
    </div>              
  )
  
}

export async function getServerSideProps(info){
    
    const session = await getSession(info)
    const {id} = info.query;
    
    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    ).then((response)=> response.json());
    //console.log(request.videos.results);
    return {
        props:{
            
            session,
            movie: request

        },
    };

}


export default MovieDetailPage