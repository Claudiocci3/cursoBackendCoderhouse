# Mi Aplicación de Gestión de Carritos y Productos con Express

Esta es una aplicación para gestionar carritos y productos utilizando Node.js y el framework Express.

## Cómo Levantar el Servidor

1. Clona este repositorio a tu máquina local usando `git clone`.
2. Instala las dependencias utilizando `npm install`.
3. Inicia el servidor con el siguiente comando: " node app.js "

El servidor Express se iniciará en http://localhost:8080 por defecto. Asegúrate de que ningún otro proceso esté usando el puerto 8080.

## Cómo Configurar las Rutas en Postman

1. Abre Postman en tu máquina.
2. Utiliza las siguientes rutas para probar la funcionalidad de la aplicación:

### Crear un Carrito

- Método: POST
- URL: http://localhost:8080/carts

### Agregar un Producto a un Carrito

- Método: PUT
- URL: http://localhost:8080/carts/:cid/products/:pid/:units

### Eliminar un Producto de un Carrito

- Método: DELETE
- URL: http://localhost:8080/carts/:cid/products/:pid/:units

### Obtener todos los Productos

- Método: GET
- URL: http://localhost:8080/products

### Obtener un Producto por su ID

- Método: GET
- URL: http://localhost:8080/products/:pid

### Agregar un Nuevo Producto

- Método: POST
- URL: http://localhost:8080/products

### Modificar un Producto

- Método: PUT
- URL: http://localhost:8080/products/:pid

### Eliminar un Producto

- Método: DELETE
- URL: http://localhost:8080/products/:pid

Nota: Reemplaza :cid y :pid con los IDs de carrito y producto respectivamente, y :units con la cantidad de unidades.

