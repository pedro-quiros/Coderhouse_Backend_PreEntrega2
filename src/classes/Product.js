class Product{

    constructor(title, description, code, price, stock, category, thumbnails = []){
        this.id = 0;
        this.status = true;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails; // Asegurar que thumbnails es una lista
    }
}

export default Product;