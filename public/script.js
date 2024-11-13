// Configuración inicial del gráfico
const ctx = document.getElementById('scatterChart').getContext('2d');
const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [
            {
                label: 'Límites',
                data: [
                    { x: 125, y: 4400 },
                    { x: 126, y: 4800 },
                    { x: 135, y: 4800 },
                    { x: 138, y: 3900 },
                    { x: 137, y: 2600 },
                    { x: 125, y: 2600 },
                    { x: 125, y: 4400 } // Repite el primer punto para cerrar el polígono
                ],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                showLine: true,
                fill: false,
            },
            {
                label: 'Centro de Gravedad (CG)',
                data: [], // Este se actualizará dinámicamente con los datos de SharePoint
                backgroundColor: 'green',
                pointRadius: 5,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 120,
                max: 140,
            },
            y: {
                min: 2500,
                max: 5600,
            }
        }
    }
});

// Función para obtener datos del servidor y actualizar el gráfico
function fetchData() {
    fetch('https://bcd1-191-104-173-97.ngrok-free.app/data-points')
    .then(response => {
        console.log('Response:', response); // Agrega esto para ver la respuesta completa
        return response.json();
    })
    .then(data => {
        console.log(data); // Verifica los datos recibidos
        if (data.cg && data.cg.length > 0) {
            scatterChart.data.datasets[1].data = [{ x: data.cg[0].x, y: data.cg[0].y }];
            scatterChart.update();
        } else {
            console.error('No se encontraron datos de CG');
        }
    })
    .catch(error => console.error('Error al obtener datos:', error));
}



// Llamar a fetchData cada 5 segundos para actualizar el gráfico en tiempo real
setInterval(fetchData, 5000); // Ajusta el tiempo según tus necesidades
