const socket = io();

// Escucha mensajes del servidor
socket.on('message', (message) => {
  console.log('Mensaje del servidor:', message);
});
// Escuchar la lista actualizada de productos del servidor
socket.on('productsUpdated', (products) => {
    console.log('Lista actualizada de productos:', products);
    renderProductList(products); // Llama a una función para renderizar la lista de productos
});

// Manejar el envío del formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío del formulario de la manera tradicional
    
    // Capturar los valores de los campos del formulario
    const title = document.getElementById('title').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;


    const category = document.getElementById('category').value || null;
    const description = document.getElementById('description').value || null;
    const stock = document.getElementById('stock').value || null;
    const status = document.getElementById('status').checked;
    const thumbnails = document.getElementById('thumbnails').value || null;

      // Realizar validaciones
      if (!title) {
        alert('El título es obligatorio');
        return;
      }
      if (!code) {
        alert('El código es obligatorio');
        return;
      }
      if (!price || isNaN(price)|| price < 0){
        alert('El precio debe ser numérico y mayor a 0');
        return;
      }
      if (!category) {
        alert('La categoría es obligatoria');
        return;
      }
      if (!description) {
        alert('La descripción es obligatoria');
        return;
      }
      if (!stock || isNaN(stock) || stock < 0) {
        alert('El stock debe ser numérico y mayor a 0');
        return;
      }

  
    const productData = {
      title,
      code,
      price,
      category,
      description,
      stock,
      status,
      thumbnails
    };

    console.log("productData", productData)
    // Enviar los datos al servidor mediante socket
    socket.emit('newProduct', productData);

    // Limpiar el formulario después de enviar
    document.getElementById('formulario').reset();
});


// Escuchar la lista actualizada de productos del servidor
socket.on('productsUpdated', (products) => {
    console.log('Lista actualizada de productos:', products);
    
});



function renderProductList(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos productos

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.code}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.status ? 'Activo' : 'Inactivo'}</td>
            <td>${product.thumbnails}</td>
        `;
        productList.appendChild(row);
    });
}

