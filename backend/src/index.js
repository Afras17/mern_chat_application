import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import cors from "cors"; // Middleware to enable CORS (Cross-Origin Resource Sharing)

import { connectDB } from "./lib/db.js"; // Import the connectDB function to establish a connection to the database

import authRoutes from "./routes/auth.route.js"; // Import the authRouter
import messageRoutes from "./routes/message.route.js";; // Import the messageRouter
import { app, server} from './lib/socket.js'
import path from "path"; // Import the path module to work with file and directory paths

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
} 

server.listen(PORT, () => {
  console.log('Server is running on POST:'+ PORT);
  connectDB(); // Call the connectDB function to establish a connection to the database
});