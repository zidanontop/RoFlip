import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { startup } from './startup.js';
import { connectDB } from './db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Getmethod, Deposit, withdrawed, GetSupported, bots, real } from './index.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Setup routes
app.post('/api/getmethod', real, Getmethod);
app.post('/api/deposit', real, Deposit);
app.post('/api/withdrawed', real, withdrawed);
app.get('/api/supported', GetSupported);
app.get('/api/bots/:game', bots);

// Connect to MongoDB
connectDB();

// Start the server
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  startup(io);
}); 