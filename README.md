# NodeCracker - Portafolio de Ciberseguridad

Un portafolio web responsivo y accesible que muestra la experiencia de NodeCracker en soluciones tecnológicas seguras y desarrollo de cultura de seguridad.

## Características Principales

### Funcionalidad Básica
- **Sitio Web Multi-página**: Páginas de Inicio, Proyectos, Acerca de Nosotros, Contacto y Mapa de Calor
- **Muestra Dinámica de Proyectos**: Integración en tiempo real con la API de GitHub para mostrar proyectos del portafolio
- **Diseño Responsivo**: Optimizado para todos los dispositivos y tamaños de pantalla
- **Interfaz Moderna**: Diseño limpio y profesional con animaciones suaves

### Mapa de Calor con Seguimiento Visual
- **Seguimiento Visual en Tiempo Real**: Utiliza WebGazer.js para capturar la mirada del usuario desde la cámara
- **Visualización de Mapa de Calor**: Integra Heatmap.js para representar las zonas más observadas
- **Sistema de Calibración**: Permite calibrar el seguimiento visual para mayor precisión
- **Estadísticas en Tiempo Real**: Muestra puntos registrados, tiempo activo, precisión y zona más activa
- **Control de Seguimiento**: Botones para iniciar, detener y limpiar el mapa de calor
- **Interfaz Intuitiva**: Panel de control flotante con indicadores de estado visual

### Características de Accesibilidad (Cumple WCAG 2.1 AA)
- **HTML5 Semántico**: Uso correcto de `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **Navegación por Teclado**: Accesibilidad completa con indicadores de foco visibles
- **Soporte para Lectores de Pantalla**: Etiquetas ARIA, roles y descripciones en todo el sitio
- **Enlaces de Salto**: Enlace "Saltar al contenido principal" para usuarios de teclado
- **Alto Contraste**: Estilos de foco mejorados y ratios de contraste de color
- **Accesibilidad de Formularios**: Etiquetas apropiadas, manejo de errores y retroalimentación de validación
- **Reducción de Movimiento**: Respeta las preferencias del usuario para movimiento reducido
- **Soporte para Modo Oscuro**: Detección automática y estilos para modo oscuro
- **Estilos de Impresión**: Experiencia de impresión optimizada

## Tecnologías Utilizadas

- **HTML5**: Marcado semántico con características de accesibilidad
- **CSS3**: Estilos modernos con consideraciones de accesibilidad
- **Bootstrap 5**: Framework responsivo con mejoras de accesibilidad personalizadas
- **JavaScript**: Características interactivas e integración con API de GitHub
- **Font Awesome**: Biblioteca de iconos accesible
- **API de GitHub**: Carga dinámica de proyectos
- **WebGazer.js**: Seguimiento visual y eye tracking
- **Heatmap.js**: Visualización de mapas de calor

## Estructura del Proyecto

```
FigmaDesing/
├── index.html          # Página de inicio con sección hero
├── services.html       # Muestra de proyectos con API de GitHub
├── about.html          # Información del equipo y misión
├── contact.html        # Formulario de contacto con validación
├── heatmap.html        # Página de mapa de calor con seguimiento visual
├── heatmap.js          # Lógica del mapa de calor con WebGazer.js y Heatmap.js
├── styles.css          # Hoja de estilos principal con características de accesibilidad
├── github-api.js       # Integración con API de GitHub
├── assets/             # Imágenes y logos
│   ├── me_image.png
│   ├── s_logo_w.png
│   ├── sc_logo_b.png
│   └── sc_logo_w.png
└── README.md           # Documentación del proyecto
```

## Implementación de Accesibilidad

### Semántica HTML
- Jerarquía correcta de encabezados (H1-H6)
- Puntos de referencia semánticos (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Etiquetas ARIA y roles para elementos interactivos
- Texto alternativo descriptivo para todas las imágenes
- Asociaciones de etiquetas y errores en formularios

## Implementación del Mapa de Calor

### Arquitectura Técnica

#### Componentes Principales
- **WebGazer.js**: Biblioteca de eye tracking que utiliza machine learning para predecir la posición de la mirada
- **Heatmap.js**: Biblioteca para crear visualizaciones de mapas de calor interactivos
- **HeatmapTracker Class**: Clase JavaScript personalizada que coordina ambas librerías

#### Flujo de Datos
1. **Captura de Video**: WebGazer.js accede a la cámara web del usuario
2. **Procesamiento de Imagen**: Analiza los frames de video para detectar ojos y pupilas
3. **Predicción de Mirada**: Utiliza modelos de ML para estimar dónde mira el usuario
4. **Filtrado de Datos**: Se filtran puntos con baja confianza (< 30%)
5. **Visualización**: Heatmap.js renderiza los puntos como un mapa de calor

#### Características de Implementación

##### Seguimiento Visual
- **Frecuencia de muestreo**: Captura continua de puntos de mirada
- **Filtrado de ruido**: Elimina puntos con baja confianza
- **Coordenadas normalizadas**: Convierte coordenadas de WebGazer a coordenadas de pantalla
- **Gestión de eventos**: Maneja eventos de redimensionamiento y visibilidad de página

##### Sistema de Calibración
- **5 puntos de calibración**: Esquinas y centro de la pantalla
- **Interfaz visual**: Puntos rojos que aparecen secuencialmente
- **Validación de clics**: Verifica que el usuario haga clic en el área correcta
- **Mejora de precisión**: Los datos de calibración mejoran la precisión del seguimiento

##### Visualización del Mapa de Calor
- **Gradiente de colores**: Azul (frío) → Verde → Amarillo → Naranja → Rojo (caliente)
- **Radio configurable**: 50px por defecto para cada punto
- **Opacidad dinámica**: Varía según la intensidad de la actividad
- **Efecto de desenfoque**: 0.75 para suavizar la visualización

##### Estadísticas en Tiempo Real
- **Contador de puntos**: Número total de puntos registrados
- **Temporizador**: Tiempo transcurrido desde el inicio
- **Precisión promedio**: Confianza media de todas las predicciones
- **Análisis de zonas**: Identifica el cuadrante más observado

#### Consideraciones de Rendimiento
- **Optimización de memoria**: Limpieza automática de datos antiguos
- **Gestión de recursos**: Pausa automática cuando la página no está visible
- **Responsive design**: Adaptación a diferentes tamaños de pantalla
- **Fallbacks**: Manejo de errores cuando las librerías no están disponibles

#### Seguridad y Privacidad
- **Procesamiento local**: Todos los datos se procesan en el navegador
- **Sin almacenamiento**: No se guardan datos en servidores externos
- **Permisos explícitos**: Requiere consentimiento del usuario para acceder a la cámara
- **Transparencia**: Información clara sobre qué datos se recopilan

### Navegación por Teclado
- Navegación con Tab a través de todos los elementos interactivos
- Indicadores de foco visibles con alto contraste
- Enlace para saltar al contenido principal (atajo Ctrl+M)
- Navegación con teclas de flecha para componentes de carrusel
- Soporte para tecla Enter en envío de formularios

### Soporte para Lectores de Pantalla
- Regiones ARIA en vivo para contenido dinámico
- Semántica de lista apropiada (`role="list"`, `role="listitem"`)
- Texto descriptivo en enlaces (evita "haz clic aquí")
- Instrucciones de campos de formulario y anuncios de errores
- Indicadores de página actual (`aria-current="page"`)

### Accesibilidad Visual
- Esquemas de color de alto contraste
- Tamaño de texto y espaciado suficientes
- Jerarquía visual clara
- Indicadores de foco visibles en todos los elementos interactivos
- Soporte para movimiento reducido para usuarios con trastornos vestibulares

### Accesibilidad de Formularios
- Asociaciones de etiquetas apropiadas
- Indicadores de campos requeridos
- Validación en tiempo real con mensajes de error
- Anuncios de éxito/error para lectores de pantalla
- Navegación por teclado amigable en formularios

## Características de Diseño

### Diseño Responsivo
- Enfoque mobile-first
- Sistema de cuadrícula flexible
- Escalado de tipografía optimizado
- Elementos de interfaz táctiles

### Diseño Visual
- Fondos con gradientes modernos
- Animaciones suaves al pasar el cursor
- Esquema de colores profesional
- Espaciado y tipografía consistentes

### Elementos Interactivos
- Efectos hover en tarjetas y botones
- Navegación con desplazamiento suave
- Funcionalidad de carrusel para proyectos
- Validación de formularios con retroalimentación visual

## Configuración e Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone [url-del-repositorio]
   cd FigmaDesing
   ```

2. **Abrir en navegador**:
   - Simplemente abre `index.html` en cualquier navegador web moderno
   - No se requiere proceso de construcción - HTML, CSS y JavaScript puros

3. **Desarrollo local**:
   - Usa un servidor local para mejor experiencia
   - Recomendado: Extensión Live Server en VS Code

## Uso del Mapa de Calor

### Requisitos Previos
- **Navegador compatible**: Chrome, Firefox, Safari o Edge (última versión)
- **Cámara web**: Requerida para el seguimiento visual
- **Permisos de cámara**: El navegador debe permitir acceso a la cámara
- **Conexión a internet**: Para cargar las librerías WebGazer.js y Heatmap.js

### Instrucciones de Uso

1. **Acceder al Mapa de Calor**:
   - Navega a la página "Mapa de Calor" desde el menú principal
   - La página se encuentra en `heatmap.html`

2. **Iniciar el Seguimiento**:
   - Haz clic en "Iniciar Seguimiento"
   - Permite el acceso a la cámara cuando el navegador lo solicite
   - El sistema comenzará a registrar tu mirada

3. **Calibración (Opcional)**:
   - Haz clic en "Calibrar" para mejorar la precisión
   - Sigue las instrucciones en pantalla
   - Haz clic en cada punto rojo que aparezca

4. **Navegar y Observar**:
   - Mueve tu mirada por la página
   - El sistema registrará automáticamente los puntos donde miras
   - Observa las estadísticas en tiempo real

5. **Detener y Ver Resultados**:
   - Haz clic en "Detener Seguimiento"
   - Se mostrará un resumen de los resultados
   - El mapa de calor permanecerá visible

6. **Limpiar y Reiniciar**:
   - Usa "Limpiar Mapa" para borrar los datos
   - Puedes reiniciar el seguimiento en cualquier momento

### Características del Panel de Control

- **Indicador de Estado**: Muestra si el seguimiento está activo o inactivo
- **Botón Iniciar**: Comienza el seguimiento visual
- **Botón Detener**: Pausa el seguimiento y muestra resultados
- **Botón Calibrar**: Mejora la precisión del seguimiento
- **Botón Limpiar**: Borra todos los datos del mapa

### Panel de Estadísticas

- **Puntos registrados**: Número total de puntos de mirada capturados
- **Tiempo activo**: Duración del seguimiento en formato MM:SS
- **Precisión**: Porcentaje promedio de confianza del seguimiento
- **Zona más activa**: Cuadrante de la pantalla más observado

### Consideraciones Importantes

- **Privacidad**: Los datos se procesan localmente y no se envían a servidores externos
- **Precisión**: La precisión depende de la iluminación, posición de la cámara y calibración
- **Rendimiento**: El seguimiento puede consumir recursos del sistema
- **Compatibilidad**: Funciona mejor en navegadores modernos con soporte para WebRTC

## Soporte de Navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)
- Navegadores móviles (iOS Safari, Chrome Mobile)

## Pruebas de Accesibilidad

### Pruebas Manuales
- **Navegación por Teclado**: Navega con Tab por todos los elementos interactivos
- **Lector de Pantalla**: Prueba con NVDA, JAWS o VoiceOver
- **Contraste de Color**: Verifica ratios de contraste suficientes
- **Indicadores de Foco**: Asegura foco visible en todos los elementos

### Pruebas Automatizadas
- **Lighthouse**: Ejecuta auditoría de accesibilidad
- **axe DevTools**: Extensión de navegador para pruebas de accesibilidad
- **WAVE**: Herramienta de evaluación de accesibilidad web

### Atajos de Teclado
- **Tab**: Navegar por elementos interactivos
- **Enter/Espacio**: Activar botones y enlaces
- **Ctrl+M**: Saltar al contenido principal
- **Teclas de Flecha**: Navegar carrusel (en página de proyectos)

## Requerimientos de Accesibilidad Implementados

### Uso Correcto de Etiquetas Semánticas HTML5
- Implementadas etiquetas `<header>`, `<nav>`, `<main>`, `<footer>` en todas las páginas
- Estructura semántica correcta con secciones apropiadas
- Jerarquía de encabezados H1-H6 respetada

### Contraste Adecuado entre Texto y Fondo
- Ratios de contraste que cumplen WCAG 2.1 AA (4.5:1 para texto normal, 3:1 para texto grande)
- Colores de texto optimizados para modo claro y oscuro
- Indicadores de foco con alto contraste

### Atributos Alt Descriptivos en Todas las Imágenes
- Texto alternativo descriptivo para todas las imágenes
- Incluye información contextual relevante
- Imágenes decorativas marcadas con `aria-hidden="true"`

### Etiquetas de Formulario Apropiadas
- Etiquetas `<label>` asociadas correctamente con campos de formulario
- Indicadores de campos requeridos con asteriscos
- Mensajes de error asociados con campos específicos

### Navegación con Teclado Funcional
- Navegación completa con teclado (Tab, Enter, Espacio)
- Enlace "Saltar al contenido principal" para usuarios de teclado
- Atajo de teclado Ctrl+M para acceso rápido al contenido principal
- Navegación con flechas en componentes de carrusel

### Jerarquía Explícita en Títulos
- Estructura de encabezados H1-H6 implementada correctamente
- Un solo H1 por página
- Jerarquía lógica y semántica

### Descripción Clara en Enlaces y Botones
- Texto descriptivo en todos los enlaces (evita "haz clic aquí")
- Etiquetas ARIA apropiadas para botones
- Contexto claro sobre la función de cada enlace

### Criterios de Legibilidad y Comprensión
- Texto claro y comprensible
- Estructura de contenido lógica
- Información organizada de manera accesible
- Soporte para diferentes niveles de comprensión

## Modo Oscuro

El sitio incluye soporte completo para modo oscuro con:
- Detección automática de preferencias del sistema
- Contraste optimizado para texto y elementos interactivos
- Fondos oscuros apropiados para todas las secciones
- Colores de acento mantenidos para consistencia de marca

## Estilos de Impresión

Optimizados para impresión con:
- Eliminación de elementos de navegación innecesarios
- Contraste mejorado para impresión en blanco y negro
- URLs visibles para enlaces externos
- Estructura de contenido simplificada

## Demo en Vivo

Visita el sitio web en vivo: [Portafolio NodeCracker](https://n0d3tr4ck3r.github.io/FigmaDesignWeb/)

### Ubicación del Mapa de Calor

El mapa de calor se encuentra implementado en la página `heatmap.html` y es accesible desde el menú de navegación principal de todas las páginas del sitio. La implementación incluye:

- **Página dedicada**: `heatmap.html` - Página completa con interfaz de mapa de calor
- **Lógica JavaScript**: `heatmap.js` - Clase HeatmapTracker con toda la funcionalidad
- **Integración**: Enlaces en la navegación de todas las páginas existentes
- **Documentación**: Instrucciones detalladas en esta sección del README

La implementación está diseñada para ser completamente funcional y lista para usar, requiriendo solo permisos de cámara del usuario para comenzar el seguimiento visual.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## Contribuir

1. Haz fork del repositorio
2. Crea una rama de características
3. Realiza tus cambios considerando la accesibilidad
4. Prueba con navegación por teclado y lectores de pantalla
5. Envía un pull request

## Contacto

- **Email**: info@nodecracker.com
- **Teléfono**: +1 (555) 123-4567
- **Sitio Web**: [NodeCracker](https://nodecracker.com)

---

**Construido con accesibilidad en mente** 