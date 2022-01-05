import React, { useContext, useEffect } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GradientContext } from '../context/GradientContext'
import { useFade } from '../hooks/useFade'

interface Props{
    children: JSX.Element | JSX.Element[]
}

export const GradientBackground = ({children}:Props) => {

    const { colors,preColors,setMainPrevColors } = useContext(GradientContext);

    const { opacity,fadeIn,fadeOut } = useFade()

    useEffect(() => {
        fadeIn(  ( )=>{
            setMainPrevColors(colors)
            fadeOut(0)
        })
    }, [colors])

    return (
        <View style={{flex:1}}>
            <LinearGradient 
                // colors={['#084f64','white','#fcd37c','#75cedb']}
                colors={[preColors.primary,preColors.secondary,'white','#fcd37c','#75cedb']}
                style={{...StyleSheet.absoluteFillObject}}
                />
            
            <Animated.View 
                style={{...StyleSheet.absoluteFillObject,
                        opacity
                }}
            >
                <LinearGradient 
                    // colors={['#084f64','white','#fcd37c','#75cedb']}
                    colors={[colors.primary,colors.secondary,'white','#fcd37c','#75cedb']}
                    style={{...StyleSheet.absoluteFillObject}}
                />
            </Animated.View>

            {children}
        </View>
    )
}
