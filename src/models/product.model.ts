/**
 * Modelo de datos para productos del catálogo
 */
export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;

  constructor(id: number, name: string, price: number, stock: number, category: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
  }
}

/**
 * DTO para crear un nuevo producto
 */
export class CreateProductDto {
  name!: string;
  price!: number;
  stock!: number;
  category!: string;

  constructor(data: { name: string; price: number; stock: number; category: string }) {
    this.name = data.name;
    this.price = data.price;
    this.stock = data.stock;
    this.category = data.category;
  }

  static fromRequest(body: unknown): CreateProductDto {
    const obj = body as Record<string, unknown>;
    return new CreateProductDto({
      name: String(obj.name ?? ''),
      price: Number(obj.price),
      stock: Number(obj.stock),
      category: String(obj.category ?? '')
    });
  }
}

/**
 * DTO para actualizar un producto existente
 */
export class UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;

  constructor(data: Partial<{ name: string; price: number; stock: number; category: string }>) {
    if (data.name !== undefined) this.name = data.name;
    if (data.price !== undefined) this.price = data.price;
    if (data.stock !== undefined) this.stock = data.stock;
    if (data.category !== undefined) this.category = data.category;
  }

  static fromRequest(body: unknown): UpdateProductDto {
    const obj = body as Record<string, unknown>;
    return new UpdateProductDto({
      name: obj.name !== undefined ? String(obj.name) : undefined,
      price: obj.price !== undefined ? Number(obj.price) : undefined,
      stock: obj.stock !== undefined ? Number(obj.stock) : undefined,
      category: obj.category !== undefined ? String(obj.category) : undefined
    });
  }
}

/**
 * Categorías válidas para productos
 */
export const ProductCategories = ['Electronics', 'Books', 'Clothing', 'Food', 'Home', 'Sports', 'Toys', 'Health'] as const;
export type ProductCategory = typeof ProductCategories[number];