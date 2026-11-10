# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `tests/products.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/products.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `tests/products.repository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/repositories/products.repository.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.push`: Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.findIndex`: Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/products.repository.ts` — `Product.some`: Se invoca `some` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261110115758191), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para catálogo de productos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición y exposición de endpoints básicos — objetivo: Exponer los endpoints mínimos para consultar el catálogo de productos. — entregable (NO resolver): Documentación de los endpoints y código fuente que permite consultar el catálogo de productos y manejar errores básicos.
- Fase 2: Implementación de validaciones avanzadas y manejo de errores — objetivo: Implementar validaciones avanzadas y mejorar el manejo de errores para los endpoints del catálogo de productos. — entregable (NO resolver): Código fuente actualizado con validaciones avanzadas y manejo mejorado de errores para los endpoints del catálogo de productos.
- Fase 3: Refactorización y optimización del código — objetivo: Refactorizar y optimizar el código de la API para mejorar su mantenibilidad y rendimiento. — entregable (NO resolver): Código fuente refactorizado y optimizado de la API REST para el catálogo de productos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "pragmamarket-api",
  "version": "1.0.0",
  "description": "API REST para catálogo de productos de PragmaMarket",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "class-validator": "^0.14.1",
    "express": "^4.21.0",
    "express-validator": "^7.2.0",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.14",
    "@types/node": "^20.11.0",
    "@types/supertest": "^2.0.16",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: src/models/product.model.ts ===
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

// === ARCHIVO: src/repositories/products.repository.ts ===
import { Product } from '../models/product.model';

/**
 * Interfaz para el repositorio de productos
 */
export interface IProductsRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}

/**
 * Implementación en memoria del repositorio de productos
 */
export class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];
  private nextId = 1;

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: number): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const newProduct = new Product(
      this.nextId++,
      productData.name,
      productData.price,
      productData.stock,
      productData.category
    );
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, productData: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;

    const existingProduct = this.products[productIndex];
    const updatedProduct = new Product(
      existingProduct.id,
      productData.name || existingProduct.name,
      productData.price !== undefined ? productData.price : existingProduct.price,
      productData.stock !== undefined ? productData.stock : existingProduct.stock,
      productData.category || existingProduct.category
    );

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.id !== id);
    return this.products.length !== initialLength;
  }

  async existsByName(name: string): Promise<boolean> {
    return this.products.some(product => product.name === name);
  }
}

// === ARCHIVO: src/routes/products.ts ===
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

// === ARCHIVO: src/controllers/products.controller.ts ===
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

// === ARCHIVO: src/services/products.service.ts ===
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

// === ARCHIVO: src/middlewares/error.middleware.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { NotFoundException } from '../exceptions/not-found.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ConflictException } from '../exceptions/conflict.exception';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export interface IErrorResponse {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  method?: string;
}

export const errorMiddleware: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = getStatusCode(err);
  const message = getMessage(err);
  const response = buildErrorResponse(statusCode, message, req);

  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, {
    stack: err.stack,
    statusCode
  });

  res.status(statusCode).json(response);
};

function getStatusCode(err: Error | AppError): number {
  if (err instanceof NotFoundException) {
    return 404;
  }
  if (err instanceof BadRequestException) {
    return 400;
  }
  if (err instanceof ConflictException) {
    return 409;
  }
  if (err instanceof AppError) {
    return err.statusCode;
  }
  return 500;
}

function getMessage(err: Error | AppError): string {
  if (err instanceof AppError) {
    return err.message;
  }
  if (err.message) {
    return err.message;
  }
  return 'Error interno del servidor';
}

function buildErrorResponse(
  statusCode: number,
  message: string,
  req: Request
): IErrorResponse {
  const response: IErrorResponse = {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };

  if (statusCode >= 500) {
    response.message = 'Error interno del servidor';
  }

  return response;
}

export const asyncHandler = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Recurso no encontrado',
    statusCode: 404,
    timestamp: new Date().toISOString()
  });
};

// === ARCHIVO: src/validators/product.validator.ts ===
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

// === ARCHIVO: src/exceptions/not-found.exception.ts ===
export class NotFoundException extends Error {
  private readonly _statusCode: number = 404;
  private readonly _errorCode: string;
  private readonly _resourceType: string;
  private readonly _resourceIdentifier: string | number;

  constructor(resourceType: string, identifier: string | number, message?: string) {
    const defaultMessage = message || `El recurso '${resourceType}' con identificador '${identifier}' no fue encontrado`;
    super(defaultMessage);
    this.name = 'NotFoundException';
    this._errorCode = 'RESOURCE_NOT_FOUND';
    this._resourceType = resourceType;
    this._resourceIdentifier = identifier;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException);
    }
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get resourceType(): string {
    return this._resourceType;
  }

  get resourceIdentifier(): string | number {
    return this._resourceIdentifier;
  }

  getStatus(): number {
    return this._statusCode;
  }

  getErrorCode(): string {
    return this._errorCode;
  }

  toJSON(): object {
    return {
      error: this.name,
      message: this.message,
      statusCode: this._statusCode,
      errorCode: this._errorCode,
      resourceType: this._resourceType,
      identifier: this._resourceIdentifier,
      timestamp: new Date().toISOString()
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}

// === ARCHIVO: src/exceptions/bad-request.exception.ts ===
export class BadRequestException extends Error {
  private readonly _statusCode: number = 400;
  private readonly _errorCode: string;
  private readonly _field: string | null;
  private readonly _validationErrors: string[];

  constructor(message: string, field?: string, validationErrors?: string[]) {
    super(message);
    this.name = 'BadRequestException';
    this._errorCode = 'BAD_REQUEST';
    this._field = field ?? null;
    this._validationErrors = validationErrors ?? [];
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException);
    }
  }

  static invalidPrice(price: number): BadRequestException {
    return new BadRequestException(
      `El precio no puede ser negativo. Valor proporcionado: ${price}`,
      'price',
      [`El precio debe ser mayor o igual a 0. Valor actual: ${price}`]
    );
  }

  static invalidStock(stock: number): BadRequestException {
    return new BadRequestException(
      `El stock no puede ser negativo. Valor proporcionado: ${stock}`,
      'stock',
      [`El stock debe ser mayor o igual a 0. Valor actual: ${stock}`]
    );
  }

  static missingRequiredField(fieldName: string): BadRequestException {
    return new BadRequestException(
      `El campo '${fieldName}' es requerido`,
      fieldName,
      [`El campo '${fieldName}' no puede estar vacío o indefinido`]
    );
  }

  static invalidFieldFormat(fieldName: string, expectedFormat: string): BadRequestException {
    return new BadRequestException(
      `El campo '${fieldName}' tiene un formato inválido. Se esperaba: ${expectedFormat}`,
      fieldName,
      [`El valor proporcionado para '${fieldName}' no coincide con el formato esperado: ${expectedFormat}`]
    );
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get field(): string | null {
    return this._field;
  }

  get validationErrors(): string[] {
    return [...this._validationErrors];
  }

  getStatus(): number {
    return this._statusCode;
  }

  getErrorCode(): string {
    return this._errorCode;
  }

  getField(): string | null {
    return this._field;
  }

  getValidationErrors(): string[] {
    return [...this._validationErrors];
  }

  toJSON(): Record<string, unknown> {
    const response: Record<string, unknown> = {
      error: this.name,
      message: this.message,
      statusCode: this._statusCode,
      errorCode: this._errorCode,
      timestamp: new Date().toISOString()
    };

    if (this._field) {
      response.field = this._field;
    }

    if (this._validationErrors.length > 0) {
      response.validationErrors = this._validationErrors;
    }

    return response;
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}

// === ARCHIVO: src/exceptions/conflict.exception.ts ===
export class ConflictException extends Error {
  private readonly _statusCode: number = 409;
  private readonly _errorCode: string;
  private readonly _conflictingField: string;
  private readonly _conflictingValue: string | number;
  private readonly _resourceType: string;

  constructor(
    message: string,
    conflictingField: string,
    conflictingValue: string | number,
    resourceType: string = 'recurso'
  ) {
    super(message);
    this.name = 'ConflictException';
    this._errorCode = 'CONFLICT';
    this._conflictingField = conflictingField;
    this._conflictingValue = conflictingValue;
    this._resourceType = resourceType;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictException);
    }
  }

  static duplicateName(name: string, resourceType: string = 'Producto'): ConflictException {
    return new ConflictException(
      `Ya existe un ${resourceType.toLowerCase()} con el nombre '${name}'`,
      'name',
      name,
      resourceType
    );
  }

  static duplicateCategory(category: string): ConflictException {
    return new ConflictException(
      `La categoría '${category}' ya existe en el sistema`,
      'category',
      category,
      'Categoría'
    );
  }

  static duplicateEmail(email: string): ConflictException {
    return new ConflictException(
      `El correo electrónico '${email}' ya está registrado`,
      'email',
      email,
      'Usuario'
    );
  }

  static resourceInUse(resourceType: string, identifier: number | string): ConflictException {
    return new ConflictException(
      `El ${resourceType.toLowerCase()} con ID '${identifier}' está siendo utilizado por otros recursos`,
      'id',
      identifier,
      resourceType
    );
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorCode(): string {
    return this._errorCode;
  }

  get conflictingField(): string {
    return this._conflictingField;
  }

  get conflictingValue(): string | number {
    return this._conflictingValue;
  }

  get resourceType(): string {
    return this._resourceType;
  }

  getStatus(): number {
    return this._statusCode;
  }

  getErrorCode(): string {
    return this._errorCode;
  }

  getConflictingField(): string {
    return this._conflictingField;
  }

  getConflictingValue(): string | number {
    return this._conflictingValue;
  }

  getResourceType(): string {
    return this._resourceType;
  }

  toJSON(): Record<string, unknown> {
    return {
      error: this.name,
      message: this.message,
      statusCode: this._statusCode,
      errorCode: this._errorCode,
      conflictingField: this._conflictingField,
      conflictingValue: this._conflictingValue,
      resourceType: this._resourceType,
      timestamp: new Date().toISOString()
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON(), null, 2);
  }
}

// === ARCHIVO: src/utils/validation.util.ts ===
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

// === ARCHIVO: src/main.ts ===
import app from './app';

const PORT = process.env.PORT || 3000;

const startServer = (): void => {
  const server = app.listen(PORT, () => {
    console.log(`[SERVER] Servidor iniciado en el puerto ${PORT}`);
    console.log(`[SERVER] Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[SERVER] URL: http://localhost:${PORT}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`[ERROR] El puerto ${PORT} ya está en uso`);
      process.exit(1);
    } else {
      console.error(`[ERROR] Error al iniciar el servidor:`, error);
      process.exit(1);
    }
  });

  process.on('SIGTERM', () => {
    console.log('[SERVER] Señal SIGTERM recibida, cerrando servidor...');
    server.close(() => {
      console.log('[SERVER] Servidor cerrado correctamente');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('[SERVER] Señal SIGINT recibida, cerrando servidor...');
    server.close(() => {
      console.log('[SERVER] Servidor cerrado correctamente');
      process.exit(0);
    });
  });
};

startServer();

// === ARCHIVO: src/app.ts ===
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

// === ARCHIVO: tests/products.controller.spec.ts ===
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

// === ARCHIVO: tests/products.service.spec.ts ===
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

// === ARCHIVO: tests/products.repository.spec.ts ===
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

// === ARCHIVO: src1191142959/src/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "../dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}
```
