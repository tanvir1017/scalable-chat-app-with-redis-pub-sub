"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);

  if (!state) throw new Error("No state undefined!");
  return state;
};

const SocketProvider: React.FC<ISocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("send message", msg);

      if (socket && msg.length) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );

  useEffect(() => {
    const _socket = io("http://localhost:7549");
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
