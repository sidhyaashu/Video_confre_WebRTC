import "./Home.css";
import { useSoket } from "../provider/Socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { soket } = useSoket();
  const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();


  const handleRoomJoined=({roomId})=>{
    navigate(`/room/${roomId}`)
  }
  useEffect(()=>{
    soket.on("joined-room",handleRoomJoined)
  },[soket])

  const handleJoin = (e) => {
    e.preventDefault();
    soket.emit("join-room",{email,roomId})
  };
  return (
    <div className="homepage-container">
      <div className="homepage-form">
        <h3>Sidhya Room</h3>
        <input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
        <input type="text" value={roomId} onChange={(e)=>setRoomId(e.target.value)} placeholder="Enter your room id" />
        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
};

export default Home;
