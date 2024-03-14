import { useEffect, useState } from "react";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  function sendMessage() {
    socket.emit("send_message", { message });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="your message"
      />
      <button onClick={sendMessage}>send message</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}

export default App;
