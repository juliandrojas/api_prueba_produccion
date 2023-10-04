import chalk from 'chalk';
import { pool } from "../db/db.js";
export const getEmployees = async (req, res) => {
    try {
        const query = await pool.query('SELECT * FROM employee');
        res.json(query);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}
export const getOneEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;  // Extraer el valor del parámetro
        const query = 'SELECT * FROM employee WHERE id = $1';
        try {
            const { rows } = await pool.query(query, [employeeId]);
            if (rows.length <= 0) {
                return res.status(404).json("No existe el empleado");
            } else {
                res.send({ success: true, employee: rows[0] });
            }
        } catch (error) {
            console.error('Error al obtener el empleado:', error);
            res.status(500).send({ success: false, error: 'Error al obtener el empleado' });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createEmployees = async (req, res) => {
    console.log(req.body);
    const { name, salary } = req.body;
    console.log(chalk.green(name));
    console.log(chalk.green(salary));
    try {
        const query = 'INSERT INTO employee (name, salary) VALUES ($1, $2)';
        const { rows } = await pool.query(query, [name, salary]);
        res.json({ message: "El empleado ha sido insertado" })
    } catch (error) {
        console.error(chalk.red('Error al insertar empleado:', error));
        res.status(500).send({ success: false, error: 'Error al insertar empleado' });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, salary } = req.body;

        // Usamos COALESCE para mantener el valor existente si el nuevo valor es nulo
        const query = `
        UPDATE employee 
        SET 
            name = COALESCE($1, name), 
            salary = COALESCE($2, salary) 
        WHERE id = $3
    `;

        try {
            const { rowCount } = await pool.query(query, [name, salary, id]);

            if (rowCount === 0) {
                console.log('Empleado no encontrado');
                res.status(404).json({ message: 'Empleado no encontrado' });
            } else {
                console.log('Empleado actualizado exitosamente');
                res.json({ message: 'Empleado actualizado exitosamente' });
            }
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            res.status(500).send("Error al actualizar el empleado");
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const deleteEmployee = async (req, res) => {
    try {
        try {
            const { rowCount } = await pool.query('DELETE FROM employee WHERE id = $1', [req.params.id]);

            if (rowCount > 0) {
                console.log(chalk.green(`Se eliminaron ${rowCount} filas`));
                res.send("Empleado eliminado");
            } else {
                res.status(404).json({
                    message: 'No se encontró ningún empleado con el ID proporcionado'
                });
            }
        } catch (error) {
            console.error(chalk.red('Error al eliminar el empleado:', error));
            res.status(500).send("Error al eliminar el empleado");
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
