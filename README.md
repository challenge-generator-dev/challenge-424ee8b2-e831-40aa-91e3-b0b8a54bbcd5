# Desarrollo de API REST para catálogo de productos

La empresa de comercio electrónico 'PragmaMarket' necesita exponer un catálogo de productos a través de una API REST. Los endpoints deben validar las entradas y manejar los errores de manera centralizada. El catálogo incluye productos con nombre, precio, stock y categoría. Se deben prohibir precios negativos y nombres duplicados. El sistema debe responder adecuadamente ante casos borde como productos agotados o categorías inexistentes.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición y exposición de endpoints básicos

**Objetivo:** Exponer los endpoints mínimos para consultar el catálogo de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Define los endpoints para listar todos los productos y para obtener un producto por su ID.
- Implementa la validación básica de entradas (nombre y precio del producto).
- Maneja los errores de manera centralizada para los endpoints definidos.

**Entregable:** Documentación de los endpoints y código fuente que permite consultar el catálogo de productos y manejar errores básicos.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que los nombres de productos no pueden ser duplicados y los precios deben ser positivos.
- Considera cómo manejarías un producto inexistente al consultar por ID.

</details>

### Fase 2: Implementación de validaciones avanzadas y manejo de errores

**Objetivo:** Implementar validaciones avanzadas y mejorar el manejo de errores para los endpoints del catálogo de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Agrega validaciones para el stock y la categoría de los productos.
- Mejora el manejo de errores para cubrir casos borde como productos agotados o categorías inexistentes.

**Entregable:** Código fuente actualizado con validaciones avanzadas y manejo mejorado de errores para los endpoints del catálogo de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejarías un producto agotado al consultar su stock.
- Piensa en cómo comunicarías al usuario que una categoría no existe.

</details>

### Fase 3: Refactorización y optimización del código

**Objetivo:** Refactorizar y optimizar el código de la API para mejorar su mantenibilidad y rendimiento.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Refactoriza el código para mejorar su estructura y legibilidad.
- Optimiza el rendimiento de los endpoints, considerando la latencia y el throughput.

**Entregable:** Código fuente refactorizado y optimizado de la API REST para el catálogo de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de funciones auxiliares para evitar código repetido.
- Piensa en cómo podrías mejorar la latencia y el throughput de los endpoints.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los endpoints REST y cuál es su propósito en una API?
- **paraQueSirve**: ¿Para qué sirve la validación de entradas en una API REST?
- **comoSeUsa**: ¿Cómo se usa el manejo centralizado de errores en una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al construir una API REST y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la refactorización y optimización del código de una API REST?

## Criterios de Evaluacion

- Definición y exposición de endpoints básicos.
- Implementación de validaciones avanzadas y manejo de errores.
- Refactorización y optimización del código.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
