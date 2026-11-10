import express, { Application, Request, Response, NextFunction, Router } from 'express';
import { ProductsController } from './controllers/products.controller';
import { errorMiddleware } from './middlewares/error.middleware';
import { productIdValidationRule, createProductValidationRules, updateProductValidationRules } from './validators/product.validator';

const app: Application = express();
const productsController = new ProductsController();
const productsRouter: Router = Router();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[REQUEST] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API de PragmaMarket funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

productsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await productsController.getAllProducts(req, res);
});

productsRouter.get('/:id', ...productIdValidationRule, async (req: Request, res: Response, next: NextFunction) => {
  await productsController.getProductById(req, res);
});

productsRouter.post('/', ...createProductValidationRules, async (req: Request, res: Response, next: NextFunction) => {
  await productsController.createProduct(req, res);
});

productsRouter.put('/:id', ...productIdValidationRule, ...updateProductValidationRules, async (req: Request, res: Response, next: NextFunction) => {
  await productsController.updateProduct(req, res);
});

productsRouter.delete('/:id', ...productIdValidationRule, async (req: Request, res: Response, next: NextFunction) => {
  await productsController.deleteProduct(req, res);
});

app.use('/products', productsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    statusCode: 404,
    timestamp: new Date().toISOString()
  });
});

app.use(errorMiddleware);

export default app;