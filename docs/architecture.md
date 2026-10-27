# Arquitectura de software

## Visión general

La versión 0.1.0 adopta un **monolito modular** sobre Next.js App Router. La
interfaz, las futuras rutas de servidor y los módulos de negocio convivirán en
una sola aplicación desplegable, con límites explícitos por funcionalidad.

Este enfoque reduce la complejidad operativa durante las primeras etapas,
permite compartir tipos y componentes de forma controlada y conserva la opción
de extraer servicios en el futuro si aparecen necesidades demostrables. No se
introducen microservicios, capas genéricas ni abstracciones anticipadas.

## Estado tecnológico

Ya configurado:

- Next.js 16.4.3, App Router, React 19.3.0 y TypeScript estricto.
- Material UI, Material Icons y Emotion configurados con tema centralizado y
  `AppRouterCacheProvider` para el renderizado de estilos con App Router.
- ESLint con las reglas recomendadas de Next.js y TypeScript.
- Alias `@/*` hacia `src/*`.
- Entorno Docker de desarrollo con bind mount, dependencias aisladas y hot
  reload.

Planeado o pendiente de decisión:

- Persistencia y proveedor de base de datos.
- Autenticación, autorización y roles.
- Contratos de API y estrategia de validación.
- Estrategia de pruebas, observabilidad, CI/CD y despliegue.
- Catálogo de componentes y tokens adicionales del sistema visual.

## Responsabilidades de directorios

- `src/app`: rutas, layouts, loading/error boundaries, Route Handlers y estilos
  propios de Next.js. No concentra toda la lógica de negocio.
- `src/components`: componentes visuales reutilizables entre varias
  funcionalidades. No depende de módulos concretos de `features`.
- `src/features`: módulos verticales futuros. Cada módulo agrupará su UI,
  lógica, validaciones y tipos privados cuando exista una necesidad real.
- `src/lib`: utilidades técnicas e integraciones compartidas, como futuros
  clientes de infraestructura. No contiene reglas de negocio específicas.
- `src/providers`: providers globales de React que realmente deban envolver la
  aplicación. Todo provider que use estado o APIs del navegador será Client
  Component.
- `src/config`: lectura y validación centralizada de configuración. No almacena
  secretos ni valores específicos de una máquina.
- `src/types`: únicamente tipos usados de forma transversal. Los tipos locales
  permanecen junto a la funcionalidad que los posee.
- `public`: recursos estáticos servidos por Next.js.
- `docker`: archivos de construcción de imágenes.
- `docs`: decisiones y documentación técnica mantenida junto al código.

## Dependencias y límites

Dirección permitida de dependencias:

```text
app -> features -> components
 |        |            |
 +--------+------------+--> lib / config / types
providers -----------------> lib / config / types
```

Reglas:

1. `app` compone rutas y módulos; evita implementar lógica de negocio extensa.
2. Un módulo de `features` no importa internals de otro módulo. La colaboración
   ocurre mediante contratos públicos pequeños o composición desde `app`.
3. `components`, `lib`, `config` y `types` no dependen de `features` ni de rutas.
4. No se permiten dependencias circulares.
5. Antes de promover código a una carpeta compartida debe existir reutilización
   real; compartir por anticipado crea acoplamiento.
6. Los Server Components son la opción predeterminada. Se añade `"use client"`
   solo en el límite que necesite estado, efectos, eventos o APIs del navegador.
7. Acceso a secretos, persistencia y servicios internos permanece en el
   servidor y nunca se importa desde Client Components.

## Separación futura por funcionalidad

Cuando se implemente una capacidad, se creará solo la estructura necesaria:

```text
src/features/<feature>/
├── components/        # UI privada del módulo, si existe
├── actions/           # acciones del servidor, si se adoptan
├── schemas/           # validaciones del módulo, si se adoptan
├── types.ts           # tipos privados o públicos del módulo
└── index.ts           # API pública mínima, solo cuando sea útil
```

Esto es una guía, no una plantilla obligatoria. No se crean carpetas o archivos
hasta que una funcionalidad los requiera. En esta versión no existen módulos de
comunidades, proyectos, árboles ni usuarios.

## Convenciones

- Directorios y archivos generales: `kebab-case`.
- Componentes React y tipos exportados: `PascalCase`.
- Funciones, variables y hooks: `camelCase`; hooks con prefijo `use`.
- Constantes globales reales: `UPPER_SNAKE_CASE`.
- Componentes: `ComponentName.tsx`; utilidades: nombre descriptivo en
  `kebab-case.ts`.
- Imports internos mediante `@/` cuando mejora la claridad.
- Exportaciones nombradas por defecto; `default` se reserva para convenciones de
  archivos de Next.js cuando corresponda.

## Decisiones adoptadas

1. TypeScript permanece en modo `strict`.
2. App Router es el único sistema de rutas.
3. Material UI es la biblioteca principal de componentes; no se incorporan
   Tailwind ni shadcn/ui.
4. Server Components son el valor predeterminado.
5. La aplicación se organiza como monolito modular, no como microservicios.
6. La configuración compartida se centraliza y valida antes de consumirse.
7. Docker usa Node.js 24 oficial y `npm ci` con el lockfile existente.
8. Desarrollo publica `127.0.0.1:3000`, mientras Next.js escucha en
   `0.0.0.0:3000` dentro del contenedor.
9. `node_modules` y `.next` viven en volúmenes separados del bind mount para
   evitar que el host reemplace dependencias o artefactos del contenedor.
10. El polling de archivos se habilita por defecto para ofrecer hot reload
    consistente en Docker Desktop y Docker Engine; puede desactivarse mediante
    `WATCHPACK_POLLING=false` cuando los eventos nativos sean fiables.
11. Material UI usa un tema centralizado y `AppRouterCacheProvider` para evitar
    inconsistencias de estilos entre servidor y cliente.

## Reglas de evolución

- Evitar sobreingeniería y crear abstracciones solo ante casos de uso reales.
- Mantener las dependencias alineadas y justificar cualquier paquete nuevo.
- Registrar decisiones arquitectónicas relevantes en este documento o en ADRs
  si el volumen de decisiones lo requiere.
- No ubicar credenciales en código, imágenes Docker o archivos versionados.
- Validar lint y tipos antes de integrar cambios.

## Decisiones pendientes

- Elegir ORM o estrategia de acceso a datos antes de crear modelos o esquemas.
- Elegir motor y proveedor de base de datos.
- Definir autenticación, sesión, roles y autorización.
- Decidir validación de entradas y forma de exponer operaciones de servidor
  (Route Handlers, Server Actions o combinación).
- Extender los tokens y componentes del sistema visual cuando existan pantallas
  de negocio reales.
- Definir niveles de pruebas y herramientas asociadas.
- Elegir plataforma de despliegue, observabilidad y estrategia de CI/CD.
