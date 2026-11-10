# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Desarrollo de API REST para catálogo de productos**.

| | |
|---|---|
| Tema | Construccion de APIs REST con Express |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / Express 4.21.0 |
| Patron arquitectonico | capas estándar (ruteo, controlador, servicio, repositorio) |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`
- `Express como framework (vinculante: no mezcles otro framework del mismo ecosistema)`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- express 4.21.0
- @types/express 4.17.21
- typescript 5.7.2
- ts-node 10.9.2
- express-validator 7.2.0
- jest 29.7.0
- @types/jest 29.5.14
- ts-jest 29.2.5
- supertest 7.0.0
- @types/supertest 2.0.16

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Definición y exposición de endpoints básicos**: Documentación de los endpoints y código fuente que permite consultar el catálogo de productos y manejar errores básicos.
- **Fase 2 — Implementación de validaciones avanzadas y manejo de errores**: Código fuente actualizado con validaciones avanzadas y manejo mejorado de errores para los endpoints del catálogo de productos.
- **Fase 3 — Refactorización y optimización del código**: Código fuente refactorizado y optimizado de la API REST para el catálogo de productos.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `tests/products.controller.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `tests/products.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `tests/products.repository.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Boilerplate del stack (1)

Sin esto el proyecto no compila ni arranca. **Es tu trabajo crearlo**, y no toca nada de lo pedagogico: es andamiaje del stack.

- [ ] **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### 2. Referencias colgando (5)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/repositories/products.repository.ts` — `Product.find`
      Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/repositories/products.repository.ts` — `Product.push`
      Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/repositories/products.repository.ts` — `Product.findIndex`
      Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/repositories/products.repository.ts` — `Product.filter`
      Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/repositories/products.repository.ts` — `Product.some`
      Se invoca `some` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (19)

- `package.json`
- `tsconfig.json`
- `src/models/product.model.ts`
- `src/repositories/products.repository.ts`
- `src/routes/products.ts`
- `src/controllers/products.controller.ts`
- `src/services/products.service.ts`
- `src/middlewares/error.middleware.ts`
- `src/validators/product.validator.ts`
- `src/exceptions/not-found.exception.ts`
- `src/exceptions/bad-request.exception.ts`
- `src/exceptions/conflict.exception.ts`
- `src/utils/validation.util.ts`
- `src/main.ts`
- `src/app.ts`
- `tests/products.controller.spec.ts`
- `tests/products.service.spec.ts`
- `tests/products.repository.spec.ts`
- `src1191142959/src/tsconfig.json`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/routes`
- `src/controllers`
- `src/services`
- `src/repositories`
- `src/models`
- `src/middlewares`
- `src/utils`
- `src/validators`
- `src/exceptions`
- `tests`

## Verificacion

```bash
npm install && npm run build
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar (ruteo, controlador, servicio, repositorio)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261110115758191), Expone endpoints REST con validacion de entrada y manejo centralizado de errores
- Mision: Exponer el catalogo de productos

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
