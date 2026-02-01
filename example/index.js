const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// RUTAS DE LA API
app.get('/', (req, res) => {
    res.json({
        service: 'DoneBolivia WhatsApp API',
        status: 'ready',
        endpoints: {
            root: '/',
            status: '/status',
            send_message: '/send (POST)',
            health_check: '/health',
            instructions: '/instructions'
        }
    });
});

// Enviar mensaje de confirmación
app.post('/send', (req, res) => {
    const { phone, message } = req.body;
    
    if (!phone || !message) {
        return res.status(400).json({
            error: 'Se requiere phone y message',
            example: {
                phone: '71234567',
                message: 'Hola, confirma tu registro en DoneBolivia.com'
            }
        });
    }
    
    // SIMULACIÓN para desarrollo
    console.log(`✅ [SIMULADO] Mensaje para ${phone}: ${message.substring(0, 80)}...`);
    
    res.json({
        success: true,
        simulated: true,
        message: 'Mensaje de confirmación SIMULADO enviado',
        data: {
            to: phone,
            message_preview: message.substring(0, 80) + '...',
            timestamp: new Date().toISOString(),
            note: 'En producción: Se enviaría realmente por WhatsApp'
        }
    });
});

// Estado del servicio
app.get('/status', (req, res) => {
    res.json({
        service: 'DoneBolivia Backend',
        status: 'operational',
        mode: 'development',
        server_time: new Date().toISOString()
    });
});

// Salud para cron-job
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        service: 'DoneBolivia API',
        timestamp: new Date().toISOString()
    });
});

// Instrucciones de uso
app.get('/instructions', (req, res) => {
    res.send(`
        <h1>📱 DoneBolivia - API de Confirmación</h1>
        <p><strong>Modo:</strong> Desarrollo (Simulación)</p>
        <p><strong>Endpoint principal:</strong> POST /send</p>
        <p><strong>Para producción:</strong> Usar WATI.io</p>
    `);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
    ========================================
    🚀 DONE BOLIVIA BACKEND
    ========================================
    📍 Puerto: ${PORT}
    ✅ Servicio: Activo
    💡 Modo: Simulación
    ========================================
    `);
});
