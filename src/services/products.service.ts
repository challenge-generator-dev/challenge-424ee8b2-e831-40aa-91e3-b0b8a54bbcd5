import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { ProductsRepository } from '../repositories/products.repository';
import { NotFoundException } from '../exceptions/not-found.exception';

export class ProductsService {
  private repository: ProductsRepository;

  constructor(repository?: ProductsRepository) {
    this.repository = repository || new ProductsRepository();
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.repository.getAll();
    if (!products || products.length === 0) {
      return [];
    }
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    if (!id || id <= 0) {
      throw new NotFoundException('Producto', id, 'ID de producto inválido');
    }
    const product = await this.repository.getById(id);
    if (!product) {
      throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    this.validateProductData(productData);
    const product: Product = await this.repository.create(productData);
    return product;
  }

  async updateProduct(id: number, productData: UpdateProductDto): Promise<Product> {
    if (!id || id <= 0) {
      throw new NotFoundException('Producto', id, 'ID de producto inválido');
    }
    this.validatePartialProductData(productData);
    const updated = await this.repository.update(id, productData);
    if (!updated) {
      throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
    }
    return updated;
  }

  async deleteProduct(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new NotFoundException('Producto', id, 'ID de producto inválido');
    }
    const exists = await this.repository.getById(id);
    if (!exists) {
      throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
    }
    return await this.repository.delete(id);
  }

  async existsByName(name: string): Promise<boolean> {
    if (!name || name.trim().length === 0) {
      return false;
    }
    return await this.repository.existsByName(name.trim());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!category || category.trim().length === 0) {
      return [];
    }
    const allProducts = await this.repository.getAll();
    return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  async getProductsWithLowStock(threshold: number = 10): Promise<Product[]> {
    if (threshold < 0) {
      threshold = 0;
    }
    const allProducts = await this.repository.getAll();
    return allProducts.filter(p => p.stock > 0 && p.stock <= threshold);
  }

  async getOutOfStockProducts(): Promise<Product[]> {
    const allProducts = await this.repository.getAll();
    return allProducts.filter(p => p.stock === 0);
  }

  private validateProductData(data: CreateProductDto): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('El nombre del producto es obligatorio');
    }
    if (data.name.trim().length < 3) {
      throw new Error('El nombre del producto debe tener al menos 3 caracteres');
    }
    if (data.name.trim().length > 100) {
      throw new Error('El nombre del producto no puede exceder 100 caracteres');
    }
    if (data.price === undefined || data.price === null) {
      throw new Error('El precio del producto es obligatorio');
    }
    if (typeof data.price !== 'number' || data.price < 0) {
      throw new Error('El precio del producto debe ser un número no negativo');
    }
    if (data.price > 1000000) {
      throw new Error('El precio del producto no puede exceder 1,000,000');
    }
    if (data.stock === undefined || data.stock === null) {
      throw new Error('El stock del producto es obligatorio');
    }
    if (typeof data.stock !== 'number' || data.stock < 0) {
      throw new Error('El stock del producto debe ser un número no negativo');
    }
    if (!data.category || data.category.trim().length === 0) {
      throw new Error('La categoría del producto es obligatoria');
    }
  }

  private validatePartialProductData(data: UpdateProductDto): void {
    if (data.name !== undefined) {
      if (data.name.trim().length === 0) {
        throw new Error('El nombre del producto no puede estar vacío');
      }
      if (data.name.trim().length < 3) {
        throw new Error('El nombre del producto debe tener al menos 3 caracteres');
      }
      if (data.name.trim().length > 100) {
        throw new Error('El nombre del producto no puede exceder 100 caracteres');
      }
    }
    if (data.price !== undefined) {
      if (typeof data.price !== 'number' || data.price < 0) {
        throw new Error('El precio del producto debe ser un número no negativo');
      }
      if (data.price > 1000000) {
        throw new Error('El precio del producto no puede exceder 1,000,000');
      }
    }
    if (data.stock !== undefined) {
      if (typeof data.stock !== 'number' || data.stock < 0) {
        throw new Error('El stock del producto debe ser un número no negativo');
      }
    }
    if (data.category !== undefined) {
      if (data.category.trim().length === 0) {
        throw new Error('La categoría del producto no puede estar vacía');
      }
    }
  }
}