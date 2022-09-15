const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const fs = require("fs");
const fsPromise = fs.promises;
const Contenedor = require("../Desafio-3/main");
const constructor = new Contenedor("./productos.txt");
const productosRouter = require("./productos");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views",
    defaultLayout: "main",
  })
);


// HANDLE BARS VIEWS/


app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
  });
});

app.get("/productos", (req, res) => {
  res.render("productos", {
    layout: "productos",
    title: "Productos",
    compras: constructor.getAll().sort((a, b) => a.id - b.id),
    noProd: "No hay productos",
  });
});

/////////////////////////
// PUG VIEWS/////
/////////////////////////
// app.set("views", __dirname + "/views");
// app.set("view engine", "pug");
// app.get("/", (req, res) => {
//   res.render("root", {
//     layout: "root",
//     title: "Página principal",
//     Precio: "Precio",
//     addProd: "Añadir Producto",
//   });
// });

// app.get("/productos", (req, res) => {
//   res.render("productos", {
//     layout: "productos",
//     title: "Productos",
//     compras: constructor.getAll().sort((a, b) => a.id - b.id),
//     noProd: "No hay productos",
//   });
// });

/////////////////////////
// EJS VIEWS/////
/////////////////////////
// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");
// app.get("/", (req, res) => {
//   res.render("root", {
//     layout: "root",
//     title: "Página principal",
//     Precio: "Precio",
//     addProd: "Añadir Producto",
//   });
// });

// app.get("/productos", (req, res) => {
//   res.render("productos", {
//     layout: "productos",
//     title: "Productos",
//     compras: constructor.getAll().sort((a, b) => a.id - b.id),
//     noProd: "No hay productos",
//   });
// });

app.use("/productos", productosRouter);

app.listen(3000, () => {
  console.log("Server ON");
});
