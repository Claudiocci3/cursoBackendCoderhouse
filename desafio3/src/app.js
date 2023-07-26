const express = require("express");

const ProductManager = require("./ProductManager");

const product = new ProductManager();

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/products", async (req, res) => {
  try {
    if (req.query.limit) {
      const limit = req.query.limit;
      const producto2 = await product.showLimit(limit);
      res.send(producto2);
    } else {
      const producto = await product.getProducts();
      res.send(producto);
    }
  } catch (error) {
    console.log("Ha ocurrido un error en la obtencion de productos", error);
    res.status(500).send("Error al obtener los productos.");
  }
});

app.get("/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  try {
    const productPid = await product.getProductById(pid);
    res.send(productPid);
  } catch (error) {
    res.send({ Error: "No se encontró el producto con el ID especificado" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
