const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001; // Usa el puerto de entorno para Azure

app.use(bodyParser.json());
app.use(express.static('public')); // Sirve los archivos en la carpeta 'public'

// Puntos estandarizados de los límites
const limitsPoints = [
    { x: 125, y: 4600 },
    { x: 127, y: 5100 },
    { x: 130, y: 5100 },
    { x: 135, y: 4600 },
    { x: 137, y: 4100 },
    { x: 125, y: 4100 }
];

let cgPoints = []; // Array para los puntos del centro de gravedad

// Endpoint para recibir solo el punto del centro de gravedad (CG)
app.post('/add-point', (req, res) => {
    const { x, y } = req.body;

    if (x && y) {
        cgPoints = [{ x, y }]; // Actualiza el punto CG
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

// Endpoint para enviar los puntos al cliente
app.get('/data-points', (req, res) => {
    console.log("Datos enviados al cliente:", { limits: limitsPoints, cg: cgPoints });
    res.json({ limits: limitsPoints, cg: cgPoints });
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
