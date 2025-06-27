"use client";

import { useState } from "react";
import { useSocket } from "./context/SocketProvider";

const LayoutPage = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, messages: msges } = useSocket();

  const handleMessageSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      "message:input": {
        value: string;
      };
    };
    setMessage(target["message:input"].value);
    sendMessage(target["message:input"].value);
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

      <div>
        <ul>
          {msges.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LayoutPage;
