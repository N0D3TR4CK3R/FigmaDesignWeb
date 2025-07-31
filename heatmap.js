// Heatmap.js - Implementación de mapa de calor con WebGazer.js
class HeatmapTracker {
    constructor() {
        this.isTracking = false;
        this.heatmapInstance = null;
        this.startTime = null;
        this.trackingInterval = null;
        this.points = [];
        this.calibrationPoints = [
            { x: 0.1, y: 0.15 },   // Superior izquierdo
            { x: 0.5, y: 0.15 },   // Superior centro
            { x: 0.9, y: 0.15 },   // Superior derecho
            { x: 0.1, y: 0.5 },    // Centro izquierdo
            { x: 0.5, y: 0.5 },    // Centro
            { x: 0.9, y: 0.5 },    // Centro derecho
            { x: 0.1, y: 0.85 },   // Inferior izquierdo
            { x: 0.5, y: 0.85 },   // Inferior centro
            { x: 0.9, y: 0.85 }    // Inferior derecho
        ];
        this.currentCalibrationPoint = 0;
        this.isCalibrating = false;
        this.webgazerInitialized = false;
        this.gridSquares = [];
        this.calibrationDots = [];
        this.trackingArea = null;
        this.lastGazePoint = null; // Último punto de mirada registrado
        this.gazeTrackingInterval = null; // Intervalo para registrar puntos cada 0.2 segundos
        
        // Esperar a que las librerías se carguen
        this.waitForLibraries().then(() => {
            this.initializeElements();
            this.initializeHeatmap();
            this.createPongGrid();
            this.bindEvents();
            this.updateStatus();
            console.log('HeatmapTracker inicializado correctamente');
            
            // Ejecutar diagnóstico automático después de 2 segundos
            setTimeout(() => {
                this.diagnoseSystem();
            }, 2000);
            
        }).catch(error => {
            console.error('Error al cargar las librerías:', error);
            this.showError('Error al cargar las librerías necesarias. Verifica tu conexión a internet.');
        });
    }

    async waitForLibraries() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50; // 5 segundos máximo
            
            const checkLibraries = () => {
                attempts++;
                
                // Actualizar panel de debug
                this.updateDebugInfo();
                
                if (typeof webgazer !== 'undefined' && typeof h337 !== 'undefined') {
                    console.log('Librerías cargadas correctamente');
                    this.updateDebugInfo();
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Timeout esperando las librerías'));
                } else {
                    setTimeout(checkLibraries, 100);
                }
            };
            
            checkLibraries();
        });
    }

    updateDebugInfo() {
        const webgazerStatus = document.getElementById('webgazer-status');
        const heatmapStatus = document.getElementById('heatmap-status');
        const debugPoints = document.getElementById('debug-points');
        const debugState = document.getElementById('debug-state');
        
        if (webgazerStatus) {
            webgazerStatus.textContent = typeof webgazer !== 'undefined' ? 'Cargado' : 'Cargando...';
            webgazerStatus.style.color = typeof webgazer !== 'undefined' ? '#28a745' : '#ffc107';
        }
        
        if (heatmapStatus) {
            heatmapStatus.textContent = typeof h337 !== 'undefined' ? 'Cargado' : 'Cargando...';
            heatmapStatus.style.color = typeof h337 !== 'undefined' ? '#28a745' : '#ffc107';
        }
        
        if (debugPoints) {
            debugPoints.textContent = this.points.length;
        }
        
        if (debugState) {
            debugState.textContent = this.isTracking ? 'Activo' : 'Inactivo';
            debugState.style.color = this.isTracking ? '#28a745' : '#dc3545';
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc3545;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;
        errorDiv.innerHTML = `
            <h4>Error</h4>
            <p>${message}</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 5px 15px; border: none; border-radius: 5px; background: white; color: #dc3545; cursor: pointer;">Cerrar</button>
        `;
        document.body.appendChild(errorDiv);
    }

    initializeElements() {
        // Elementos de control
        this.startButton = document.getElementById('start-tracking');
        this.stopButton = document.getElementById('stop-tracking');
        this.calibrateButton = document.getElementById('calibrate');
        this.clearButton = document.getElementById('clear-heatmap');
        this.statusIndicator = document.getElementById('status-indicator');
        this.statusText = document.getElementById('status-text');
        
        // Elementos de estadísticas
        this.pointsCount = document.getElementById('points-count');
        this.activeTime = document.getElementById('active-time');
        this.accuracy = document.getElementById('accuracy');
        this.hotspotArea = document.getElementById('hotspot-area');
        
        // Contenedores
        this.heatmapCanvas = document.getElementById('heatmap-canvas');
        this.videoContainer = document.getElementById('webgazer-video-container');
        this.statsPanel = document.getElementById('stats-panel');
        this.pongGrid = document.getElementById('pong-grid');
        this.trackingArea = document.getElementById('tracking-area');
        this.trackingIndicator = document.getElementById('tracking-indicator');
        this.heatmapContainer = document.querySelector('.heatmap-container');
        
        // Puntos de calibración
        this.calibrationDots = [];
        for (let i = 1; i <= 9; i++) {
            this.calibrationDots.push(document.getElementById(`calibration-dot-${i}`));
        }

        // Elementos de calibración
        this.calibrationInfo = document.getElementById('calibration-info');
        this.calibrationProgressBar = document.getElementById('calibration-progress-bar');
        this.calibrationStatus = document.getElementById('calibration-status');

        // Verificar que todos los elementos existen
        this.verifyElements();
    }

    // Verificar que todos los elementos del DOM estén correctamente inicializados
    verifyElements() {
        console.log('=== VERIFICACIÓN DE ELEMENTOS DEL DOM ===');
        
        const elements = {
            'heatmapCanvas': this.heatmapCanvas,
            'trackingArea': this.trackingArea,
            'pongGrid': this.pongGrid,
            'pointsCount': this.pointsCount,
            'activeTime': this.activeTime,
            'accuracy': this.accuracy,
            'hotspotArea': this.hotspotArea,
            'statsPanel': this.statsPanel,
            'startButton': this.startButton,
            'stopButton': this.stopButton,
            'calibrateButton': this.calibrateButton,
            'clearButton': this.clearButton
        };
        
        let allElementsFound = true;
        
        for (const [name, element] of Object.entries(elements)) {
            if (element) {
                console.log(`✅ ${name}: Encontrado`);
            } else {
                console.error(`❌ ${name}: NO ENCONTRADO`);
                allElementsFound = false;
            }
        }
        
        if (allElementsFound) {
            console.log('✅ Todos los elementos del DOM están correctamente inicializados');
        } else {
            console.error('❌ Algunos elementos del DOM no se encontraron');
        }
        
        console.log('=== FIN DE VERIFICACIÓN ===');
    }

    createPongGrid() {
        if (!this.pongGrid || !this.trackingArea) return;
        
        // Limpiar grid existente
        this.pongGrid.innerHTML = '';
        this.gridSquares = [];
        
        // Calcular dimensiones del grid dentro del área de seguimiento
        const gridSize = 40; // Tamaño de cada cuadrado
        const trackingRect = this.trackingArea.getBoundingClientRect();
        const containerWidth = trackingRect.width;
        const containerHeight = trackingRect.height;
        
        const cols = Math.ceil(containerWidth / gridSize);
        const rows = Math.ceil(containerHeight / gridSize);
        
        // Crear cuadrados del grid
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const square = document.createElement('div');
                square.className = 'grid-square';
                square.style.width = `${gridSize}px`;
                square.style.height = `${gridSize}px`;
                
                // Agregar evento de clic para interacción
                square.addEventListener('click', (e) => {
                    this.handleGridSquareClick(e, square);
                });
                
                this.pongGrid.appendChild(square);
                this.gridSquares.push(square);
            }
        }
        
        console.log(`Grid creado con ${cols}x${rows} cuadrados (${this.gridSquares.length} total) dentro del área de seguimiento`);
    }

    handleGridSquareClick(e, square) {
        // Agregar efecto visual al cuadrado clickeado
        square.classList.add('clicked');
        setTimeout(() => {
            square.classList.remove('clicked');
        }, 300);
        
        // Si estamos en modo calibración, registrar el clic
        if (this.isCalibrating) {
            this.handleCalibrationClick(e);
        }
    }

    initializeHeatmap() {
        try {
            // Configuración del mapa de calor
            const heatmapConfig = {
                container: this.heatmapCanvas,
                radius: 50,
                maxOpacity: 0.8,
                minOpacity: 0.1,
                blur: 0.75,
                gradient: {
                    '.2': 'blue',
                    '.4': 'green',
                    '.6': 'yellow',
                    '.8': 'orange',
                    '.95': 'red'
                }
            };
            
            this.heatmapInstance = h337.create(heatmapConfig);
            console.log('Mapa de calor inicializado correctamente');
            
            // Agregar algunos puntos de prueba para verificar que funciona
            this.addTestPoints();
            
        } catch (error) {
            console.error('Error al inicializar el mapa de calor:', error);
            this.showError('Error al inicializar el mapa de calor: ' + error.message);
        }
    }

    addTestPoints() {
        // Agregar algunos puntos de prueba para verificar la visualización
        const testPoints = [
            { x: 100, y: 100, value: 50 },
            { x: 200, y: 150, value: 80 },
            { x: 300, y: 200, value: 30 }
        ];
        
        this.points = testPoints;
        this.updateHeatmap();
        console.log('Puntos de prueba agregados para verificar el mapa de calor');
    }

    bindEvents() {
        // Eventos de botones
        this.startButton.addEventListener('click', () => this.startTracking());
        this.stopButton.addEventListener('click', () => this.stopTracking());
        this.calibrateButton.addEventListener('click', () => this.startCalibration());
        this.clearButton.addEventListener('click', () => this.clearHeatmap());
        
        // Agregar botón de prueba para simular puntos
        const testButton = document.createElement('button');
        testButton.textContent = 'Probar Puntos';
        testButton.className = 'btn btn-heatmap';
        testButton.style.margin = '0.5rem';
        testButton.addEventListener('click', () => this.simulateGazePoints());
        
        // Agregar botón de diagnóstico
        const diagnoseButton = document.createElement('button');
        diagnoseButton.textContent = 'Diagnóstico';
        diagnoseButton.className = 'btn btn-heatmap';
        diagnoseButton.style.margin = '0.5rem';
        diagnoseButton.addEventListener('click', () => this.diagnoseSystem());
        
        // Agregar botón para forzar actualización de estadísticas
        const forceUpdateButton = document.createElement('button');
        forceUpdateButton.textContent = 'Actualizar Stats';
        forceUpdateButton.className = 'btn btn-heatmap';
        forceUpdateButton.style.margin = '0.5rem';
        forceUpdateButton.addEventListener('click', () => this.forceUpdateStats());
        
        // Insertar después del botón de limpiar
        if (this.clearButton && this.clearButton.parentNode) {
            this.clearButton.parentNode.insertBefore(testButton, this.clearButton.nextSibling);
            this.clearButton.parentNode.insertBefore(diagnoseButton, testButton.nextSibling);
            this.clearButton.parentNode.insertBefore(forceUpdateButton, diagnoseButton.nextSibling);
        }
        
        // Eventos de calibración
        this.calibrationDots.forEach((dot, index) => {
            if (dot) {
                dot.addEventListener('click', (e) => {
                    if (this.isCalibrating) {
                        this.handleCalibrationDotClick(e, index);
                    }
                });
            }
        });

        // Evento de redimensionamiento para recrear el grid
        window.addEventListener('resize', () => {
            this.createPongGrid();
        });
    }

    // Función de diagnóstico para verificar el estado del sistema
    diagnoseSystem() {
        console.log('=== DIAGNÓSTICO DEL SISTEMA ===');
        
        // Verificar librerías
        console.log('WebGazer disponible:', typeof webgazer !== 'undefined');
        console.log('Heatmap.js disponible:', typeof h337 !== 'undefined');
        
        // Verificar elementos del DOM
        console.log('Elementos del DOM:');
        console.log('- heatmapCanvas:', !!this.heatmapCanvas);
        console.log('- trackingArea:', !!this.trackingArea);
        console.log('- pongGrid:', !!this.pongGrid);
        console.log('- heatmapInstance:', !!this.heatmapInstance);
        
        // Verificar estado del seguimiento
        console.log('Estado del seguimiento:');
        console.log('- isTracking:', this.isTracking);
        console.log('- webgazerInitialized:', this.webgazerInitialized);
        console.log('- puntos registrados:', this.points.length);
        
        // Verificar elementos de estadísticas
        console.log('Elementos de estadísticas:');
        console.log('- pointsCount:', !!this.pointsCount);
        console.log('- activeTime:', !!this.activeTime);
        console.log('- accuracy:', !!this.accuracy);
        console.log('- hotspotArea:', !!this.hotspotArea);
        console.log('- statsPanel:', !!this.statsPanel);
        
        // Verificar valores actuales de las estadísticas
        if (this.pointsCount) {
            console.log('- Valor actual de pointsCount:', this.pointsCount.textContent);
        }
        if (this.activeTime) {
            console.log('- Valor actual de activeTime:', this.activeTime.textContent);
        }
        if (this.accuracy) {
            console.log('- Valor actual de accuracy:', this.accuracy.textContent);
        }
        
        // Verificar área de seguimiento
        if (this.trackingArea) {
            const rect = this.trackingArea.getBoundingClientRect();
            console.log('Área de seguimiento:', {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
            });
        }
        
        // Verificar configuración del heatmap
        if (this.heatmapCanvas) {
            const rect = this.heatmapCanvas.getBoundingClientRect();
            console.log('Canvas del heatmap:', {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                zIndex: this.heatmapCanvas.style.zIndex
            });
        }
        
        // Forzar actualización de estadísticas
        this.forceUpdateStats();
        
        console.log('=== FIN DEL DIAGNÓSTICO ===');
    }

    // Forzar actualización de estadísticas
    forceUpdateStats() {
        console.log('Forzando actualización de estadísticas...');
        
        // Actualizar contador de puntos manualmente
        if (this.pointsCount) {
            this.pointsCount.textContent = this.points.length;
            console.log('Contador de puntos forzado a:', this.points.length);
        }
        
        // Actualizar tiempo activo
        if (this.startTime && this.activeTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.activeTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            console.log('Tiempo activo forzado a:', this.activeTime.textContent);
        }
        
        // Actualizar precisión
        if (this.points.length > 0 && this.accuracy) {
            const avgConfidence = this.points.reduce((sum, point) => sum + point.value, 0) / this.points.length;
            this.accuracy.textContent = `${Math.round(avgConfidence)}%`;
            console.log('Precisión forzada a:', this.accuracy.textContent);
        } else if (this.accuracy) {
            this.accuracy.textContent = '0%';
            console.log('Precisión forzada a 0%');
        }
        
        // Mostrar panel de estadísticas
        if (this.statsPanel) {
            this.statsPanel.style.display = 'block';
            console.log('Panel de estadísticas forzado a mostrar');
        }
        
        console.log('Actualización de estadísticas forzada completada');
    }

    // Función para simular puntos de seguimiento (para pruebas)
    simulateGazePoints() {
        console.log('Simulando puntos de seguimiento...');
        
        if (!this.trackingArea) {
            console.error('No se encontró el área de seguimiento');
            return;
        }
        
        const trackingRect = this.trackingArea.getBoundingClientRect();
        console.log('Área de seguimiento para simulación:', trackingRect);
        
        // Simular algunos puntos dentro del área de seguimiento
        for (let i = 0; i < 10; i++) {
            // Generar coordenadas dentro del área de seguimiento
            const x = trackingRect.left + Math.random() * trackingRect.width;
            const y = trackingRect.top + Math.random() * trackingRect.height;
            const confidence = 0.5 + Math.random() * 0.5; // Confianza entre 0.5 y 1.0
            
            console.log(`Simulando punto ${i + 1}: x=${x}, y=${y}, confidence=${confidence}`);
            
            // Llamar directamente a addGazePoint con coordenadas de pantalla
            this.addGazePoint(x, y, confidence);
        }
        
        console.log(`Simulación completada. Total puntos: ${this.points.length}`);
    }

    async startTracking() {
        try {
            console.log('Iniciando seguimiento...');
            
            // Limpiar puntos de prueba
            this.points = [];
            this.updateHeatmap();
            
            // Configurar WebGazer con configuración más robusta
            webgazer.setRegression('ridge')
                .setTracker('TFFacemesh')
                .setGazeListener((data, timestamp) => {
                    console.log('WebGazer data recibida:', data); // Debug adicional
                    if (this.isTracking && data && data.x !== null && data.y !== null) {
                        console.log(`Procesando punto: x=${data.x}, y=${data.y}, confidence=${data.confidence}`);
                        
                        // Verificar que las coordenadas son válidas
                        if (!isNaN(data.x) && !isNaN(data.y) && 
                            data.x >= 0 && data.y >= 0 && 
                            data.x <= window.innerWidth && data.y <= window.innerHeight) {
                            
                            // Guardar el último punto de mirada para el registro periódico
                            this.lastGazePoint = {
                                x: data.x,
                                y: data.y,
                                confidence: data.confidence,
                                timestamp: timestamp
                            };
                            console.log('Punto de mirada guardado correctamente');
                        } else {
                            console.log('Coordenadas inválidas de WebGazer, ignorando punto');
                        }
                    } else {
                        console.log('Datos de WebGazer inválidos o seguimiento no activo');
                    }
                })
                .begin()
                .then(() => {
                    console.log('WebGazer iniciado correctamente');
                    this.webgazerInitialized = true;
                    
                    // Mostrar video después de que WebGazer esté listo
                    setTimeout(() => {
                        this.showVideoContainer();
                    }, 1000);
                })
                .catch(error => {
                    console.error('Error al iniciar WebGazer:', error);
                    this.showError('Error al iniciar el seguimiento visual: ' + error.message);
                });
            
            // Iniciar seguimiento
            this.isTracking = true;
            this.startTime = Date.now();
            this.startTrackingTimer();
            
            // Iniciar registro de puntos cada 0.2 segundos
            this.startGazeTracking();
            
            // Actualizar UI
            this.updateStatus();
            this.showStatsPanel();
            this.hideTrackingIndicator();
            this.hideContentOverlay();
            
            // Habilitar/deshabilitar botones
            this.startButton.disabled = true;
            this.stopButton.disabled = false;
            this.calibrateButton.disabled = false;
            
            console.log('Seguimiento iniciado correctamente');
            
        } catch (error) {
            console.error('Error al iniciar el seguimiento:', error);
            this.showError('Error al acceder a la cámara. Asegúrate de permitir el acceso a la cámara.');
        }
    }

    stopTracking() {
        this.isTracking = false;
        this.stopTrackingTimer();
        this.stopGazeTracking(); // Detener el registro de puntos
        
        // Detener WebGazer
        if (this.webgazerInitialized) {
            webgazer.end();
            this.webgazerInitialized = false;
        }
        
        // Actualizar UI
        this.updateStatus();
        this.hideVideoContainer();
        this.showTrackingIndicator();
        this.showContentOverlay();
        
        // Habilitar/deshabilitar botones
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        this.calibrateButton.disabled = true;
        
        // Mostrar mapa de calor final
        this.showFinalHeatmap();
        
        console.log('Seguimiento detenido');
    }

    // Iniciar registro de puntos cada 0.2 segundos
    startGazeTracking() {
        console.log('Iniciando registro de puntos cada 0.2 segundos...');
        
        this.gazeTrackingInterval = setInterval(() => {
            if (this.isTracking && this.lastGazePoint) {
                console.log(`Registrando punto cada 0.2s: x=${this.lastGazePoint.x}, y=${this.lastGazePoint.y}, confidence=${this.lastGazePoint.confidence}`);
                
                // Verificar que las coordenadas son válidas
                if (this.lastGazePoint.x !== null && this.lastGazePoint.y !== null && 
                    !isNaN(this.lastGazePoint.x) && !isNaN(this.lastGazePoint.y)) {
                    this.addGazePoint(this.lastGazePoint.x, this.lastGazePoint.y, this.lastGazePoint.confidence);
                } else {
                    console.log('Coordenadas inválidas, saltando punto');
                }
            } else if (this.isTracking && !this.lastGazePoint) {
                console.log('Esperando datos de WebGazer...');
            } else if (!this.isTracking) {
                console.log('Seguimiento no activo');
            }
        }, 200); // 0.2 segundos = 200 milisegundos
    }

    // Detener registro de puntos
    stopGazeTracking() {
        if (this.gazeTrackingInterval) {
            clearInterval(this.gazeTrackingInterval);
            this.gazeTrackingInterval = null;
            console.log('Registro de puntos detenido');
        }
    }

    addGazePoint(x, y, confidence) {
        console.log(`addGazePoint llamado con: x=${x}, y=${y}, confidence=${confidence}`);
        
        // Verificar que tenemos el área de seguimiento
        if (!this.trackingArea) {
            console.error('No se encontró el área de seguimiento');
            return;
        }
        
        // Las coordenadas de WebGazer ya están en píxeles de pantalla, NO necesitan multiplicarse
        // WebGazer devuelve coordenadas en píxeles de pantalla directamente
        const screenX = x; // NO multiplicar por window.innerWidth
        const screenY = y; // NO multiplicar por window.innerHeight
        
        console.log(`Coordenadas de pantalla: screenX=${screenX}, screenY=${screenY}`);
        
        // Obtener el área de seguimiento
        const trackingRect = this.trackingArea.getBoundingClientRect();
        console.log(`Área de seguimiento: left=${trackingRect.left}, top=${trackingRect.top}, right=${trackingRect.right}, bottom=${trackingRect.bottom}`);
        
        // Verificar si el punto está dentro del área de seguimiento
        if (screenX < trackingRect.left || screenX > trackingRect.right ||
            screenY < trackingRect.top || screenY > trackingRect.bottom) {
            console.log(`Punto fuera del área de seguimiento: (${screenX}, ${screenY})`);
            return; // Ignorar puntos fuera del área de seguimiento
        }
        
        // Convertir a coordenadas relativas al área de seguimiento
        const relativeX = screenX - trackingRect.left;
        const relativeY = screenY - trackingRect.top;
        
        // Usar una confianza por defecto si no está disponible
        const defaultConfidence = 0.5;
        const finalConfidence = confidence !== undefined ? confidence : defaultConfidence;
        
        // Filtrar puntos con baja confianza (umbral muy bajo para capturar más puntos)
        if (finalConfidence < 0.05) {
            console.log(`Punto descartado por baja confianza: ${finalConfidence}`);
            return;
        }
        
        // Agregar punto al array
        const newPoint = {
            x: Math.round(relativeX),
            y: Math.round(relativeY),
            value: Math.round(finalConfidence * 100),
            timestamp: Date.now()
        };
        
        this.points.push(newPoint);
        
        // Limpiar puntos antiguos para mantener rendimiento (mantener solo los últimos 1000 puntos)
        this.cleanOldPoints();
        
        // Actualizar mapa de calor en tiempo real (cada punto se pinta inmediatamente)
        this.updateHeatmap();
        
        // Actualizar estadísticas INMEDIATAMENTE
        this.updateStats();
        
        // Actualizar panel de debug
        this.updateDebugInfo();
        
        console.log(`Punto agregado: (${Math.round(relativeX)}, ${Math.round(relativeY)}) - Confianza: ${Math.round(finalConfidence * 100)}% - Total puntos: ${this.points.length}`);
        
        // Verificar que las estadísticas se actualizaron correctamente
        setTimeout(() => {
            if (this.pointsCount) {
                console.log('Verificación - Puntos en UI:', this.pointsCount.textContent, 'Puntos reales:', this.points.length);
            }
        }, 100);
    }

    // Limpiar puntos antiguos para mantener rendimiento
    cleanOldPoints() {
        const maxPoints = 1000; // Mantener solo los últimos 1000 puntos
        if (this.points.length > maxPoints) {
            this.points = this.points.slice(-maxPoints);
            console.log(`Puntos limpiados. Manteniendo solo los últimos ${maxPoints} puntos`);
        }
    }

    updateHeatmap() {
        console.log(`updateHeatmap llamado con ${this.points.length} puntos`);
        
        if (this.heatmapInstance && this.points.length > 0) {
            try {
                const data = {
                    max: 100,
                    data: this.points
                };
                
                console.log('Datos del mapa de calor:', data);
                this.heatmapInstance.setData(data);
                console.log(`Mapa de calor actualizado con ${this.points.length} puntos`);
                
                // Verificar que el canvas del heatmap sea visible y tenga el z-index correcto
                if (this.heatmapCanvas) {
                    this.heatmapCanvas.style.zIndex = '15';
                    this.heatmapCanvas.style.pointerEvents = 'none';
                    this.heatmapCanvas.style.opacity = '1';
                    console.log('Canvas del heatmap configurado correctamente');
                }
                
                // Forzar la actualización visual
                if (this.heatmapInstance._renderer) {
                    this.heatmapInstance._renderer.draw();
                }
                
            } catch (error) {
                console.error('Error al actualizar el mapa de calor:', error);
            }
        } else {
            console.log('No hay puntos para mostrar en el mapa de calor o no hay instancia de heatmap');
            if (!this.heatmapInstance) {
                console.error('No hay instancia de heatmap disponible');
            }
            if (this.points.length === 0) {
                console.log('No hay puntos registrados');
            }
        }
    }

    updateStats() {
        console.log('updateStats llamado - puntos actuales:', this.points.length);
        
        // Actualizar contador de puntos
        if (this.pointsCount) {
            this.pointsCount.textContent = this.points.length;
            console.log('Contador de puntos actualizado:', this.points.length);
        } else {
            console.error('No se encontró el elemento points-count');
        }
        
        // Actualizar tiempo activo
        if (this.startTime && this.activeTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.activeTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            console.log('Tiempo activo actualizado:', this.activeTime.textContent);
        } else {
            console.error('No se encontró startTime o activeTime');
        }
        
        // Calcular precisión promedio
        if (this.points.length > 0 && this.accuracy) {
            const avgConfidence = this.points.reduce((sum, point) => sum + point.value, 0) / this.points.length;
            this.accuracy.textContent = `${Math.round(avgConfidence)}%`;
            console.log('Precisión actualizada:', this.accuracy.textContent);
        } else if (this.accuracy) {
            this.accuracy.textContent = '0%';
            console.log('Precisión establecida en 0%');
        } else {
            console.error('No se encontró el elemento accuracy');
        }
        
        // Identificar zona más activa
        this.updateHotspotArea();
        
        // Forzar actualización del panel de estadísticas
        if (this.statsPanel) {
            this.statsPanel.style.display = 'block';
            console.log('Panel de estadísticas mostrado');
        }
    }

    updateHotspotArea() {
        if (this.points.length === 0 || !this.hotspotArea) {
            if (this.hotspotArea) this.hotspotArea.textContent = '-';
            return;
        }
        
        // Dividir el área de seguimiento en cuadrantes
        const trackingRect = this.trackingArea.getBoundingClientRect();
        const areaWidth = trackingRect.width;
        const areaHeight = trackingRect.height;
        const quadrants = {
            'Superior Izquierdo': 0,
            'Superior Derecho': 0,
            'Inferior Izquierdo': 0,
            'Inferior Derecho': 0
        };
        
        this.points.forEach(point => {
            if (point.x < areaWidth / 2 && point.y < areaHeight / 2) {
                quadrants['Superior Izquierdo']++;
            } else if (point.x >= areaWidth / 2 && point.y < areaHeight / 2) {
                quadrants['Superior Derecho']++;
            } else if (point.x < areaWidth / 2 && point.y >= areaHeight / 2) {
                quadrants['Inferior Izquierdo']++;
            } else {
                quadrants['Inferior Derecho']++;
            }
        });
        
        // Encontrar el cuadrante más activo
        const maxQuadrant = Object.keys(quadrants).reduce((a, b) => 
            quadrants[a] > quadrants[b] ? a : b
        );
        
        this.hotspotArea.textContent = maxQuadrant;
    }

    startCalibration() {
        this.isCalibrating = true;
        this.currentCalibrationPoint = 0;
        
        // Agregar clase de modo calibración
        document.body.classList.add('calibration-mode');
        
        // Mostrar información de calibración
        this.showCalibrationInfo();
        
        // Mostrar primer punto
        this.showCalibrationDot();
    }

    showCalibrationInfo() {
        if (this.calibrationInfo) {
            this.calibrationInfo.style.display = 'block';
        }
    }

    hideCalibrationInfo() {
        if (this.calibrationInfo) {
            this.calibrationInfo.style.display = 'none';
        }
    }

    showCalibrationDot() {
        if (this.currentCalibrationPoint >= this.calibrationPoints.length) {
            this.finishCalibration();
            return;
        }
        
        // Ocultar todos los puntos
        this.calibrationDots.forEach(dot => {
            if (dot) dot.style.display = 'none';
        });
        
        // Mostrar el punto actual
        const point = this.calibrationPoints[this.currentCalibrationPoint];
        const dot = this.calibrationDots[this.currentCalibrationPoint];
        
        if (dot) {
            dot.style.left = `${point.x * 100}%`;
            dot.style.top = `${point.y * 100}%`;
            dot.style.display = 'block';
        }
        
        // Actualizar progreso
        this.updateCalibrationProgress();
    }

    updateCalibrationProgress() {
        const progress = ((this.currentCalibrationPoint + 1) / this.calibrationPoints.length) * 100;
        
        if (this.calibrationProgressBar) {
            this.calibrationProgressBar.style.width = `${progress}%`;
        }
        
        if (this.calibrationStatus) {
            this.calibrationStatus.textContent = `Punto ${this.currentCalibrationPoint + 1} de ${this.calibrationPoints.length}`;
        }
    }

    handleCalibrationDotClick(e, dotIndex) {
        if (dotIndex === this.currentCalibrationPoint) {
            // Registrar punto de calibración
            const point = this.calibrationPoints[dotIndex];
            webgazer.addMouseEventListeners();
            
            // Pasar al siguiente punto
            this.currentCalibrationPoint++;
            this.showCalibrationDot();
        }
    }

    finishCalibration() {
        this.isCalibrating = false;
        
        // Remover clase de modo calibración
        document.body.classList.remove('calibration-mode');
        
        // Ocultar todos los puntos
        this.calibrationDots.forEach(dot => {
            if (dot) dot.style.display = 'none';
        });
        
        // Ocultar información de calibración
        this.hideCalibrationInfo();
        
        alert('Calibración completada. El seguimiento visual debería ser más preciso ahora.');
    }

    clearHeatmap() {
        this.points = [];
        if (this.heatmapInstance) {
            this.heatmapInstance.setData({
                max: 100,
                data: []
            });
        }
        this.updateStats();
        console.log('Mapa de calor limpiado');
    }

    showFinalHeatmap() {
        // Asegurar que el mapa de calor sea visible y esté en el área correcta
        if (this.heatmapCanvas) {
            this.heatmapCanvas.style.zIndex = '20';
            this.heatmapCanvas.style.pointerEvents = 'none';
        }
        
        // Agregar clase para mostrar el mapa de calor
        if (this.trackingArea) {
            this.trackingArea.classList.add('heatmap-active');
        }
        
        // Mostrar resultados finales
        this.showFinalResults();
    }

    hideTrackingIndicator() {
        if (this.trackingArea) {
            this.trackingArea.classList.add('tracking-active');
        }
        if (this.heatmapContainer) {
            this.heatmapContainer.classList.add('tracking-active');
        }
    }

    showTrackingIndicator() {
        if (this.trackingArea) {
            this.trackingArea.classList.remove('tracking-active');
        }
        if (this.heatmapContainer) {
            this.heatmapContainer.classList.remove('tracking-active');
        }
    }

    hideContentOverlay() {
        // El contenido se oculta automáticamente con CSS cuando se agrega la clase tracking-active
        console.log('Contenido descriptivo ocultado durante el seguimiento');
    }

    showContentOverlay() {
        // El contenido se muestra automáticamente cuando se remueve la clase tracking-active
        console.log('Contenido descriptivo mostrado después del seguimiento');
    }

    startTrackingTimer() {
        this.trackingInterval = setInterval(() => {
            this.updateStats();
        }, 1000);
    }

    stopTrackingTimer() {
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.trackingInterval = null;
        }
    }

    updateStatus() {
        if (this.statusIndicator && this.statusText) {
            if (this.isTracking) {
                this.statusIndicator.className = 'status-indicator status-active';
                this.statusText.textContent = 'Activo';
            } else {
                this.statusIndicator.className = 'status-indicator status-inactive';
                this.statusText.textContent = 'Inactivo';
            }
        }
        
        // Actualizar panel de debug
        this.updateDebugInfo();
    }

    showVideoContainer() {
        if (this.videoContainer) {
            this.videoContainer.style.display = 'block';
            console.log('Contenedor de video mostrado');
        }
    }

    hideVideoContainer() {
        if (this.videoContainer) {
            this.videoContainer.style.display = 'none';
        }
    }

    showStatsPanel() {
        if (this.statsPanel) {
            this.statsPanel.style.display = 'block';
        }
    }

    showFinalResults() {
        const totalPoints = this.points.length;
        const totalTime = this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0;
        const avgConfidence = totalPoints > 0 ? 
            Math.round(this.points.reduce((sum, point) => sum + point.value, 0) / totalPoints) : 0;
        
        const results = `
            📊 Resultados del Seguimiento Visual:
            
            • Puntos registrados: ${totalPoints}
            • Tiempo total: ${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}
            • Precisión promedio: ${avgConfidence}%
            • Zona más observada: ${this.hotspotArea ? this.hotspotArea.textContent : '-'}
            
            El mapa de calor muestra las áreas donde más tiempo pasaste mirando dentro del área de seguimiento.
        `;
        
        alert(results);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando HeatmapTracker...');
    
    // Crear instancia global
    window.heatmapTracker = new HeatmapTracker();
    
    // Agregar navegación activa
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    console.log('HeatmapTracker inicializado');
});

// Manejar eventos de redimensionamiento de ventana
window.addEventListener('resize', function() {
    if (window.heatmapTracker && window.heatmapTracker.heatmapInstance) {
        window.heatmapTracker.updateHeatmap();
    }
});

// Manejar eventos de visibilidad de página
document.addEventListener('visibilitychange', function() {
    if (document.hidden && window.heatmapTracker && window.heatmapTracker.isTracking) {
        console.log('Página oculta - pausando seguimiento');
    }
});

// Exportar para uso global
window.HeatmapTracker = HeatmapTracker; 