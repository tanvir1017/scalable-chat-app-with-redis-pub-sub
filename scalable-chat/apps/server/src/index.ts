import http from "http";

async function init() {
  const httpServer = http.createServer();
  const PORT = process.env.PORT || 7549;

  httpServer.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
}

init();
