import { productManager } from '../managers/ProductManager.js';

export const socketHandler = (io) => {
  io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    // Enviar un mensaje de bienvenida al cliente
    socket.emit('message', 'Bienvenido al servidor');
    
    try {
      const listProducts = await productManager.getProducts();
      socket.emit('productsUpdated', listProducts);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      socket.emit('error', 'Error al obtener la lista de productos');
    }

    // Escuchar por nuevos productos
    socket.on('newProduct', async (productData) => {
      try {
        const product = await productManager.addProduct(productData);
        if (product?.message) {
          console.log(product.message, 'product message', socket.id);
          socket.emit('errorMessage', product.message);
        } else {
          const listProduct = await productManager.getProducts();
          socket.emit('productsUpdated', listProduct);
        }
      } catch (error) {
        console.error('Error al crear el producto:', error);
        socket.emit('error', 'Error al crear el producto');
      }
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
    
  });
};