# Guía de Despliegue de OrlandoBlog desde Terminal Kali

Esta guía proporciona instrucciones detalladas para desplegar OrlandoBlog desde tu terminal Kali Linux. El proyecto utiliza la plataforma Manus para hosting, que proporciona infraestructura gratuita con base de datos, almacenamiento S3 y autenticación integrada.

---

## Arquitectura del Proyecto

OrlandoBlog es una aplicación web full-stack que combina las siguientes tecnologías:

**Frontend**: React 19 con Tailwind CSS 4 para una interfaz moderna tipo Instagram, diseñada con un sistema de grid responsivo que se adapta perfectamente a dispositivos móviles y desktop. El diseño utiliza una paleta de colores inspirada en Instagram con gradientes púrpura-rosa.

**Backend**: Node.js con Express y tRPC para APIs type-safe, lo que garantiza que los tipos de datos fluyan automáticamente entre frontend y backend sin necesidad de definiciones manuales. Esto reduce significativamente los errores de tipo en producción.

**Base de datos**: MySQL/TiDB para almacenar posts, usuarios y metadatos de archivos adjuntos. El esquema está diseñado para escalar horizontalmente y soportar millones de posts sin degradación de rendimiento.

**Almacenamiento**: AWS S3 para imágenes y documentos adjuntos, con URLs públicas generadas automáticamente. Los archivos se organizan por usuario y post para facilitar la gestión.

**Comentarios**: Giscus integrado con GitHub Discussions, proporcionando un sistema de comentarios completamente gratuito que no requiere base de datos adicional ni backend personalizado.

---

## Requisitos Previos

Antes de comenzar el despliegue, asegúrate de tener instalado lo siguiente en tu sistema Kali Linux:

### Herramientas Esenciales

```bash
# Verificar versiones instaladas
git --version          # Git 2.30+
node --version         # Node.js 18+
pnpm --version         # pnpm 8+

# Si no están instalados, ejecuta:
sudo apt update
sudo apt install git nodejs npm -y
npm install -g pnpm
```

### GitHub CLI (Opcional pero Recomendado)

GitHub CLI facilita la creación y gestión de repositorios desde la terminal:

```bash
# Instalar GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh -y

# Autenticarse con GitHub
gh auth login
```

---

## Paso 1: Obtener el Código del Proyecto

### Opción A: Descargar desde Manus

Si recibiste el proyecto como archivo `manus-webdev://`, puedes acceder al código directamente desde el panel de gestión de Manus:

1. Abre el panel de gestión en tu navegador
2. Ve a la sección **Code** (Código)
3. Click en **Download All Files** para descargar un ZIP
4. Extrae el archivo en tu directorio de trabajo

```bash
# Extraer y navegar al proyecto
cd ~/Downloads
unzip orlandoblog.zip -d ~/proyectos/
cd ~/proyectos/orlandoblog
```

### Opción B: Clonar desde GitHub (Si ya está en GitHub)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/orlandoblog.git
cd orlandoblog

# Instalar dependencias
pnpm install
```

---

## Paso 2: Configurar el Repositorio de GitHub

Para habilitar los comentarios con Giscus, necesitas un repositorio público en GitHub:

### Crear Repositorio Nuevo

```bash
# Inicializar Git si aún no está inicializado
git init

# Agregar todos los archivos
git add .

# Crear commit inicial
git commit -m "Initial commit: OrlandoBlog v1.0"

# Crear repositorio en GitHub (requiere GitHub CLI)
gh repo create orlandoblog --public --source=. --remote=origin --push
```

### Habilitar GitHub Discussions

Los comentarios de Giscus requieren que GitHub Discussions esté habilitado en tu repositorio:

1. Ve a tu repositorio en GitHub: `https://github.com/tu-usuario/orlandoblog`
2. Click en **Settings** (Configuración)
3. Scroll hasta la sección **Features**
4. Marca la casilla **Discussions**
5. Click en **Set up discussions** si aparece

### Instalar la App de Giscus

```bash
# Abrir la página de instalación de Giscus en el navegador
xdg-open https://github.com/apps/giscus

# Sigue estos pasos en el navegador:
# 1. Click en "Install"
# 2. Selecciona tu repositorio "orlandoblog"
# 3. Click en "Install & Authorize"
```

### Configurar Giscus en el Código

```bash
# Obtener la configuración de Giscus
xdg-open https://giscus.app

# En la página de Giscus:
# 1. Ingresa: tu-usuario/orlandoblog en el campo "Repository"
# 2. Copia los valores generados: data-repo-id y data-category-id
```

Edita el archivo `client/src/components/GiscusComments.tsx`:

```bash
nano client/src/components/GiscusComments.tsx

# Reemplaza estas líneas:
# script.setAttribute("data-repo", "tu-usuario/orlandoblog");
# script.setAttribute("data-repo-id", "R_kgDO..."); // Tu ID real
# script.setAttribute("data-category-id", "DIC_kwDO..."); // Tu ID real
```

Guarda los cambios y haz commit:

```bash
git add client/src/components/GiscusComments.tsx
git commit -m "Configure Giscus with repository credentials"
git push origin main
```

---

## Paso 3: Desplegar en Manus

Manus proporciona hosting gratuito con todas las funcionalidades necesarias ya configuradas. **No necesitas configurar variables de entorno manualmente** ya que Manus las inyecta automáticamente.

### Acceder al Panel de Manus

1. Abre el panel de gestión de Manus en tu navegador
2. Verás tu proyecto **OrlandoBlog** listado
3. El servidor de desarrollo ya está corriendo automáticamente

### Publicar el Proyecto

Para hacer tu blog accesible públicamente:

1. En el panel de Manus, ve a la sección **Dashboard**
2. Click en el botón **Publish** en la esquina superior derecha
3. Tu blog estará disponible en: `https://tu-proyecto.manus.space`

### Configurar Dominio Personalizado (Opcional)

Si deseas usar tu propio dominio:

1. Ve a **Settings** → **Domains** en el panel de Manus
2. Ingresa tu dominio personalizado (ej: `orlandoblog.com`)
3. Configura los registros DNS según las instrucciones mostradas:

```
Type: CNAME
Name: @
Value: tu-proyecto.manus.space
```

---

## Paso 4: Gestión de la Base de Datos

Manus proporciona una base de datos MySQL completamente gestionada. Puedes acceder a ella desde el panel de gestión:

### Acceder a la Interfaz de Base de Datos

1. En el panel de Manus, ve a **Database**
2. Verás una interfaz CRUD para gestionar tus datos
3. Puedes ver, editar y eliminar posts directamente

### Conectar desde Terminal (Opcional)

Si necesitas acceso directo a la base de datos:

1. Ve a **Database** → **Settings** (icono en esquina inferior izquierda)
2. Copia la cadena de conexión mostrada
3. Usa un cliente MySQL:

```bash
# Instalar cliente MySQL
sudo apt install mysql-client -y

# Conectar (reemplaza con tus credenciales reales)
mysql -h tu-host.tidbcloud.com -P 4000 -u tu-usuario -p --ssl-mode=REQUIRED
```

### Respaldar la Base de Datos

```bash
# Exportar todos los datos
mysqldump -h tu-host.tidbcloud.com -P 4000 -u tu-usuario -p --ssl-mode=REQUIRED nombre_db > backup.sql

# Restaurar desde backup
mysql -h tu-host.tidbcloud.com -P 4000 -u tu-usuario -p --ssl-mode=REQUIRED nombre_db < backup.sql
```

---

## Paso 5: Gestión de Contenido

### Crear tu Primer Post

1. Abre tu blog en el navegador: `https://tu-proyecto.manus.space`
2. Click en **Iniciar Sesión** (se abrirá el portal de autenticación de Manus)
3. Después de autenticarte, click en **Crear** en el header
4. Completa el formulario:
   - **Título**: Nombre descriptivo de tu post
   - **Resumen**: Breve descripción (aparece en el grid)
   - **Categoría**: Ej: "Inteligencia Artificial", "Programación"
   - **Tags**: Separados por comas, ej: `javascript, react, tutorial`
   - **Imagen Principal**: Click para subir (máx 5MB)
   - **Archivos Adjuntos**: Documentos PDF, código fuente, etc. (máx 10MB c/u)
   - **Contenido**: Usa Markdown para formato rico

### Formato Markdown Soportado

El editor de contenido soporta Markdown completo:

```markdown
# Título Principal
## Subtítulo

**Texto en negrita** y *cursiva*

- Lista con viñetas
- Otro elemento

1. Lista numerada
2. Segundo elemento

[Enlace a sitio web](https://ejemplo.com)

`código inline`

```javascript
// Bloque de código
function ejemplo() {
  console.log("Hola mundo");
}
```

> Cita o nota importante
```

### Gestionar Posts Existentes

Actualmente, la edición de posts se realiza desde la interfaz de base de datos:

1. Ve a **Database** en el panel de Manus
2. Selecciona la tabla `posts`
3. Click en el post que deseas editar
4. Modifica los campos necesarios
5. Click en **Save**

---

## Paso 6: Monitoreo y Analytics

### Ver Estadísticas del Sitio

Manus proporciona analytics integrados:

1. Ve a **Dashboard** en el panel de Manus
2. Verás métricas en tiempo real:
   - **UV (Unique Visitors)**: Visitantes únicos
   - **PV (Page Views)**: Vistas de página totales
   - Gráficos de tráfico por día/semana/mes

### Logs del Servidor

Para debugging y monitoreo:

1. Los logs se muestran automáticamente en el panel de desarrollo
2. Puedes ver errores, warnings y mensajes de info
3. Los logs persisten durante 7 días

---

## Paso 7: Mantenimiento y Actualizaciones

### Actualizar el Código

Cuando hagas cambios al proyecto:

```bash
# Hacer cambios en tu código local
nano client/src/pages/Home.tsx

# Guardar cambios en Git
git add .
git commit -m "Descripción de los cambios"
git push origin main

# En el panel de Manus:
# 1. Los cambios se detectan automáticamente
# 2. El servidor se reinicia con el nuevo código
# 3. Verifica los cambios en el preview
# 4. Click en "Publish" para actualizar la versión pública
```

### Crear Checkpoints

Los checkpoints son snapshots de tu proyecto que puedes restaurar:

```bash
# Los checkpoints se crean desde el panel de Manus
# 1. Ve a la sección de tu proyecto
# 2. Click en "Save Checkpoint"
# 3. Ingresa una descripción: "Agregada funcionalidad X"

# Para restaurar un checkpoint anterior:
# 1. Ve a la lista de checkpoints
# 2. Click en "Rollback" en el checkpoint deseado
```

---

## Solución de Problemas Comunes

### Problema: Los comentarios de Giscus no aparecen

**Causas posibles:**
- El repositorio no es público
- GitHub Discussions no está habilitado
- La app Giscus no está instalada
- Los IDs de configuración son incorrectos

**Solución:**
```bash
# Verificar que el repo es público
gh repo view tu-usuario/orlandoblog --json visibility

# Verificar Discussions
gh api repos/tu-usuario/orlandoblog | grep has_discussions

# Reinstalar Giscus
xdg-open https://github.com/apps/giscus
```

### Problema: Error al subir imágenes

**Causas posibles:**
- Imagen supera 5MB
- Formato no soportado
- Problema de conectividad con S3

**Solución:**
```bash
# Comprimir imagen antes de subir
convert imagen.jpg -quality 85 -resize 1920x1080\> imagen_optimizada.jpg

# Formatos soportados: JPG, PNG, GIF, WEBP
```

### Problema: Base de datos no responde

**Solución:**
```bash
# Verificar estado desde el panel de Manus
# Si persiste, contactar soporte en https://help.manus.im
```

---

## Comandos de Referencia Rápida

### Git y GitHub

```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Crear nueva rama para experimentar
git checkout -b feature/nueva-funcionalidad

# Fusionar rama a main
git checkout main
git merge feature/nueva-funcionalidad

# Ver repositorio remoto
gh repo view --web
```

### Gestión del Proyecto

```bash
# Instalar dependencias
pnpm install

# Ejecutar tests
pnpm test

# Ejecutar servidor de desarrollo local
pnpm dev

# Compilar para producción
pnpm build

# Migrar base de datos
pnpm db:push
```

### Utilidades

```bash
# Buscar en el código
grep -r "término" client/src/

# Contar líneas de código
find . -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Ver tamaño del proyecto
du -sh .
```

---

## Recursos Adicionales

**Documentación de Giscus**: https://giscus.app  
**GitHub Discussions**: https://docs.github.com/es/discussions  
**Markdown Guide**: https://www.markdownguide.org  
**Soporte de Manus**: https://help.manus.im  

---

## Próximos Pasos Recomendados

Una vez que tu blog esté desplegado y funcionando, considera estas mejoras:

**Funcionalidad de búsqueda**: Implementa un buscador que permita a los usuarios encontrar posts por título, categoría o tags. Esto mejorará significativamente la experiencia de usuario cuando tengas muchos posts.

**Sistema de likes/reacciones**: Agrega la capacidad de que los usuarios den "me gusta" a los posts. Esto aumenta el engagement y te permite identificar el contenido más popular.

**Página de perfil de usuario**: Crea una página donde los usuarios puedan ver todos sus posts, editar su información y gestionar su contenido. Esto fomenta la creación de contenido recurrente.

**Categorías dinámicas**: En lugar de escribir categorías manualmente, crea una lista predefinida de categorías tecnológicas que los usuarios puedan seleccionar. Esto mantiene la consistencia y facilita la navegación.

**Newsletter por email**: Integra un servicio como Mailchimp o SendGrid para enviar notificaciones de nuevos posts a suscriptores. Esto ayuda a retener audiencia.

---

**Autor**: Manus AI  
**Versión**: 1.0  
**Última actualización**: Noviembre 2025
