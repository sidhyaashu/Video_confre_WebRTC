import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { SoketProvider } from "./provider/Socket";
import Room from "./pages/Room";
import { PeerProvider } from "./provider/Peer";

const App = () => {
  return (
    <div className="app">
      <SoketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </PeerProvider>
      </SoketProvider>
    </div>
  );
};

export default App;
