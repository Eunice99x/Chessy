import express, { Request, Response } from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

app.get("/", (req: Request, res: Response) => {
  res.json("hello");
});

server.listen(4000, () => {
  console.log("app runing on port 4000");
});
