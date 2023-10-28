import { useState, useEffect } from 'react'
import io from "socket.io-client"

const socket = io("http://localhost:4000");

function App() {

  const [message, setMessage] = useState("");

  const handleSubmit = function(e){
    e.preventDefault();
    setMessage("");
    socket.emit("message", message)
  }

  const handleHit = function(){
    socket.emit("hit");
  }

  useEffect(()=>{

    const receiveMessage = (data)=>{
      console.log(data);
    }

    const receiveHit = ()=>{
      console.log("receive a hit");
    }

    socket.on("message", receiveMessage)

    socket.on("hit", receiveHit);

    return ()=>{
      socket.off("message", receiveMessage);
      socket.off("hit", receiveHit);
    }

  }, [])

  return (
    <>
      <h1>Welcome</h1>

      <form style={{"marginLeft": "20px"}} onSubmit={handleSubmit}>
        <input type="text" onChange={e => setMessage(e.target.value)} value={message} />
        <button>Send</button>
      </form>

      <button onClick={handleHit}>Dar un hit</button>
    </>
  )
}

export default App
