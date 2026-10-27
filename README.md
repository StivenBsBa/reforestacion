# Plataforma de seguimiento de reforestación comunitaria

Aplicación web para el futuro seguimiento de iniciativas comunitarias de
reforestación. La versión **0.1.0** incluye una arquitectura inicial organizada,
Material UI configurado para App Router, la aplicación dockerizada, la limpieza
del proyecto generado por Next.js y una página informativa de inicio. Aún no
implementa funcionalidades de negocio.

## Estado y stack

Tecnologías instaladas y configuradas actualmente:

- Next.js 16.4.3 con App Router y Turbopack en desarrollo.
- React y React DOM 19.3.0.
- TypeScript 5 en modo estricto.
- Material UI e Icons 9.5.0 con Emotion 11, tema centralizado y caché SSR para
  App Router.
- ESLint 9 con `eslint-config-next` 16.4.3.
- Node.js 24 en la imagen de desarrollo. Next.js exige como mínimo Node.js
  20.9.0.
- Docker Compose para desarrollo local.

Tecnologías planeadas, pero **no configuradas**: persistencia de datos,
autenticación, autorización, APIs de negocio, testing integral, CI/CD y
despliegue remoto. PostgreSQL y cualquier proveedor externo siguen pendientes
de una decisión técnica.

## Requisitos previos

- Git.
- Docker Desktop en Windows o macOS, o Docker Engine con el plugin Docker
  Compose en Linux.
- Docker Compose v2, invocado como `docker compose`.
- Un editor de código; VS Code es recomendado, pero no obligatorio.

Node.js y npm **no son necesarios en el host** para el flujo principal. La
imagen instala las dependencias con `npm ci` y el volumen `node_modules` las
mantiene dentro de Docker. Node.js 20.9 o superior solo se requiere para la
ejecución local opcional sin contenedores.

## Estructura

```text
.
├── docker/
│   └── Dockerfile
├── docs/
│   └── architecture.md
├── public/                 # recursos estáticos
├── src/
│   ├── app/                # rutas, layouts y estilos del App Router
│   ├── components/         # componentes compartidos
│   ├── config/             # configuración centralizada
│   ├── features/           # futuros módulos de negocio
│   ├── lib/                # utilidades e integraciones técnicas
│   ├── providers/          # providers globales de React
│   └── types/              # tipos estrictamente compartidos
├── .dockerignore
├── .env.example
├── compose.yaml
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

Las carpetas aún sin implementación contienen un README breve para registrar
su responsabilidad sin introducir módulos o archivos de código artificiales.
Las reglas completas están en [docs/architecture.md](docs/architecture.md).

## Inicio rápido con Docker

Este flujo es el mismo desde PowerShell, Command Prompt, Terminal de macOS o
una shell de Linux/WSL2. En la raíz del repositorio ejecutar:

```bash
docker compose up --build
```

Abrir `http://localhost:3000`. El código se monta mediante la ruta relativa del
repositorio, mientras `node_modules` y `.next` permanecen en volúmenes
administrados por Docker. Las dependencias se instalan dentro de la imagen y
los cambios en TS, TSX y CSS activan hot reload sin reconstruirla.

`WATCHPACK_POLLING` usa `true` por defecto para que la detección de cambios sea
consistente en bind mounts de Docker Desktop y Docker Engine. Puede definirse
como `false` en un archivo `.env` cuando los eventos nativos funcionen de forma
fiable y se prefiera reducir el consumo de recursos.

Comandos habituales:

```bash
# Iniciar en segundo plano
docker compose up --build -d

# Ver logs
docker compose logs -f app

# Detener y conservar volúmenes
docker compose down

# Reconstruir después de cambiar dependencias o el Dockerfile
docker compose up --build

# Eliminar también dependencias y caché almacenadas en volúmenes
docker compose down --volumes
```

El último comando elimina volúmenes locales regenerables; no contiene datos de
negocio en esta versión.

### Ejecución sin Docker

```bash
npm ci
npm run dev
```

Validaciones disponibles:

```bash
npm run lint
npm run typecheck
```

## Abrir con VS Code

Desde cualquier terminal que tenga disponible el comando de VS Code:

```bash
code .
```

El entorno de ejecución no depende de VS Code ni de extensiones específicas.

## Recomendaciones por sistema operativo

### Windows

- Usar Docker Desktop con contenedores Linux y el backend WSL2 habilitado.
- PowerShell y Command Prompt pueden ejecutar directamente todos los comandos
  `docker compose` documentados.
- Mantener finales de línea consistentes mediante Git. El Dockerfile no ejecuta
  scripts dependientes de CRLF, Bash o PowerShell.

### Windows con WSL2

- Habilitar la integración de Docker Desktop para la distribución utilizada.
- Guardar el repositorio bajo `/home/...` ofrece mejor rendimiento que
  `/mnt/c/...` y evita problemas de permisos o sincronización.
- Abrir el proyecto con `code .` desde WSL; VS Code debe mostrar la distribución
  WSL activa.

### Linux

- Instalar Docker Engine y el plugin Docker Compose desde los paquetes
  recomendados para la distribución.
- Configurar el acceso de usuario al daemon según la documentación de Docker o
  ejecutar los comandos con los permisos requeridos por el sistema.
- Docker usa contenedores Linux de forma nativa; no se necesita Node.js local.

### macOS

- Usar Docker Desktop y almacenar el repositorio en una ubicación compartida
  con Docker, normalmente dentro del directorio personal.
- En equipos Apple Silicon, la imagen oficial de Node utilizada es
  multi-arquitectura; no es necesario fijar `platform`.
- Si el hot reload consume demasiados recursos y los eventos nativos funcionan,
  establecer `WATCHPACK_POLLING=false` en `.env`.

## Variables de entorno

La aplicación no requiere variables de negocio. `.env.example` documenta la
opción portable de hot reload. Docker Compose carga automáticamente un archivo
`.env` ubicado en la raíz si se desea sobrescribir el valor predeterminado; se
puede crear copiando `.env.example` con las herramientas propias del sistema
operativo. Nunca se deben versionar credenciales ni archivos `.env*` reales.

## Colaboración

- Partir de una rama actualizada y mantener cambios pequeños y enfocados.
- No mezclar refactors con funcionalidades en la misma entrega.
- Ejecutar lint y comprobación de tipos antes de solicitar revisión.
- Revisar cambios del otro desarrollador y resolver conflictos juntos cuando
  afecten arquitectura, dependencias o configuración.
- No cambiar dependencias, contratos compartidos o decisiones pendientes sin
  acordarlo.

Convención de ramas:

- `feature/<descripcion>` para funcionalidades.
- `fix/<descripcion>` para correcciones.
- `chore/<descripcion>` para infraestructura y mantenimiento.
- `docs/<descripcion>` para documentación.

Usar commits breves en modo imperativo y, preferiblemente, Conventional
Commits: `feat:`, `fix:`, `docs:`, `chore:` o `refactor:`. Ejemplo:
`chore: dockerize development environment`.

## Problemas frecuentes con Docker

- **El daemon no responde:** iniciar Docker Desktop o Docker Engine. En WSL2,
  habilitar además la integración de la distribución.
- **El puerto 3000 está ocupado:** detener el proceso o contenedor que lo usa.
  El puerto se publica solo en `127.0.0.1` por seguridad de desarrollo.
- **Instalación inconsistente tras cambiar dependencias:** ejecutar
  `docker compose down --volumes` y luego `docker compose up --build`.
- **Hot reload lento:** el polling está habilitado para priorizar compatibilidad.
  Si los eventos nativos funcionan, usar `WATCHPACK_POLLING=false` en `.env`.
- **Permisos en archivos:** evitar editar el mismo repositorio simultáneamente
  desde entornos con modelos de permisos diferentes.

## Alcance actual

Esta versión presenta una página inicial informativa y prepara la base técnica.
Quedan pendientes los módulos de comunidades, proyectos, árboles y usuarios;
modelos y migraciones; autenticación y permisos; APIs, formularios, CRUD,
dashboard, diseño visual definitivo, pruebas completas, CI/CD y despliegue.

Las decisiones abiertas se detallan en la sección final de
[docs/architecture.md](docs/architecture.md).
