import React,{useMemo,useEffect,useState, useCallback} from "react"


const PeerContex = React.createContext(null)

export const usePeer = () => React.useContext(PeerContex)

export const PeerProvider=(props)=>{
    const [remotStream,setRemotStream] = useState(null)
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

    const createAnsware = async(offer)=>{
        await peer.setRemoteDescription(offer)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer
    }

    const setRemoteAns =async(ans)=>{
        await peer.setRemoteDescription(ans)
    }

    const sendStream =async(stream)=>{
        const tracks = stream.getTracks()
        for(const track of tracks){
            peer.addTrack(track,stream)
        }
    }

    const handleTrackEvent = useCallback(e=>{
            const streams = e.streams
            setRemotStream(streams[0])
    },[])

    useEffect(()=>{
        peer.addEventListener('track',handleTrackEvent)
        return ()=>{
            peer.removeEventListener('track',handleTrackEvent)
        }
    },[peer,handleTrackEvent])

    return (
        <PeerContex.Provider value={{peer,createOffer,createAnsware,setRemoteAns,sendStream,remotStream}} >
            {props.children}
        </PeerContex.Provider>
    )
}