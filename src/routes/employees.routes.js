import { Router } from 'express';
import { createEmployees, deleteEmployee, getEmployees, getOneEmployee, updateEmployee } from '../controllers/employees.controllers.js';
const router = Router();
router.get('/employees', getEmployees)
//Devuelve un solo empleado
router.get('/employees/:id', getOneEmployee);
router.post('/employees/', createEmployees)
router.patch('/employees/:id', updateEmployee)
router.delete('/employees/:id', deleteEmployee)
export default router;