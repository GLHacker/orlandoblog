# OrlandoBlog - Blog Tecnológico Interactivo

<div align="center">

![OrlandoBlog](https://img.shields.io/badge/OrlandoBlog-v1.0-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

**Tu fuente de noticias, tutoriales y análisis sobre tecnología**

[Demo en Vivo](https://orlandoblog.manus.space) • [Documentación](./DEPLOYMENT_GUIDE.md) • [Configurar Giscus](./GISCUS_CONFIG.md)

</div>

---

## 🌟 Características Principales

OrlandoBlog es una plataforma de blogging moderna diseñada específicamente para contenido tecnológico, con una interfaz inspirada en Instagram que prioriza el contenido visual y la interacción comunitaria.

### 📱 Interfaz Tipo Instagram

El diseño utiliza un sistema de grid de 3 columnas en desktop que se adapta automáticamente a 2 columnas en tablets y 1 columna en móviles. Cada post se presenta como una card con imagen destacada, título, excerpt y categoría, con efectos hover que revelan estadísticas de vistas y comentarios.

### ✍️ Editor de Posts con Markdown

Los usuarios autenticados pueden crear posts con soporte completo de Markdown, incluyendo títulos, listas, enlaces, código con syntax highlighting, citas y más. El editor proporciona preview en tiempo real del formato.

### 📎 Subida de Archivos Adjuntos

Cada post puede incluir múltiples archivos adjuntos (documentos PDF, código fuente, datasets, etc.) de hasta 10MB cada uno. Los archivos se almacenan en S3 y están disponibles para descarga directa desde la vista del post.

### 💬 Sistema de Comentarios con Giscus

Integración con GitHub Discussions a través de Giscus, proporcionando un sistema de comentarios robusto, gratuito y sin necesidad de base de datos adicional. Los usuarios comentan usando sus cuentas de GitHub, lo que reduce spam y fomenta discusiones de calidad.

### 🔐 Autenticación Integrada

Sistema de autenticación OAuth con Manus que permite login social sin configuración adicional. Los usuarios pueden crear contenido, gestionar sus posts y participar en discusiones de forma segura.

### 🎨 Diseño Responsive y Moderno

Paleta de colores inspirada en Instagram con gradientes púrpura-rosa, bordes suaves, sombras sutiles y animaciones de transición. El diseño se adapta perfectamente a cualquier tamaño de pantalla manteniendo la estética y usabilidad.

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19**: Framework de UI con hooks modernos y concurrent rendering
- **Tailwind CSS 4**: Utility-first CSS con tema personalizado en OKLCH
- **tRPC**: Type-safe APIs sin necesidad de código boilerplate
- **Wouter**: Router minimalista y rápido para SPA
- **Streamdown**: Renderizado de Markdown con soporte de streaming
- **shadcn/ui**: Componentes de UI accesibles y personalizables

### Backend
- **Node.js 22**: Runtime de JavaScript de alto rendimiento
- **Express 4**: Framework web minimalista y flexible
- **tRPC 11**: RPC type-safe con validación automática
- **Drizzle ORM**: ORM TypeScript-first para MySQL
- **Zod**: Validación de esquemas con inferencia de tipos

### Infraestructura
- **MySQL/TiDB**: Base de datos relacional escalable
- **AWS S3**: Almacenamiento de objetos para imágenes y archivos
- **Manus Platform**: Hosting con CI/CD automático
- **Giscus**: Sistema de comentarios basado en GitHub Discussions

---

## 📦 Estructura del Proyecto

```
orlandoblog/
├── client/                    # Frontend React
│   ├── public/               # Assets estáticos
│   └── src/
│       ├── components/       # Componentes reutilizables
│       │   ├── Header.tsx    # Navegación principal
│       │   └── GiscusComments.tsx  # Widget de comentarios
│       ├── pages/            # Páginas de la aplicación
│       │   ├── Home.tsx      # Grid de posts
│       │   ├── PostDetail.tsx # Vista individual de post
│       │   └── CreatePost.tsx # Formulario de creación
│       ├── lib/              # Utilidades
│       │   └── trpc.ts       # Cliente tRPC
│       └── index.css         # Estilos globales y tema
│
├── server/                    # Backend Node.js
│   ├── routers/              # Routers tRPC
│   │   ├── posts.ts          # CRUD de posts
│       │   └── attachments.ts # Gestión de archivos
│   ├── db.ts                 # Queries de base de datos
│   ├── routers.ts            # Router principal
│   └── *.test.ts             # Tests unitarios
│
├── drizzle/                   # Migraciones de BD
│   └── schema.ts             # Definición de tablas
│
├── DEPLOYMENT_GUIDE.md        # Guía de despliegue completa
├── GISCUS_CONFIG.md          # Configuración de Giscus
└── todo.md                   # Lista de tareas del proyecto
```

---

## 🛠️ Instalación y Desarrollo Local

### Prerrequisitos

- Node.js 18 o superior
- pnpm 8 o superior
- Git

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/orlandoblog.git
cd orlandoblog

# Instalar dependencias
pnpm install

# Configurar base de datos
pnpm db:push

# Iniciar servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

### Ejecutar Tests

```bash
# Ejecutar todos los tests
pnpm test

# Tests en modo watch
pnpm test --watch

# Coverage
pnpm test --coverage
```

---

## 📝 Uso Básico

### Crear un Post

1. Inicia sesión haciendo click en **Iniciar Sesión** en el header
2. Click en **Crear** en la navegación
3. Completa el formulario:
   - **Título**: Nombre descriptivo del post
   - **Resumen**: Breve descripción (opcional)
   - **Categoría**: Ej: "Inteligencia Artificial"
   - **Tags**: Separados por comas
   - **Imagen**: Sube una imagen destacada (máx 5MB)
   - **Archivos Adjuntos**: Documentos adicionales (máx 10MB c/u)
   - **Contenido**: Escribe tu contenido en Markdown
4. Click en **Publicar Post**

### Formato Markdown

El editor soporta Markdown estándar:

```markdown
# Título Principal
## Subtítulo

**Negrita** y *cursiva*

- Lista con viñetas
- Otro elemento

[Enlace](https://ejemplo.com)

`código inline`

```javascript
// Bloque de código
console.log("Hola mundo");
```

> Cita importante
```

### Comentar en Posts

1. Navega a cualquier post
2. Scroll hasta la sección de comentarios
3. Click en **Sign in with GitHub** (primera vez)
4. Escribe tu comentario usando Markdown
5. Click en **Comment**

Los comentarios se almacenan en GitHub Discussions y son moderables desde GitHub.

---

## 🚀 Despliegue en Producción

### Opción 1: Manus Platform (Recomendado)

Manus proporciona hosting gratuito con todas las funcionalidades necesarias:

1. El proyecto ya está configurado para Manus
2. Las variables de entorno se inyectan automáticamente
3. Click en **Publish** en el panel de Manus
4. Tu blog estará disponible en `https://tu-proyecto.manus.space`

**Ver [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) para instrucciones detalladas**

### Opción 2: Hosting Personalizado

Si prefieres usar tu propio servidor:

```bash
# Compilar para producción
pnpm build

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales

# Iniciar servidor
pnpm start
```

---

## 🔧 Configuración de Giscus

Para habilitar los comentarios, necesitas configurar Giscus:

1. Crea un repositorio público en GitHub
2. Habilita GitHub Discussions en el repositorio
3. Instala la app Giscus: https://github.com/apps/giscus
4. Ve a https://giscus.app y obtén tu configuración
5. Edita `client/src/components/GiscusComments.tsx` con tus credenciales

**Ver [GISCUS_CONFIG.md](./GISCUS_CONFIG.md) para instrucciones paso a paso**

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Guías de Estilo

- Usa TypeScript para todo el código nuevo
- Sigue las convenciones de Prettier (configurado automáticamente)
- Escribe tests para nuevas funcionalidades
- Documenta funciones públicas con JSDoc

---

## 📊 Roadmap

### v1.1 (Próximamente)
- [ ] Sistema de búsqueda de posts
- [ ] Filtros por categoría y tags
- [ ] Página de perfil de usuario
- [ ] Edición de posts desde la UI

### v1.2
- [ ] Sistema de likes/reacciones
- [ ] Posts destacados en homepage
- [ ] Modo oscuro/claro switchable
- [ ] Newsletter por email

### v2.0
- [ ] Editor WYSIWYG
- [ ] Colaboración en posts
- [ ] Analytics avanzados
- [ ] API pública para integraciones

---

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un issue en GitHub con:

- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Información del navegador/sistema

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Créditos

**Desarrollado por**: Manus AI  
**Inspirado en**: Instagram, Medium, Dev.to  
**Tecnologías**: React, Tailwind CSS, tRPC, Giscus

---

## 📞 Soporte

¿Necesitas ayuda? Contacta a través de:

- **Issues de GitHub**: Para bugs y feature requests
- **Soporte de Manus**: https://help.manus.im
- **Documentación de Giscus**: https://giscus.app

---

<div align="center">

**Hecho con ❤️ usando Manus AI**

[⬆ Volver arriba](#orlandoblog---blog-tecnológico-interactivo)

</div>
