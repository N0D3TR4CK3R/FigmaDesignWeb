# 🚀 Guía de Instalación - Proyecto NodeCracker con Mapa de Calor

## 📋 Requisitos Previos

### 1. Node.js y npm
- **Node.js**: Versión 14.0.0 o superior
- **npm**: Versión 6.0.0 o superior

### 2. Navegador Web
- Chrome (recomendado)
- Firefox
- Safari
- Edge

### 3. Cámara Web
- Requerida para el funcionamiento del mapa de calor

## 🔧 Instalación de Node.js

### Windows
1. Ve a https://nodejs.org/
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador
4. Marca la opción "Add to PATH"
5. Reinicia tu terminal

### Verificar Instalación
```bash
node --version
npm --version
```

## 📦 Instalación de Dependencias del Proyecto

### 1. Navegar al directorio del proyecto
```bash
cd C:\Users\mateo\Documents\FigmaWebDesign\FigmaDesignWeb
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Verificar instalación
```bash
npm list
```

## 🚀 Comandos para Ejecutar el Proyecto

### Opción 1: Usando npm scripts (Recomendado)
```bash
# Iniciar servidor y abrir mapa de calor automáticamente
npm start

# Iniciar servidor de desarrollo
npm run dev

# Iniciar servidor HTTP simple
npm run serve
```

### Opción 2: Usando Python (Alternativa)
```bash
# Si tienes Python instalado
python -m http.server 8000

# O con Python 3
python3 -m http.server 8000
```

### Opción 3: Usando Node.js directamente
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar servidor
http-server -p 8000
```

## 🌐 Acceso al Proyecto

Una vez que el servidor esté ejecutándose:

- **Página Principal**: http://localhost:8000
- **Mapa de Calor**: http://localhost:8000/heatmap.html
- **Mis Proyectos**: http://localhost:8000/services.html
- **Acerca de**: http://localhost:8000/about.html
- **Contacto**: http://localhost:8000/contact.html

## 🔥 Uso del Mapa de Calor

1. **Acceder**: Ve a http://localhost:8000/heatmap.html
2. **Iniciar**: Haz clic en "Iniciar Seguimiento"
3. **Permitir cámara**: Acepta los permisos del navegador
4. **Calibrar** (opcional): Haz clic en "Calibrar" para mejor precisión
5. **Navegar**: Mueve tu mirada por la página
6. **Detener**: Haz clic en "Detener Seguimiento" para ver resultados

## 🛠️ Solución de Problemas

### Error: "node no se reconoce como comando"
- Reinstala Node.js y asegúrate de marcar "Add to PATH"
- Reinicia tu terminal después de la instalación

### Error: "npm no se reconoce como comando"
- Verifica que npm se instaló con Node.js
- Ejecuta: `npm --version`

### Error: "Puerto 8000 en uso"
- Cambia el puerto en el comando:
  ```bash
  npm run dev -- --port=8080
  ```

### Error: "No se puede acceder a la cámara"
- Verifica que tu navegador tenga permisos de cámara
- Asegúrate de que no haya otras aplicaciones usando la cámara
- Prueba en modo incógnito

### Error: "WebGazer.js no se pudo cargar"
- Verifica tu conexión a internet
- Las librerías se cargan desde CDN externos

## 📁 Estructura del Proyecto

```
FigmaDesignWeb/
├── index.html          # Página principal
├── heatmap.html        # Página del mapa de calor
├── heatmap.js          # Lógica del mapa de calor
├── services.html       # Página de proyectos
├── about.html          # Página acerca de
├── contact.html        # Página de contacto
├── styles.css          # Estilos CSS
├── github-api.js       # API de GitHub
├── package.json        # Configuración de npm
├── package-lock.json   # Dependencias bloqueadas
├── README.md           # Documentación principal
├── INSTALACION.md      # Esta guía
└── assets/             # Imágenes y recursos
    ├── me_image.png
    ├── s_logo_w.png
    ├── sc_logo_b.png
    └── sc_logo_w.png
```

## 🔗 Enlaces Útiles

- **Node.js**: https://nodejs.org/
- **WebGazer.js**: https://webgazer.cs.brown.edu/
- **Heatmap.js**: https://www.patrick-wied.at/static/heatmapjs/
- **Bootstrap**: https://getbootstrap.com/

## 📞 Soporte

Si tienes problemas con la instalación o el funcionamiento:

1. Verifica que todos los requisitos estén instalados
2. Revisa la consola del navegador para errores
3. Asegúrate de que el servidor esté ejecutándose correctamente
4. Prueba con diferentes navegadores

---

**¡Disfruta explorando el mapa de calor con seguimiento visual!** 🎯 