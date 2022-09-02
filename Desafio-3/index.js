const express = require("express")
const fs = require("fs");


const Contenedor = require("./main");
const producto1 = {
  title: "Tenedor",
  price: 50.45,
};

const constructor = new Contenedor("./productos.txt");
constructor.save(producto1);

const app = express();

app.get("/productos", (req, res) => {
  res.send(constructor.getAll());
});

app.get("/productoRandom", (req, res) => {
  res.send(constructor.getRandom());
});

const server = app.listen(8080, () => {
  console.log("Server Encendido");
});