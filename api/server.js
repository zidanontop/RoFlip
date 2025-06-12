import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { startup } from './startup.js';
import { connectDB } from './db.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const httpServer = createServer(app);

// Configure Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*", // In production, replace with your frontend domain
    methods: ["GET", "POST"]
  }
});

// Initialize Socket.IO events
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Set io instance in app for use in routes
app.set('io', io);

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Import and use routes
import routes from './routes/index.js';
app.use('/api', routes);

// Connect to MongoDB
connectDB();

// Start the server
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  startup(io);
}); 