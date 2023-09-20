import { useEffect,useCallback } from "react"
import { useSoket } from "../provider/Socket"
import { usePeer } from "../provider/Peer"

const Room = () => {
    const { soket } = useSoket()
    const { peer,createOffer } = usePeer()

    const handleNewUserJoined=useCallback(async(data)=>{
        const { email} = data
        console.log("New user joined",email)
        const offer = await createOffer()
        soket.emit("call-user",{email,offer})
    },[createOffer,soket])

    

    const handleIncomingCall=useCallback((data)=>{
      const { from,offer } = data
      console.log(`Incoming call from :`,{from,offer})
    },[])



    useEffect(()=>{
        soket.on("user-joined",handleNewUserJoined)
        soket.on("incoming-call",handleIncomingCall)
    },[soket,handleNewUserJoined,handleIncomingCall])
  return (
    <div className="room-page">
        <p>Sidhya</p>
    </div>
  )
}

export default Room
