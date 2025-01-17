import { socket } from "@/lib/socket";
import { useCallback, useEffect, useState } from "react";

const PingPong: React.FC = () => {
  const [pongAmount, setPongAmount] = useState(0);

  useEffect(() => {
    // Connection events are not required but are left here for illustration
    socket.on("connect", () => console.log("socket connected"));
    socket.on("disconnect", () => console.log("socket disconnected"));

    socket.on("pong", () => {
      console.log("socket received: pong");
      setPongAmount(pongAmount + 1);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  });

  const emitPing = useCallback(() => socket.emit("ping"), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="font-extralight">You pong this much: {pongAmount}</div>

      <div className="">
        <button
          type="button"
          onClick={emitPing}
          className="bg-white border border-white text-black py-2 px-6 text-sm rounded hover:bg-opacity-0 hover:text-white"
        >
          Ping!
        </button>
      </div>
    </div>
  );
};

export default PingPong;
