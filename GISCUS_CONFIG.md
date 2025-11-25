# Configuración de Giscus para OrlandoBlog

Giscus es un sistema de comentarios basado en GitHub Discussions que permite a los usuarios comentar en tus posts usando su cuenta de GitHub.

## Pasos para Configurar Giscus

### 1. Preparar tu Repositorio de GitHub

1. **Crea un repositorio público en GitHub** (si aún no lo has hecho):
   ```bash
   # Desde tu terminal Kali
   cd /ruta/a/orlandoblog
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create orlandoblog --public --source=. --remote=origin --push
   ```

2. **Habilita GitHub Discussions** en tu repositorio:
   - Ve a tu repositorio en GitHub
   - Click en **Settings** (Configuración)
   - Scroll hasta la sección **Features**
   - Marca la casilla **Discussions**

### 2. Instalar la App de Giscus

1. Ve a https://github.com/apps/giscus
2. Click en **Install**
3. Selecciona tu repositorio `orlandoblog`
4. Autoriza la aplicación

### 3. Obtener tus Credenciales de Giscus

1. Ve a https://giscus.app
2. En la sección **Configuration**, ingresa:
   - **Repository**: `tu-usuario/orlandoblog`
3. Giscus generará automáticamente:
   - `data-repo-id`
   - `data-category-id`

### 4. Actualizar el Código

Edita el archivo `client/src/components/GiscusComments.tsx`:

```typescript
// Reemplaza estas líneas:
script.setAttribute("data-repo", "tu-usuario/orlandoblog");
script.setAttribute("data-repo-id", "TU_REPO_ID_AQUI");
script.setAttribute("data-category-id", "TU_CATEGORY_ID_AQUI");
```

**Valores que necesitas obtener de https://giscus.app:**
- `data-repo`: Tu usuario de GitHub + `/orlandoblog`
- `data-repo-id`: ID generado por Giscus
- `data-category-id`: ID de la categoría (por defecto "General")

### 5. Ejemplo de Configuración Completa

```typescript
script.setAttribute("data-repo", "orlando/orlandoblog");
script.setAttribute("data-repo-id", "R_kgDOL1234567");
script.setAttribute("data-category", "General");
script.setAttribute("data-category-id", "DIC_kwDOL1234567");
```

## Características de Giscus

✅ **Completamente gratuito** - Sin límites ni costos  
✅ **Sin base de datos** - Todo se almacena en GitHub Discussions  
✅ **Moderación fácil** - Gestiona comentarios desde GitHub  
✅ **Autenticación segura** - Usa OAuth de GitHub  
✅ **Reacciones** - Los usuarios pueden reaccionar con emojis  
✅ **Markdown** - Soporte completo para formato Markdown  
✅ **Notificaciones** - Recibe notificaciones en GitHub cuando hay comentarios  

## Personalización Adicional

Puedes personalizar Giscus editando los atributos en `GiscusComments.tsx`:

- `data-theme`: Cambia entre `light`, `dark`, `preferred_color_scheme`
- `data-lang`: Idioma de la interfaz (actualmente configurado en `es`)
- `data-reactions-enabled`: Habilita/deshabilita reacciones
- `data-input-position`: Posición del cuadro de comentarios (`top` o `bottom`)

## Solución de Problemas

**Problema**: Los comentarios no aparecen  
**Solución**: Verifica que:
- El repositorio sea público
- GitHub Discussions esté habilitado
- La app Giscus esté instalada
- Los IDs sean correctos

**Problema**: Error de autenticación  
**Solución**: Asegúrate de que la app Giscus tenga permisos en tu repositorio

## Recursos

- Documentación oficial: https://giscus.app
- GitHub Discussions: https://docs.github.com/es/discussions
- Repositorio de Giscus: https://github.com/giscus/giscus
