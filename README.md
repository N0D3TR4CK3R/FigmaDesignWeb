# NodeCracker - Portafolio de Ciberseguridad

Un portafolio web responsivo y accesible que muestra la experiencia de NodeCracker en soluciones tecnológicas seguras y desarrollo de cultura de seguridad.

## Características Principales

### Funcionalidad Básica
- **Sitio Web Multi-página**: Páginas de Inicio, Proyectos, Acerca de Nosotros y Contacto
- **Muestra Dinámica de Proyectos**: Integración en tiempo real con la API de GitHub para mostrar proyectos del portafolio
- **Diseño Responsivo**: Optimizado para todos los dispositivos y tamaños de pantalla
- **Interfaz Moderna**: Diseño limpio y profesional con animaciones suaves

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

## Estructura del Proyecto

```
FigmaDesing/
├── index.html          # Página de inicio con sección hero
├── services.html       # Muestra de proyectos con API de GitHub
├── about.html          # Información del equipo y misión
├── contact.html        # Formulario de contacto con validación
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