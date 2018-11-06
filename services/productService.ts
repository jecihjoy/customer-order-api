import { ProductRepository } from '../data/repositories/productRepository';

const productRepo = new ProductRepository();

export class ProductService {

    async createProducts(products) {
        return await(productRepo.createProducts(products))
    }

    async getAllProducts() {
        return await productRepo.findAll();
    }

    async getProduct(id) {
        return await productRepo.findOne(id);
    }

    async updateProducts(products) {
        return await(productRepo.updateProducts(products));
    }
    async deleteProduct(id) {
        return await productRepo.deleteProduct(id);
    }
    
    async countProducts() {
        return await productRepo.getCount();
    }
}

