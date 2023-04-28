import pizza from '../models/pizza.js'
import config from '../dbconfig.js';
import sql from 'mssql';

class PizzaService {

    static getAllPizzas = async () => {
        let returnEntity = null;
        try {
            let connection = await sql.connect(config); //Esto es un asco. no se hace asi, pero javascript se queja si se hace de cualquier otra manera
            let result = await connection.request().query("SELECT * FROM Pizza");
            returnEntity = result.recordsets[0];
        } catch(error) {
            console.log(error);
            return error;
        }
        return returnEntity;
    }

    static getPizzaById = async (id) => {
        let returnEntity = null; 
        try {
            let connection = await sql.connect(config); //Esto es un asco. no se hace asi, pero javascript se queja si se hace de cualquier otra manera
            let result = await connection.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM Pizza WHERE id = @pId')
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
            return error;
        }
        return returnEntity;
    }

    static createPizza = async (Pizza) => {
        let returnEntity = null;
        try {
            let connection = await sql.connect(config); //Esto es un asco. no se hace asi, pero javascript se queja si se hace de cualquier otra manera
            let result = await connection.request()
                                .input('pId', sql.Int, Pizza.id)
                                .input('pNombre', sql.VarChar, Pizza.nombre)
                                .input('pLibre', sql.Bit, Pizza.libreDeGluten)
                                .input('pPrecio', sql.Float, Pizza.precio)
                                .input('pDesc', sql.VarChar, Pizza.descripcion)
                                .query("INSERT INTO Pizza (nombre, libreDeGluten, precio, descripcion) VALUES(@pNombre, @pLibre, @pPrecio, @pDesc)");
            returnEntity = result; //Rows affected
        } catch (error) {
            console.log(error);
            return error;
        }
        return returnEntity;
    }

    static updatePizza = async (Pizza) => {
        let returnEntity = null;
        try {
            let connection = await sql.connect(config); //Esto es un asco. no se hace asi, pero javascript se queja si se hace de cualquier otra manera
            let result = await connection.request()
                                .input('pId', sql.Int, Pizza.id)
                                .input('pNombre', sql.VarChar, Pizza.nombre)
                                .input('pLibre', sql.Bit, Pizza.libreDeGluten)
                                .input('pPrecio', sql.Float, Pizza.precio)
                                .input('pDesc', sql.VarChar, Pizza.descripcion)
                                .query("UPDATE Pizza SET nombre = @pNombre, libreDeGluten = @pLibre, precio = @pPrecio, descripcion = @pDesc WHERE id = @pId");
            returnEntity = result; //Rows affected
        } catch (error) {
            console.log(error);
            return error;
        }
        return returnEntity;
    }

    static deletePizza = async (id) => {
        let returnEntity = null;
        try {
            let connection = await sql.connect(config); //Esto es un asco. no se hace asi, pero javascript se queja si se hace de cualquier otra manera
            let result = await connection.request()
                                .input('pId', sql.Int, id)
                                .query("DELETE FROM Pizza WHERE id = @pId");
            returnEntity = result; //Rows affected
        } catch (error) {
            console.log(error);
            return error;
        }
        return returnEntity;
    }
}

export default PizzaService;