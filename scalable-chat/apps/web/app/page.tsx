"use client";

import { useState } from "react";
import { useSocket } from "./context/SocketProvider";

const LayoutPage = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useSocket();

  const handleMessageSend = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setMessage(data["message:input"] as string);
    sendMessage(data["message:input"] as string);
  };
  return (
    <div>
      <h1>Home page</h1>

      <div>
        <form onSubmit={handleMessageSend}>
          <input
            type="text"
            name="message:input"
            id="message"
            placeholder="send your message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default LayoutPage;
