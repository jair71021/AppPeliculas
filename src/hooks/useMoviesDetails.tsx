import { useEffect, useState } from "react"
import movie from "../api/movieDB";
import { Cast, CreditsRespose } from "../interfaces/creditsInterface";
import { MovieFull } from "../interfaces/movieInterfece";

interface MoviesDetails{
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
    
}

export const useMoviesDetails = (movieId:number) => {
    const [state, setState] = useState<MoviesDetails>({
        isLoading: true,
        movieFull:undefined,
        cast:[]
    });
    
    
    const getMoviesDetails = async () =>{
        const moviesDetailsPromise = await movie.get<MovieFull>(`/${movieId}`);
        const castPromise = await movie.get<CreditsRespose>(`/${movieId}/credits`);
        
        const[ movieDetailsResp, castPromiseResp]= await Promise.all([moviesDetailsPromise, castPromise])
        setState({
            isLoading: false,
            movieFull:movieDetailsResp.data,
            cast:castPromiseResp.data.cast
        })
    }
    
    useEffect(() => {
        getMoviesDetails()
    }, [])


    return{
        ...state
    }
}
