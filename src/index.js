import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/productos.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productosRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT || 3000);
});