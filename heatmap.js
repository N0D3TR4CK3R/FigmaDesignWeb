// Heatmap.js - Implementación de mapa de calor con WebGazer.js
class HeatmapTracker {
    constructor() {
        this.isTracking = false;
        this.heatmapInstance = null;
        this.startTime = null;
        this.trackingInterval = null;
        this.points = [];
        this.calibrationPoints = [
            { x: 0.1, y: 0.1 },
            { x: 0.9, y: 0.1 },
            { x: 0.5, y: 0.5 },
            { x: 0.1, y: 0.9 },
            { x: 0.9, y: 0.9 }
        ];
        this.currentCalibrationPoint = 0;
        this.isCalibrating = false;
        this.webgazerInitialized = false;
        
        // Esperar a que las librerías se carguen
        this.waitForLibraries().then(() => {
            this.initializeElements();
            this.initializeHeatmap();
            this.bindEvents();
            this.updateStatus();
            console.log('HeatmapTracker inicializado correctamente');
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
        
        // Puntos de calibración
        this.calibrationElements = [];
        for (let i = 1; i <= 5; i++) {
            this.calibrationElements.push(document.getElementById(`calibration-point-${i}`));
        }

        // Verificar que todos los elementos existen
        if (!this.heatmapCanvas) {
            console.error('No se encontró el elemento heatmap-canvas');
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
        console.log('Puntos de prueba agregados');
    }

    bindEvents() {
        // Eventos de botones
        this.startButton.addEventListener('click', () => this.startTracking());
        this.stopButton.addEventListener('click', () => this.stopTracking());
        this.calibrateButton.addEventListener('click', () => this.startCalibration());
        this.clearButton.addEventListener('click', () => this.clearHeatmap());
        
        // Eventos de calibración
        document.addEventListener('click', (e) => {
            if (this.isCalibrating) {
                this.handleCalibrationClick(e);
            }
        });
    }

    async startTracking() {
        try {
            console.log('Iniciando seguimiento...');
            
            // Configurar WebGazer
            webgazer.setRegression('ridge')
                .setTracker('TFFacemesh')
                .setGazeListener((data, timestamp) => {
                    if (this.isTracking && data && data.x !== null && data.y !== null) {
                        this.addGazePoint(data.x, data.y, data.confidence);
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
            
            // Actualizar UI
            this.updateStatus();
            this.showStatsPanel();
            
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
        
        // Detener WebGazer
        if (this.webgazerInitialized) {
            webgazer.end();
            this.webgazerInitialized = false;
        }
        
        // Actualizar UI
        this.updateStatus();
        this.hideVideoContainer();
        
        // Habilitar/deshabilitar botones
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        this.calibrateButton.disabled = true;
        
        // Mostrar resultados finales
        this.showFinalResults();
        
        console.log('Seguimiento detenido');
    }

    addGazePoint(x, y, confidence) {
        // Filtrar puntos con baja confianza
        if (confidence < 0.3) return;
        
        // Convertir coordenadas de WebGazer a coordenadas de pantalla
        const screenX = x * window.innerWidth;
        const screenY = y * window.innerHeight;
        
        // Agregar punto al array
        this.points.push({
            x: Math.round(screenX),
            y: Math.round(screenY),
            value: Math.round(confidence * 100),
            timestamp: Date.now()
        });
        
        // Actualizar mapa de calor
        this.updateHeatmap();
        
        // Actualizar estadísticas
        this.updateStats();
        
        // Actualizar panel de debug
        this.updateDebugInfo();
        
        console.log(`Punto agregado: (${Math.round(screenX)}, ${Math.round(screenY)}) - Confianza: ${Math.round(confidence * 100)}%`);
    }

    updateHeatmap() {
        if (this.heatmapInstance && this.points.length > 0) {
            try {
                const data = {
                    max: 100,
                    data: this.points
                };
                this.heatmapInstance.setData(data);
                console.log(`Mapa de calor actualizado con ${this.points.length} puntos`);
            } catch (error) {
                console.error('Error al actualizar el mapa de calor:', error);
            }
        }
    }

    updateStats() {
        // Actualizar contador de puntos
        if (this.pointsCount) {
            this.pointsCount.textContent = this.points.length;
        }
        
        // Actualizar tiempo activo
        if (this.startTime && this.activeTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.activeTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Calcular precisión promedio
        if (this.points.length > 0 && this.accuracy) {
            const avgConfidence = this.points.reduce((sum, point) => sum + point.value, 0) / this.points.length;
            this.accuracy.textContent = `${Math.round(avgConfidence)}%`;
        }
        
        // Identificar zona más activa
        this.updateHotspotArea();
    }

    updateHotspotArea() {
        if (this.points.length === 0 || !this.hotspotArea) {
            if (this.hotspotArea) this.hotspotArea.textContent = '-';
            return;
        }
        
        // Dividir la pantalla en cuadrantes
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const quadrants = {
            'Superior Izquierdo': 0,
            'Superior Derecho': 0,
            'Inferior Izquierdo': 0,
            'Inferior Derecho': 0
        };
        
        this.points.forEach(point => {
            if (point.x < screenWidth / 2 && point.y < screenHeight / 2) {
                quadrants['Superior Izquierdo']++;
            } else if (point.x >= screenWidth / 2 && point.y < screenHeight / 2) {
                quadrants['Superior Derecho']++;
            } else if (point.x < screenWidth / 2 && point.y >= screenHeight / 2) {
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
        this.showCalibrationPoint();
        
        alert('Calibración iniciada. Haz clic en cada punto rojo que aparezca en la pantalla.');
    }

    showCalibrationPoint() {
        if (this.currentCalibrationPoint >= this.calibrationPoints.length) {
            this.finishCalibration();
            return;
        }
        
        // Ocultar todos los puntos
        this.calibrationElements.forEach(el => {
            if (el) el.style.display = 'none';
        });
        
        // Mostrar el punto actual
        const point = this.calibrationPoints[this.currentCalibrationPoint];
        const element = this.calibrationElements[this.currentCalibrationPoint];
        
        if (element) {
            element.style.left = `${point.x * 100}%`;
            element.style.top = `${point.y * 100}%`;
            element.style.display = 'block';
        }
    }

    handleCalibrationClick(e) {
        // Verificar si el clic fue en el punto de calibración
        const point = this.calibrationPoints[this.currentCalibrationPoint];
        const element = this.calibrationElements[this.currentCalibrationPoint];
        
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // Verificar si el clic está dentro del área del punto (con tolerancia)
        const tolerance = 30;
        if (Math.abs(clickX - (rect.left + rect.width / 2)) < tolerance &&
            Math.abs(clickY - (rect.top + rect.height / 2)) < tolerance) {
            
            // Registrar punto de calibración
            webgazer.addMouseEventListeners();
            
            // Pasar al siguiente punto
            this.currentCalibrationPoint++;
            this.showCalibrationPoint();
        }
    }

    finishCalibration() {
        this.isCalibrating = false;
        
        // Ocultar todos los puntos
        this.calibrationElements.forEach(el => {
            if (el) el.style.display = 'none';
        });
        
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
            
            El mapa de calor muestra las áreas donde más tiempo pasaste mirando.
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