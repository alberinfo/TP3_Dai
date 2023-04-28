import PizzaService from './services/pizza-services.js'
import pizza from './models/pizza.js'
import express from 'express'
import cors from 'cors'

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

//NOTA: Estaria bueno ver como handlear status codes y casos de error. Por ahora esto funca.

app.get("/pizzas", async (req, res) => {
    let pizzas = await PizzaService.getAllPizzas();
    res.send(JSON.stringify(pizzas));
})

app.get("/pizzas/:id", async (req, res) => {
    let pizza = await PizzaService.getPizzaById(req.params.id);
    res.send(JSON.stringify(pizza));
})

app.post("/pizzas", async (req, res) => {
    console.log(req.body);
    let result = await PizzaService.createPizza(req.body);
    res.send(result);
})

app.put("/pizzas", async (req, res) => {
    console.log(req.body);
    let result = await PizzaService.updatePizza(req.body);
    res.send(result);
})

app.delete("/pizzas/:id", async (req, res) => {
    let result = await PizzaService.deletePizza(req.params.id);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})