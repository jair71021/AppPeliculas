import React,{ createContext, useState } from "react";

interface ImageColors{
    primary:string,
    secondary:string
}
interface ContextProps{
    colors:ImageColors;
    preColors:ImageColors;
    setMainColors: (colors: ImageColors) => void
    setMainPrevColors: (colors: ImageColors) => void
}

export const GradientContext = createContext({} as ContextProps) //Todo: definir tipo

export const GradientProvider =({children }: any ) =>{
    const [colors, setColors] = useState<ImageColors>({
    primary:'transparent',
    secondary:'transparent'

    })
    const [preColors,setPreColors] = useState<ImageColors>({
        primary:'transparent',
        secondary:'transparent'
    
    })
    const setMainColors =(colors: ImageColors) =>{
        setColors(colors)
    }
    
    const setMainPrevColors=(colors: ImageColors) =>{
        setPreColors(colors)
    }
        return(
            <GradientContext.Provider value={{colors ,preColors,setMainColors
                ,setMainPrevColors}}>
                {children}
            </GradientContext.Provider>
        )
}


