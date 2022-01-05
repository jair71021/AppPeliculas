import React, { useContext, useEffect } from 'react'
import {  ActivityIndicator, Dimensions, View ,ScrollView} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors'
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSilder } from '../components/HorizontalSilder';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies'
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const {width: windowWidth} = Dimensions.get('window');
export const HomeScreen = () => {

    // const {peliculasEnCine,peliculasPopulares,peliculasMejorCalificadas,peliculasPoximamenteEnCine,isLoading} = useMovies();
    const {nowPlaying,popular,topRated,upcoming,isLoading} = useMovies();

    const {top}= useSafeAreaInsets();

    const {setMainColors} = useContext(GradientContext)

    const getPOsterColors = async( index: number)=>{
        const movie=nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path}`;
        const [ primary='green',secondary='orange' ] = await getImageColors( uri);
        setMainColors({primary: primary, secondary: secondary})
        
    }
    useEffect(() => {

    if (nowPlaying.length > 0) {
        getPOsterColors(0)
    }
    
    }, [nowPlaying])

        if(isLoading){
            return(
                <View style={{ flex:1,justifyContent:'center',alignContent:'center'}}>
                    <ActivityIndicator  color="red" size={200}/>
                </View>
            )
        }
    

    return (

        // corrusel
        <GradientBackground>
            <ScrollView>
                <View style={{marginTop: top + 30}}> 
                    {/* <MoviePoster  movie={peliculasEnCine[1] }/> */}
                    <View style={{height:450}}>
                        <Carousel 
                            data={nowPlaying}
                            renderItem={({ item }: any) =><MoviePoster  movie={item }/>}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={index => getPOsterColors(index)}

                        />
                    </View>
                        {/* Peliculas populares */}
                        {/* <HorizontalSilder title='En cine' movies={ peliculasEnCine} />   */}
                        <HorizontalSilder title='Populares' movies={popular} />  
                        <HorizontalSilder title='Pelicula Mejor Calificada' movies={ topRated} />  
                        <HorizontalSilder title='En Cine' movies={ upcoming} />  
                </View>
            </ScrollView>
        </GradientBackground>
    )
}
