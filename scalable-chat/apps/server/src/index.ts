import http from "http";
import SocketServices from "./services/socket";

async function init() {
  const socketService = new SocketServices();

  const httpServer = http.createServer();
  const PORT = process.env.PORT || 7549;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });

  socketService.initListeners();
}

init();
