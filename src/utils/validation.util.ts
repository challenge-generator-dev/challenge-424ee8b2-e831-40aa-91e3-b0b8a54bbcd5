import { body, param, ValidationChain, Meta } from 'express-validator';

/**
 * Utilidades centralizadas para validación de datos en la API.
 * Proporciona validadores reutilizables para diferentes entidades y operaciones.
 */

export const ValidationMessages = {
  REQUIRED: 'El campo es obligatorio',
  INVALID_TYPE: 'El tipo de dato es inválido',
  MIN_LENGTH: 'El valor debe tener al menos :min caracteres',
  MAX_LENGTH: 'El valor no puede exceder :max caracteres',
  MIN_VALUE: 'El valor debe ser mayor o igual a :min',
  MAX_VALUE: 'El valor no puede exceder :max',
  POSITIVE_NUMBER: 'El valor debe ser un número positivo',
  NEGATIVE_NOT_ALLOWED: 'No se permiten valores negativos',
  DUPLICATE_NAME: 'Ya existe un producto con este nombre',
  NOT_FOUND: 'Recurso no encontrado',
  INVALID_CATEGORY: 'La categoría especificada no es válida'
} as const;

export const ProductCategories = [
  'electronics',
  'clothing',
  'food',
  'books',
  'home',
  'sports',
  'toys',
  'health',
  'automotive',
  'other'
] as const;

export type ProductCategory = typeof ProductCategories[number];

/**
 * Valida que el nombre del producto sea válido.
 * - Obligatorio
 * - Entre 3 y 100 caracteres
 * - No permite solo espacios en blanco
 */
export const validateProductName = (): ValidationChain => {
  return body('name')
    .trim()
    .notEmpty()
    .withMessage(ValidationMessages.REQUIRED)
    .isLength({ min: 3, max: 100 })
    .withMessage(`El nombre debe tener entre 3 y 100 caracteres`)
    .matches(/^\S+$/)
    .withMessage('El nombre no puede contener solo espacios en blanco');
};

/**
 * Valida que el precio del producto sea válido.
 * - Obligatorio
 * - Debe ser un número positivo
 * - No permite valores negativos
 * - Máximo 2 decimales
 */
export const validateProductPrice = (): ValidationChain => {
  return body('price')
    .notEmpty()
    .withMessage(ValidationMessages.REQUIRED)
    .isFloat({ min: 0.01 })
    .withMessage('El precio debe ser mayor a 0')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error(ValidationMessages.NEGATIVE_NOT_ALLOWED);
      }
      const decimalPlaces = value.toString().split('.')[1]?.length || 0;
      if (decimalPlaces > 2) {
        throw new Error('El precio debe tener como máximo 2 decimales');
      }
      return true;
    });
};

/**
 * Valida que el stock del producto sea válido.
 * - Obligatorio
 * - Debe ser un número entero no negativo
 * - No permite valores negativos
 */
export const validateProductStock = (): ValidationChain => {
  return body('stock')
    .notEmpty()
    .withMessage(ValidationMessages.REQUIRED)
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero no negativo')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error(ValidationMessages.NEGATIVE_NOT_ALLOWED);
      }
      return true;
    });
};

/**
 * Valida que la categoría del producto sea válida.
 * - Debe ser una de las categorías permitidas
 */
export const validateProductCategory = (): ValidationChain => {
  return body('category')
    .trim()
    .notEmpty()
    .withMessage(ValidationMessages.REQUIRED)
    .isIn(ProductCategories)
    .withMessage(`Categoría inválida. Las categorías válidas son: ${ProductCategories.join(', ')}`);
};

/**
 * Valida el ID del producto como parámetro de ruta.
 * - Debe ser un número entero positivo
 */
export const validateProductIdParam = (): ValidationChain => {
  return param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo');
};

/**
 * Valida el ID del producto.
 * Alias para validateProductIdParam para compatibilidad con otros módulos.
 */
export const validateProductId = validateProductIdParam;

/**
 * Valida que el nombre no esté duplicado.
 * Esta función retorna una cadena de validación que verifica contra la base de datos.
 * @param existsByNameFunction Función asíncrona que verifica existencia por nombre
 */
export const validateUniqueProductName = (
  existsByNameFunction: (name: string) => Promise<boolean>
): ValidationChain => {
  return body('name')
    .trim()
    .custom(async (value: string, { req }: Meta) => {
      if (!value) return true;
      const productId = req.params?.id ? parseInt(req.params.id, 10) : null;
      const exists = await existsByNameFunction(value);
      if (exists && (!productId || productId <= 0)) {
        throw new Error(ValidationMessages.DUPLICATE_NAME);
      }
      return true;
    });
};

/**
 * Valida que el precio no sea negativo en actualizaciones parciales.
 * A diferencia de create, en update el campo puede ser omitido.
 */
export const validateOptionalPrice = (): ValidationChain => {
  return body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('El precio debe ser mayor a 0')
    .custom((value: number | undefined) => {
      if (value !== undefined && value < 0) {
        throw new Error(ValidationMessages.NEGATIVE_NOT_ALLOWED);
      }
      return true;
    });
};

/**
 * Valida que el stock no sea negativo en actualizaciones parciales.
 */
export const validateOptionalStock = (): ValidationChain => {
  return body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero no negativo');
};

/**
 * Valida que la categoría sea válida en actualizaciones parciales.
 */
export const validateOptionalCategory = (): ValidationChain => {
  return body('category')
    .optional()
    .trim()
    .isIn(ProductCategories)
    .withMessage(`Categoría inválida. Las categorías válidas son: ${ProductCategories.join(', ')}`);
};

/**
 * Validador completo para crear un nuevo producto.
 * Combina todas las validaciones necesarias para el endpoint POST.
 */
export const validateCreateProduct = (): ValidationChain[] => [
  validateProductName(),
  validateProductPrice(),
  validateProductStock(),
  validateProductCategory()
];

/**
 * Validador completo para actualizar un producto.
 * Todos los campos son opcionales pero deben cumplir las reglas si se proporcionan.
 */
export const validateUpdateProduct = (): ValidationChain[] => [
  validateProductIdParam(),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres')
    .matches(/^\S+$/)
    .withMessage('El nombre no puede contener solo espacios en blanco'),
  validateOptionalPrice(),
  validateOptionalStock(),
  validateOptionalCategory()
];

/**
 * Validador para eliminar un producto.
 * Solo valida el ID del producto.
 */
export const validateDeleteProduct = (): ValidationChain[] => [
  validateProductIdParam()
];

/**
 * Validador para obtener un producto por ID.
 */
export const validateGetProduct = (): ValidationChain[] => [
  validateProductIdParam()
];

/**
 * Validador para listar productos.
 * Por ahora no hay filtros, pero la estructura permite extensión.
 */
export const validateGetProducts = (): ValidationChain[] => [];

/**
 * Helper para verificar si un valor es una categoría válida.
 * Útil para validaciones dinámicas o en servicios.
 */
export const isValidCategory = (category: string): category is ProductCategory => {
  return ProductCategories.includes(category as ProductCategory);
};

/**
 * Normaliza el nombre de categoría a minúsculas.
 * Útil para consistencia en la base de datos.
 */
export const normalizeCategory = (category: string): string => {
  return category.toLowerCase().trim();
};

/**
 * Valida que un objeto CreateProductDto tenga los campos mínimos requeridos.
 * Útil para validaciones en memoria sin pasar por express-validator.
 */
export const isValidCreateProductDto = (dto: unknown): dto is { name: string; price: number; stock: number; category: string } => {
  if (typeof dto !== 'object' || dto === null) return false;
  const obj = dto as Record<string, unknown>;
  return (
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.stock === 'number' &&
    typeof obj.category === 'string'
  );
};

/**
 * Valida que un objeto UpdateProductDto tenga una estructura válida.
 * Todos los campos son opcionales.
 */
export const isValidUpdateProductDto = (dto: unknown): dto is { name?: string; price?: number; stock?: number; category?: string } => {
  if (typeof dto !== 'object' || dto === null) return false;
  const obj = dto as Record<string, unknown>;
  const validKeys = ['name', 'price', 'stock', 'category'];
  const keys = Object.keys(obj);
  return keys.every(key => validKeys.includes(key)) &&
    keys.every(key => {
      const value = obj[key];
      if (value === undefined) return true;
      return typeof value === 'string' || typeof value === 'number';
    });
};

/**
 * Genera un mensaje de error de validación personalizado.
 * Útil para crear mensajes dinámicos basados en el campo y la regla.
 */
export const generateValidationMessage = (
  field: string,
  rule: 'required' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern' | 'invalid',
  details?: Record<string, unknown>
): string => {
  const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
  switch (rule) {
    case 'required':
      return `${fieldName} es obligatorio`;
    case 'minLength':
      return `${fieldName} debe tener al menos ${details?.min} caracteres`;
    case 'maxLength':
      return `${fieldName} no puede exceder ${details?.max} caracteres`;
    case 'min':
      return `${fieldName} debe ser mayor o igual a ${details?.min}`;
    case 'max':
      return `${fieldName} no puede exceder ${details?.max}`;
    case 'pattern':
      return `${fieldName} tiene un formato inválido`;
    case 'invalid':
      return `${fieldName} es inválido`;
    default:
      return `Error de validación en ${fieldName}`;
  }
};