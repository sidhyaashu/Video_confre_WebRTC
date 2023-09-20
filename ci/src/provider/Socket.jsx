import React,{ useMemo } from "react"
import { io } from "socket.io-client";


const SoketContext = React.createContext(null)


export const useSoket = ()=> React.useContext(SoketContext)



export const SoketProvider = (props)=>{
    const soket = useMemo(()=>io("http://localhost:5500"),[])

    return(
        <SoketContext.Provider value={{soket}}>
            {props.children}
        </SoketContext.Provider>
    )
}

