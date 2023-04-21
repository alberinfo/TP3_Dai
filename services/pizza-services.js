class PizzaService { 
    getById = async (id) => {
        let returnEntity = null; 
        console.log('Estoy en: PizzaService.GetById(id)');
        try { 
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('SELECT * FROM Pizza WHERE id = @pId')
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}