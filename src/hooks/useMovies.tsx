import  { useEffect, useState } from 'react'
import movie from '../api/movieDB';
import { Movie, MovieDBMoviesResponse} from '../interfaces/movieInterfece';


interface MoviesState{
    nowPlaying:Movie[];
    popular:Movie[];
    topRated:Movie[];
    upcoming:Movie[];

}
export const useMovies = () => {
    const [isLoading, setIsLoading] = useState(true) 
    const [moviesState, setMoviesState]=useState<MoviesState>({
        nowPlaying:[],
        popular:[],
        topRated:[],
        upcoming:[]
    
    }) 
    // const [peliculasEnCine, setPeliculasEnCine] = useState<Movie[]>([])
    // const [peliculasPopulares, setPeliculasPopulares] = useState<Movie[]>([])
    // const [peliculasMejorCalificadas, setPeliculasMejorCalificadas] = useState<Movie[]>([])
    // const [peliculasPoximamenteEnCine, setPeliculasPoximamenteEnCine] = useState<Movie[]>([])

    const getMovies = async () =>{
        // const respNowPlaying = await movie.get<MovieDBMoviesResponse>('/now_playing');
        // const respPopular = await movie.get<MovieDBMoviesResponse>('/popular');
        // const respTopRated = await movie.get<MovieDBMoviesResponse>('/top_rated');
        // const respUpcoming = await movie.get<MovieDBMoviesResponse>('/upcoming');
        
        const nowPlayingPromise=movie.get<MovieDBMoviesResponse>('/now_playing');
        const popularPromise   =movie.get<MovieDBMoviesResponse>('/popular');
        const topRatedPromise  =movie.get<MovieDBMoviesResponse>('/top_rated');
        const upcomingPromise  =movie.get<MovieDBMoviesResponse>('/upcoming');
        
        const resp=await Promise.all([
            nowPlayingPromise,
            popularPromise  ,
            topRatedPromise  ,
            upcomingPromise  
        ])        
        // setPeliculasEnCine (respNowPlaying.data.results);
        // setPeliculasPopulares (respPopular.data.results);
        
        // setPeliculasMejorCalificadas(respTopRated.data.results);
        // setPeliculasPoximamenteEnCine(respUpcoming.data.results);
        setMoviesState({
            nowPlaying:resp[0].data.results,
            popular:resp[1].data.results,
            topRated:resp[2].data.results,
            upcoming:resp[3].data.results
        })
    
        setIsLoading(false);
    }
    useEffect(() => {
        getMovies()
    }, [])


    return{
        ...moviesState,
        isLoading
    }
}
