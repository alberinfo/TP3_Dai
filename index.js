import PizzaService from './services/pizza-services.js'
import pizza from './models/pizza.js'

let servicio = new PizzaService();
console.log(await servicio.getAllPizzas());
console.log("\n");
console.log(await servicio.getPizzaById(2));
console.log("\n");
let pizzaParaInsertar = new pizza();
pizzaParaInsertar.nombre = "prueba"; pizzaParaInsertar.libreDeGluten = false; pizzaParaInsertar.precio = 400; pizzaParaInsertar.descripcion = "AAAAAAAAAAA";
console.log(await servicio.createPizza(pizzaParaInsertar));
console.log(await servicio.getAllPizzas());
console.log("\n");

process.exit();