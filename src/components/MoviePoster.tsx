import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterfece'

interface Props {
    movie:Movie;
    height?: number;
    width?:number;
}

export const MoviePoster = ({movie, height= 420, width=300}: Props) => {
    
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path}`;

    const navigation =useNavigation();
    
    return (
        <TouchableOpacity
            onPress={ () => navigation.navigate('DetailScreen', movie)}
            activeOpacity={0.8}
            style={{
                width,
                height,
                marginHorizontal: 3,
                paddingBottom:1,
                paddingHorizontal:10 
            }}
        >
            <View style={styles.imageCointainer}> 
                <Image 
                source={{ uri }}
                style={styles.image}
                />
            </View>           
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    image:{
        flex: 1,
        borderRadius: 18
    },
    imageCointainer:{
        flex:1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,

        elevation: 10,

    }
});