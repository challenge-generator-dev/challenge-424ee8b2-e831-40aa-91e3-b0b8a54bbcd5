import { ProductsRepository } from '../src/repositories/products.repository';
import { Product } from '../src/models/product.model';

describe('ProductsRepository', () => {
  let repository: ProductsRepository;

  const mockProduct: Product = {
    id: 1,
    name: 'Laptop Pro',
    price: 1500,
    stock: 10,
    category: 'Electronics'
  };

  beforeEach(() => {
    repository = new ProductsRepository();
  });

  describe('getAll', () => {
    it('debe retornar todos los productos', async () => {
      await repository.create({ name: 'Laptop Pro', price: 1500, stock: 10, category: 'Electronics' });
      await repository.create({ name: 'Mouse', price: 25, stock: 50, category: 'Electronics' });

      const result = await repository.getAll();

      expect(result.length).toBe(2);
    });

    it('debe retornar array vacío inicialmente', async () => {
      const result = await repository.getAll();

      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('debe retornar un producto por su ID', async () => {
      const created = await repository.create({ name: 'Test', price: 100, stock: 5, category: 'Books' });

      const result = await repository.getById(created.id);

      expect(result).not.toBeNull();
      expect(result?.name).toBe('Test');
    });

    it('debe retornar null cuando el producto no existe', async () => {
      const result = await repository.getById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('debe crear un nuevo producto con ID asignado', async () => {
      const productData = { name: 'Nuevo producto', price: 200, stock: 15, category: 'Books' };

      const result = await repository.create(productData);

      expect(result.id).toBeDefined();
      expect(result.name).toBe(productData.name);
      expect(result.price).toBe(productData.price);
      expect(result.stock).toBe(productData.stock);
      expect(result.category).toBe(productData.category);
    });

    it('debe incrementar el ID automáticamente', async () => {
      await repository.create({ name: 'Producto 1', price: 100, stock: 5, category: 'Books' });
      await repository.create({ name: 'Producto 2', price: 200, stock: 10, category: 'Books' });

      const result = await repository.create({ name: 'Producto 3', price: 300, stock: 15, category: 'Books' });

      expect(result.id).toBe(3);
    });
  });

  describe('update', () => {
    it('debe actualizar un producto existente', async () => {
      const created = await repository.create({ name: 'Original', price: 100, stock: 5, category: 'Books' });

      const result = await repository.update(created.id, { price: 150 });

      expect(result).not.toBeNull();
      expect(result?.price).toBe(150);
      expect(result?.name).toBe('Original');
    });

    it('debe retornar null cuando el producto no existe', async () => {
      const result = await repository.update(999, { price: 150 });

      expect(result).toBeNull();
    });

    it('debe permitir actualización parcial', async () => {
      const created = await repository.create({ name: 'Original', price: 100, stock: 5, category: 'Books' });

      const result = await repository.update(created.id, { name: 'Actualizado' });

      expect(result?.name).toBe('Actualizado');
      expect(result?.price).toBe(100);
    });
  });

  describe('delete', () => {
    it('debe eliminar un producto existente', async () => {
      const created = await repository.create({ name: 'A eliminar', price: 100, stock: 5, category: 'Books' });

      const result = await repository.delete(created.id);

      expect(result).toBe(true);
      expect(await repository.getById(created.id)).toBeNull();
    });

    it('debe retornar false cuando el producto no existe', async () => {
      const result = await repository.delete(999);

      expect(result).toBe(false);
    });
  });

  describe('existsByName', () => {
    it('debe retornar true cuando el nombre existe', async () => {
      await repository.create({ name: 'Producto existente', price: 100, stock: 5, category: 'Books' });

      const result = await repository.existsByName('Producto existente');

      expect(result).toBe(true);
    });

    it('debe retornar false cuando el nombre no existe', async () => {
      const result = await repository.existsByName('Producto inexistente');

      expect(result).toBe(false);
    });

    it('debe ser case-sensitive', async () => {
      await repository.create({ name: 'Producto', price: 100, stock: 5, category: 'Books' });

      const result = await repository.existsByName('PRODUCTO');

      expect(result).toBe(false);
    });
  });
});