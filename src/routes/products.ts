import { Router, Request, Response, NextFunction } from 'express';
import { ProductsController } from '../controllers/products.controller';
import { createProductValidationRules, updateProductValidationRules, productIdValidationRule } from '../validators/product.validator';

const router = Router();
const productsController = new ProductsController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.getAllProducts(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', ...productIdValidationRule, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.getProductById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/', ...createProductValidationRules, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.createProduct(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', ...productIdValidationRule, ...updateProductValidationRules, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.updateProduct(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', ...productIdValidationRule, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productsController.deleteProduct(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;