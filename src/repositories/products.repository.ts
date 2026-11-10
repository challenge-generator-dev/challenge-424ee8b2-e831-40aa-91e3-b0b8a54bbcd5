import { Product } from '../models/product.model';

/**
 * Interfaz para el repositorio de productos
 */
export interface IProductsRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}

/**
 * Implementación en memoria del repositorio de productos
 */
export class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];
  private nextId = 1;

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: number): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = new Product(
      this.nextId++,
      productData.name,
      productData.price,
      productData.stock,
      productData.category
    );
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, productData: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;

    const existingProduct = this.products[productIndex];
    const updatedProduct = new Product(
      existingProduct.id,
      productData.name || existingProduct.name,
      productData.price !== undefined ? productData.price : existingProduct.price,
      productData.stock !== undefined ? productData.stock : existingProduct.stock,
      productData.category || existingProduct.category
    );

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    return this.products.length !== initialLength;
  }

  async existsByName(name: string): Promise<boolean> {
    return this.products.some(product => product.name === name);
  }
}