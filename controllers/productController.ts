import { ProductService } from "../services/productService";

let productService = new ProductService()

export class ProductController{

    saved = {
        status: "Ok",
        message: 'Saved successfully'
    }

    updated = {
        status: 'Ok',
        message: 'Updated successfully'
    }
    deleted = {
        status: 'Ok',
        message: 'deleted successfully'
    }
    
    saveProducts = (request, h) => {
        let products = [];
        request.payload.forEach(product => {
            products.push(product);
        });
        return productService.createProducts(products)
            .then((success) => {
                if (success) {
                    return this.saved;
                }
            })
            .catch((err) => {
                console.log('save products route error', err);
                return err;
            })
    }
    updateProducts = (request, h) => {
        let products = [];
        request.payload.forEach(product => {
            products.push(product);
        });
        return productService.updateProducts(products)
            .then((success) => {
                if (success) {
                    return this.updated;
                }
            })
            .catch((err) => {
                console.log('update products route error', err);
                return err;
            })
    }

    getAllProducts = (request, h) => {
        return productService.getAllProducts()
        .then((products) => {
            return products;
        })
        .catch((err) => {
            return err;
        })
    }

    getProductById = (request, h) => {
        let id = encodeURIComponent(request.params.id);
        return productService.getProduct(id)
        .then((product) => {
            return product;
        })
        .catch((err) => {
            return err;
        })
    }

    deleteProduct = (request, h) => {
        let id = encodeURIComponent(request.params.id);
        return productService.deleteProduct(id)
        .then((success) => {
            return success;
        })
        .catch((err) => {
            return err;
        })
    }

    countProducts = (request, h) => {
        return productService.countProducts()
        .then((count) => {
            return count;
        })
        .catch((err) => {
            return err;
        })
    }

}
