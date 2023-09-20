import { useEffect,useCallback, useState } from "react"
import { useSoket } from "../provider/Socket"
import { usePeer } from "../provider/Peer"
import ReactPlayer from "react-player"

const Room = () => {
    const { soket } = useSoket()
    const {createOffer,createAnsware,setRemoteAns ,sendStream,remotStream} = usePeer()
    const [myStream, setMyStream] = useState(null);

    const handleNewUserJoined=useCallback(async(data)=>{
        const { email} = data
        console.log("New user joined",email)
        const offer = await createOffer()
        soket.emit("call-user",{email,offer})
    },[createOffer,soket])

    const handleIncomingCall=useCallback(async(data)=>{
      const { from,offer } = data
      const ans = await createAnsware(offer)
      console.log("Incoming Call",data)
      soket.emit("call-accepted",{email:from,ans})
    },[createAnsware,soket])

    const handleCallAccepted=useCallback(async(data)=>{
      const { ans } = data
      console.log("Call got accepted",ans)
      await setRemoteAns(ans)
    },[setRemoteAns])

    const getUserMediaStream=useCallback(async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      })
      setMyStream(stream)
    },[])


    useEffect(()=>{
        soket.on("user-joined",handleNewUserJoined)
        soket.on("incoming-call",handleIncomingCall)
        soket.on("call-accepted",handleCallAccepted)

      return ()=>{
        soket.off("user-joined",handleNewUserJoined)
        soket.off("incoming-call",handleIncomingCall)
        soket.off("call-accepted",handleCallAccepted)
      }
    },[soket,handleNewUserJoined,handleIncomingCall,handleCallAccepted])

    useEffect(()=>{
      getUserMediaStream()
    },[getUserMediaStream])
  return (
    <div className="room-page">
      <h1>Room Page</h1>
      <button onClick={()=>sendStream(myStream)} >Send my video</button>
        <ReactPlayer url={myStream} playing muted />
        <ReactPlayer url={remotStream} playing muted />
    </div>
  )
}

export default Room
