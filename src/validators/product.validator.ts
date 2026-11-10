import { body, param, ValidationChain, Meta } from 'express-validator';
import { ProductsRepository } from '../repositories/products.repository';
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductIdParam
} from '../utils/validation.util';

const productsRepository = new ProductsRepository();

export const createProductValidationRules: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres')
    .custom(async (value: string) => {
      const exists = await productsRepository.existsByName(value);
      if (exists) {
        throw new Error('Ya existe un producto con este nombre');
      }
      return true;
    }),

  body('price')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error('No se permiten precios negativos');
      }
      return true;
    }),

  body('stock')
    .notEmpty()
    .withMessage('El stock es obligatorio')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('La categoría solo puede contener letras, números, espacios y guiones')
];

export const updateProductValidationRules: ValidationChain[] = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID del producto debe ser un número entero positivo'),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre debe tener entre 3 y 100 caracteres')
    .custom(async (value: string, meta: Meta) => {
      const req = meta.req;
      const params = req.params || {};
      const productId = parseInt(params.id, 10);
      
      if (isNaN(productId)) {
        return true;
      }
      
      const exists = await productsRepository.existsByName(value);
      const product = await productsRepository.getById(productId);
      
      if (exists && product && product.name !== value) {
        throw new Error('Ya existe otro producto con este nombre');
      }
      return true;
    }),

  body('price')
    .optional()
    .notEmpty()
    .withMessage('El precio no puede estar vacío')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0')
    .custom((value: number) => {
      if (value < 0) {
        throw new Error('No se permiten precios negativos');
      }
      return true;
    }),

  body('stock')
    .optional()
    .notEmpty()
    .withMessage('El stock no puede estar vacío')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('La categoría no puede estar vacía')
    .isLength({ min: 2, max: 50 })
    .withMessage('La categoría debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z0-9\s-]+$/)
    .withMessage('La categoría solo puede contener letras, números, espacios y guiones')
];

export const productIdValidationRule: ValidationChain[] = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID del producto debe ser un número entero positivo')
];

export const validateProductName = (name: string): boolean => {
  const trimmedName = name.trim();
  
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return false;
  }
  
  if (!/^[a-zA-Z0-9\s-]+$/.test(trimmedName)) {
    return false;
  }
  
  return true;
};

export const validateProductPrice = (price: number): boolean => {
  return price >= 0 && typeof price === 'number' && !isNaN(price);
};

export const validateProductStock = (stock: number): boolean => {
  return Number.isInteger(stock) && stock >= 0;
};

export const validateProductCategory = (category: string): boolean => {
  const trimmedCategory = category.trim();
  
  if (trimmedCategory.length < 2 || trimmedCategory.length > 50) {
    return false;
  }
  
  return /^[a-zA-Z0-9\s-]+$/.test(trimmedCategory);
};

export { validateCreateProduct, validateUpdateProduct, validateProductIdParam as validateProductId };