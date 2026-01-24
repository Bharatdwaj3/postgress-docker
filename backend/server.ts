import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import prisma from './config/prisma-client.js';  

dotenv.config();

import bookRoutes from "./routes/book.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import studentRoutes from "./routes/student.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;



// Middlewares
app.use(express.json());
app.use(helmet());
//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

(async () => {
  try {
    await prisma.$connect();  
    console.log('Prisma successfully connected to the database');
  } catch (error) {
    console.error('Failure to connect DB:', error);
  }
})();


app.get('/', (req, res) => res.send('Server is ready'));
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/user/faculty', facultyRoutes);
app.use('/api/v1/user/student', studentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});