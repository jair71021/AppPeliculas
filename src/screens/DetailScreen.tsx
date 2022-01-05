import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
//import { Movie } from '../interfaces/movieInterfece';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { useMoviesDetails } from '../hooks/useMoviesDetails';
import { MovieDetail } from '../components/MovieDetail';


const screenHeight=Dimensions.get('screen').height
interface Props extends StackScreenProps<RootStackParams , 'DetailScreen'>{};
export const DetailScreen = ({ route ,navigation}: Props)  => {
    const movie=route.params;
    //console.log(movie);
    
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path}`;
    const {isLoading,movieFull,cast} =useMoviesDetails(movie.id)
    
    
    
    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image
                        source={{uri}}
                        style={styles.posterImage}
                        
                    
                    />
                </View>
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
            </View>
            
                {
                    isLoading
                    ? <ActivityIndicator size={55} color="blue" style={{marginTop:20}}/>
                    :<MovieDetail movieFull={movieFull!} cast={cast} />
                }
                {/* Boton para cerrar */}
            <TouchableOpacity  style={styles.backButton}
            
                onPress={()=> navigation.pop()}
            >
                <Icon 
                    name='arrow-undo-circle-outline'
                    color='white'
                    size={50}
                
                />
            </TouchableOpacity>
        </ScrollView>
    )
}
const styles =StyleSheet.create({
    imageContainer:{
        // backgroundColor:'red',
        // overflow:'hidden',
        width:'100%',
        height:screenHeight *0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 10,
        
    },
    
    imageBorder:{
        flex:1,
        overflow:'hidden',
        borderBottomEndRadius:25,
        borderBottomStartRadius:25,
        
    },
    posterImage:{
        flex:1,
        
    },
    marginContainer:{
        marginHorizontal:20,
        marginTop:20

    },
    subTitle:{
    fontSize:20
    },
    title:{
        fontSize:24,
        fontWeight:'bold'
    },
    backButton:{
        position:'absolute',
        zIndex: 98,
        elevation:20,
        top:10,
        left:8
    }
})

