import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import createUsersTable from './data/createTable.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: "Something went wrong", error: err.message });
});

// Initialize Table and Start Server
createUsersTable();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});