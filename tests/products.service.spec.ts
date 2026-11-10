import { ProductsService } from '../src/services/products.service';
import { ProductsRepository } from '../src/repositories/products.repository';
import { Product, CreateProductDto, UpdateProductDto } from '../src/models/product.model';
import { NotFoundException } from '../src/exceptions/not-found.exception';
import { ConflictException } from '../src/exceptions/conflict.exception';
import { BadRequestException } from '../src/exceptions/bad-request.exception';

describe('ProductsService', () => {
  let service: ProductsService;
  let mockRepository: jest.Mocked<ProductsRepository>;

  const mockProduct: Product = {
    id: 1,
    name: 'Laptop Pro',
    price: 1500,
    stock: 10,
    category: 'Electronics'
  };

  beforeEach(() => {
    mockRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      existsByName: jest.fn()
    } as any;

    service = new ProductsService(mockRepository);
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos del repositorio', async () => {
      const products: Product[] = [mockProduct];
      mockRepository.getAll.mockResolvedValue(products);

      const result = await service.getAllProducts();

      expect(result).toEqual(products);
      expect(mockRepository.getAll).toHaveBeenCalled();
    });

    it('debe retornar array vacío cuando no hay productos', async () => {
      mockRepository.getAll.mockResolvedValue([]);

      const result = await service.getAllProducts();

      expect(result).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('debe retornar un producto por su ID', async () => {
      mockRepository.getById.mockResolvedValue(mockProduct);

      const result = await service.getProductById(1);

      expect(result).toEqual(mockProduct);
      expect(mockRepository.getById).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException cuando el producto no existe', async () => {
      mockRepository.getById.mockResolvedValue(null);

      await expect(service.getProductById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createProduct', () => {
    it('debe crear un producto con datos válidos', async () => {
      const createDto: CreateProductDto = {
        name: 'Nuevo producto',
        price: 100,
        stock: 5,
        category: 'Books'
      };
      mockRepository.existsByName.mockResolvedValue(false);
      mockRepository.create.mockResolvedValue({ id: 2, ...createDto });

      const result = await service.createProduct(createDto);

      expect(result).toEqual({ id: 2, ...createDto });
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
    });

    it('debe lanzar ConflictException cuando el nombre ya existe', async () => {
      const createDto: CreateProductDto = {
        name: 'Producto existente',
        price: 100,
        stock: 5,
        category: 'Books'
      };
      mockRepository.existsByName.mockResolvedValue(true);

      await expect(service.createProduct(createDto)).rejects.toThrow(ConflictException);
    });

    it('debe lanzar BadRequestException cuando el precio es negativo', async () => {
      const createDto: CreateProductDto = {
        name: 'Producto',
        price: -10,
        stock: 5,
        category: 'Books'
      };

      await expect(service.createProduct(createDto)).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar BadRequestException cuando el stock es negativo', async () => {
      const createDto: CreateProductDto = {
        name: 'Producto',
        price: 100,
        stock: -5,
        category: 'Books'
      };

      await expect(service.createProduct(createDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar un producto existente', async () => {
      const updateDto: UpdateProductDto = { price: 200 };
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.update.mockResolvedValue({ ...mockProduct, price: 200 });

      const result = await service.updateProduct(1, updateDto);

      expect(result.price).toBe(200);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('debe lanzar NotFoundException cuando el producto no existe', async () => {
      mockRepository.getById.mockResolvedValue(null);

      await expect(service.updateProduct(999, { price: 200 })).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException cuando el nuevo nombre ya existe', async () => {
      const existingProduct: Product = { id: 2, name: 'Otro producto', price: 50, stock: 5, category: 'Books' };
      const updateDto: UpdateProductDto = { name: 'Otro producto' };
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.existsByName.mockResolvedValue(true);

      await expect(service.updateProduct(1, updateDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar un producto existente', async () => {
      mockRepository.getById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockResolvedValue(true);

      const result = await service.deleteProduct(1);

      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException cuando el producto no existe', async () => {
      mockRepository.getById.mockResolvedValue(null);

      await expect(service.deleteProduct(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProductsByCategory', () => {
    it('debe retornar productos de una categoría específica', async () => {
      const products: Product[] = [mockProduct];
      mockRepository.getAll.mockResolvedValue(products);

      const result = await service.getProductsByCategory('Electronics');

      expect(result).toEqual(products);
    });
  });

  describe('getProductsWithLowStock', () => {
    it('debe retornar productos con stock bajo', async () => {
      const lowStockProducts: Product[] = [{ ...mockProduct, stock: 5 }];
      mockRepository.getAll.mockResolvedValue(lowStockProducts);

      const result = await service.getProductsWithLowStock(10);

      expect(result.length).toBe(1);
    });
  });

  describe('getOutOfStockProducts', () => {
    it('debe retornar productos sin stock', async () => {
      const outOfStockProducts: Product[] = [{ ...mockProduct, stock: 0 }];
      mockRepository.getAll.mockResolvedValue(outOfStockProducts);

      const result = await service.getOutOfStockProducts();

      expect(result.length).toBe(1);
      expect(result[0].stock).toBe(0);
    });
  });
});