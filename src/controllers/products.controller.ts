import { Request, Response, NextFunction } from 'express';
import { ProductsService } from '../services/products.service';
import { Product, CreateProductDto, UpdateProductDto } from '../models/product.model';
import { NotFoundException } from '../exceptions/not-found.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ConflictException } from '../exceptions/conflict.exception';

export class ProductsController {
  private productsService: ProductsService;

  constructor(productsService?: ProductsService) {
    this.productsService = productsService || new ProductsService();
  }

  async getAllProducts(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const products: Product[] = await this.productsService.getAllProducts();
      res.status(200).json({
        success: true,
        data: products,
        message: 'Productos obtenidos exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (next) {
        next(error);
        return;
      }
      if (error instanceof NotFoundException) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener productos',
        timestamp: new Date().toISOString()
      });
    }
  }

  async getProductById(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new BadRequestException('El ID del producto debe ser un número válido');
      }
      const product: Product | null = await this.productsService.getProductById(id);
      if (!product) {
        throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
      }
      res.status(200).json({
        success: true,
        data: product,
        message: 'Producto obtenido exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (next) {
        next(error);
        return;
      }
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al obtener el producto',
        timestamp: new Date().toISOString()
      });
    }
  }

  async createProduct(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const { name, price, stock, category } = req.body;
      if (price < 0) {
        throw new BadRequestException('El precio no puede ser negativo');
      }
      if (stock < 0) {
        throw new BadRequestException('El stock no puede ser negativo');
      }
      const exists = await this.productsService.existsByName(name);
      if (exists) {
        throw new ConflictException(`Ya existe un producto con el nombre "${name}"`, 'name', name, 'Producto');
      }
      const createDto = new CreateProductDto({ name, price, stock, category });
      const product: Product = await this.productsService.createProduct(createDto);
      res.status(201).json({
        success: true,
        data: product,
        message: 'Producto creado exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (next) {
        next(error);
        return;
      }
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al crear el producto',
        timestamp: new Date().toISOString()
      });
    }
  }

  async updateProduct(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new BadRequestException('El ID del producto debe ser un número válido');
      }
      const existingProduct = await this.productsService.getProductById(id);
      if (!existingProduct) {
        throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
      }
      const updateData = req.body;
      if (updateData.price !== undefined && updateData.price < 0) {
        throw new BadRequestException('El precio no puede ser negativo');
      }
      if (updateData.stock !== undefined && updateData.stock < 0) {
        throw new BadRequestException('El stock no puede ser negativo');
      }
      if (updateData.name && updateData.name !== existingProduct.name) {
        const exists = await this.productsService.existsByName(updateData.name);
        if (exists) {
          throw new ConflictException(`Ya existe un producto con el nombre "${updateData.name}"`, 'name', updateData.name, 'Producto');
        }
      }
      const updateDto = new UpdateProductDto(updateData);
      const updatedProduct: Product | null = await this.productsService.updateProduct(id, updateDto);
      if (!updatedProduct) {
        throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
      }
      res.status(200).json({
        success: true,
        data: updatedProduct,
        message: 'Producto actualizado exitosamente',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (next) {
        next(error);
        return;
      }
      if (error instanceof NotFoundException || error instanceof BadRequestException || error instanceof ConflictException) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al actualizar el producto',
        timestamp: new Date().toISOString()
      });
    }
  }

  async deleteProduct(req: Request, res: Response, next?: NextFunction): Promise<void> {
    try {
      const id: number = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        throw new BadRequestException('El ID del producto debe ser un número válido');
      }
      const existingProduct = await this.productsService.getProductById(id);
      if (!existingProduct) {
        throw new NotFoundException('Producto', id, `Producto con ID ${id} no encontrado`);
      }
      const deleted: boolean = await this.productsService.deleteProduct(id);
      if (!deleted) {
        throw new BadRequestException('No se pudo eliminar el producto');
      }
      res.status(200).json({
        success: true,
        message: `Producto con ID ${id} eliminado exitosamente`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      if (next) {
        next(error);
        return;
      }
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        return;
      }
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor al eliminar el producto',
        timestamp: new Date().toISOString()
      });
    }
  }
}