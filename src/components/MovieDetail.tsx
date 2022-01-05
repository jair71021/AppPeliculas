import React from 'react'
import { FlatList, Text, View } from 'react-native'
import currencyFormatter from 'currency-formatter'
import { Cast } from '../interfaces/creditsInterface'
import { MovieFull } from '../interfaces/movieInterfece'
import  Icon from'react-native-vector-icons/Ionicons'
import { CastItem } from './CastItem'


interface Props{
    movieFull: MovieFull;
    cast:Cast[];
}

export const MovieDetail = ({movieFull, cast} :Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={{marginHorizontal:20, }}>
                <View style={{flexDirection:'row',marginTop:15}}>
                    {/* Icono */}
                    <Icon 
                    
                    name='star-outline'
                    color="grey"
                    size={18}

                    />
                    {/* calificaion de pelicula */}
                    <Text style={{fontSize:16,marginLeft:8}}>{movieFull.vote_average}</Text>
                    {/* Tipo de pelicula */}
                    <Text style={{marginLeft:8, fontSize:16 }}> 
                        / {movieFull.genres.map(g=>g.name).join(',')}
                    </Text>
                </View>

                {/* Historia */}
                <Text style={{fontSize:23 , marginTop:10,fontWeight:'bold'}}>
                    Historia
                </Text>
                <Text style={{fontSize:18,marginTop:12}}>
                    {movieFull.overview}
                </Text>
                 {/* Prosupueso */}
                <Text style={{fontSize:23 , marginTop:12,fontWeight:'bold'}}>
                    Presupuesto
                </Text>
                <Text style={{fontSize:19,marginTop:8}}>
                    {currencyFormatter.format( movieFull.budget,{code: 'USD'})}
                </Text>
                
            </View>
            {/* Casting*/ }
            <View style={{marginTop:10,marginBottom: 25}} >
                
                <Text style={{fontSize:23 , marginTop:10,fontWeight:'bold',marginHorizontal:20}}>
                    Actores
                </Text>

                    <FlatList
                    
                        data={cast}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item})=><CastItem actor={item}/>}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 10,height:65}}
                    />
                    {/*  */}

            </View>
        
        </>
    )
}
