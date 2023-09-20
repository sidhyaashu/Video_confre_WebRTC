import React,{useMemo} from "react"


const PeerContex = React.createContext(null)

export const usePeer = () => React.useContext(PeerContex)

export const PeerProvider=(props)=>{
    const peer = useMemo(()=>new RTCPeerConnection({
        iceServers:[
            {
                urls:[
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478"
                ]
            }
        ]
    }),[])

    const createOffer = async()=>{
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }
    return (
        <PeerContex.Provider value={{peer,createOffer}} >
            {props.children}
        </PeerContex.Provider>
    )
}