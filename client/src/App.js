import {useEffect, useState, useRef} from 'react'
import './App.css';
import { io } from "socket.io-client";
function App() {
  const [messages, setMessages] = useState([])
  const [content,setContent] = useState("")
  const socket = useRef(null);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      console.log("Getting messages: " + msg)
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
    socket.current = io("http://localhost:3500");

    socket.current.on("message", handleNewMessage)

  }, [])

  const handleClick = () => {
    socket.current.emit("message", content)
    setContent("");
  }

  return (
    <div className="App">
    <input value={content} onChange={(e) => setContent(e.target.value)}/>
    <button onClick={() => handleClick()}>Send</button>
      {messages.length > 0 &&
          messages.map((message, index) => (
            <p key={index}>
              {JSON.stringify(message)}
            </p>
          ))}
    </div>
  );
}

export default App;
