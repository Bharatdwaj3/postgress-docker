import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';


import cookieParser from "cookie-parser";


import prisma from './config/prisma-client.ts';
//import morganConfig from './config/morgan.config.ts';

// Import routes
import bookRoutes from "./routes/book.routes.ts";
import facultyRoutes from "./routes/faculty.routes.ts";
import studentRoutes from "./routes/student.routes.ts";
import storageRoutes from "./routes/storage.routes.ts";
import authRoutes from "./routes/auth.routes.ts";
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: "8kb" }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Database connection
prisma.$connect()
  .then(() => console.log('Prisma connected to database'))
  .catch((error) => console.error(' Database connection failed:', error));

// Routes
app.get('/', (req, res) => res.send('Server is ready'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/user/faculty', facultyRoutes);
app.use('/api/v1/user/student', studentRoutes);
app.use('/api/v1/storage', storageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});