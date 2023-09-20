import './Home.css'


const Home = () => {


    const handleJoin=(e)=>{
        e.preventDefault()
    }
  return (
    <div className="homepage-container">
        <div className="homepage-form">
            <h3>Sidhya Room</h3>
            <input type="email" name='email' placeholder="Enter your email" />
            <input type="text" name='roomId' placeholder="Enter your room id" />
            <button onClick={handleJoin} >Join</button>
        </div>
    </div>
  )
}

export default Home
