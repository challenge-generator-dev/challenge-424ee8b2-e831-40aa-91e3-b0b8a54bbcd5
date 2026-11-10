import { Request, Response, NextFunction } from 'express';
import { ProductsController } from '../src/controllers/products.controller';
import { ProductsService } from '../src/services/products.service';
import { Product, CreateProductDto, UpdateProductDto } from '../src/models/product.model';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockService: jest.Mocked<ProductsService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  const mockProduct: Product = new Product(1, 'Producto de prueba', 100.50, 20, 'Electronics');

  beforeEach(() => {
    mockService = {
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      existsByName: jest.fn(),
      getProductsByCategory: jest.fn(),
      getProductsWithLowStock: jest.fn(),
      getOutOfStockProducts: jest.fn()
    } as unknown as jest.Mocked<ProductsService>;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    mockNext = jest.fn();
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos', async () => {
      const mockProducts: Product[] = [mockProduct];
      mockService.getAllProducts.mockResolvedValue(mockProducts);
      mockRequest = {};
      
      controller = new ProductsController(mockService);
      
      await controller.getAllProducts(mockRequest as Request, mockResponse as Response);
      
      expect(mockService.getAllProducts).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
    });

    it('debe manejar errores cuando el servicio falla', async () => {
      mockService.getAllProducts.mockRejectedValue(new Error('Error de base de datos'));
      mockRequest = {};
      
      controller = new ProductsController(mockService);
      
      await controller.getAllProducts(mockRequest as Request, mockResponse as Response, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('debe retornar un producto por ID', async () => {
      mockService.getProductById.mockResolvedValue(mockProduct);
      mockRequest = { params: { id: '1' } };
      
      controller = new ProductsController(mockService);
      
      await controller.getProductById(mockRequest as Request, mockResponse as Response);
      
      expect(mockService.getProductById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
    });

    it('debe retornar 404 cuando el producto no existe', async () => {
      mockService.getProductById.mockResolvedValue(null as unknown as Product);
      mockRequest = { params: { id: '999' } };
      
      controller = new ProductsController(mockService);
      
      await controller.getProductById(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('createProduct', () => {
    it('debe crear un nuevo producto', async () => {
      const createDto = new CreateProductDto({
        name: 'Nuevo producto',
        price: 50,
        stock: 10,
        category: 'Books'
      });
      const createdProduct = new Product(1, createDto.name, createDto.price, createDto.stock, createDto.category);
      mockService.createProduct.mockResolvedValue(createdProduct);
      mockRequest = { body: { name: createDto.name, price: createDto.price, stock: createDto.stock, category: createDto.category } };
      
      controller = new ProductsController(mockService);
      
      await controller.createProduct(mockRequest as Request, mockResponse as Response);
      
      expect(mockService.createProduct).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });

    it('debe manejar error de nombre duplicado', async () => {
      const createDto = new CreateProductDto({
        name: 'Producto existente',
        price: 50,
        stock: 10,
        category: 'Books'
      });
      const error = new Error('Ya existe un producto con ese nombre');
      (error as any).statusCode = 409;
      mockService.createProduct.mockRejectedValue(error);
      mockRequest = { body: { name: createDto.name, price: createDto.price, stock: createDto.stock, category: createDto.category } };
      
      controller = new ProductsController(mockService);
      
      await controller.createProduct(mockRequest as Request, mockResponse as Response, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar un producto existente', async () => {
      const updateDto = new UpdateProductDto({ price: 150 });
      mockService.updateProduct.mockResolvedValue(mockProduct);
      mockRequest = { params: { id: '1' }, body: { price: 150 } };
      
      controller = new ProductsController(mockService);
      
      await controller.updateProduct(mockRequest as Request, mockResponse as Response);
      
      expect(mockService.updateProduct).toHaveBeenCalledWith(1, updateDto);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('debe retornar 404 cuando el producto a actualizar no existe', async () => {
      mockService.updateProduct.mockResolvedValue(null as unknown as Product);
      mockRequest = { params: { id: '999' }, body: { price: 150 } };
      
      controller = new ProductsController(mockService);
      
      await controller.updateProduct(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar un producto existente', async () => {
      mockService.deleteProduct.mockResolvedValue(true);
      mockRequest = { params: { id: '1' } };
      
      controller = new ProductsController(mockService);
      
      await controller.deleteProduct(mockRequest as Request, mockResponse as Response);
      
      expect(mockService.deleteProduct).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it('debe retornar 404 cuando el producto a eliminar no existe', async () => {
      mockService.deleteProduct.mockResolvedValue(false);
      mockRequest = { params: { id: '999' } };
      
      controller = new ProductsController(mockService);
      
      await controller.deleteProduct(mockRequest as Request, mockResponse as Response);
      
      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });
});