import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';
const app = express();
app.use(express.json());
app.use('/api/', employeesRoutes);
app.use(indexRoutes);
//Function middleware (ruta que no esté especificada)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
});
export default app;