let currentRetoIndex = 0;  // Índice del reto actual
let retosData = [];  // Aquí guardaremos los retos cargados

window.onload = function () {
    fetch('contenido.json')
        .then(response => response.json())
        .then(data => {
            retosData = Object.keys(data); // Guardamos la lista de retos
            cargarContenido(currentRetoIndex);
        })
        .catch(error => console.error('Error cargando el JSON:', error));

    // Función para cargar dinámicamente los códigos y conceptos desde JSON
    function cargarContenido(retoIndex) {
        if (retoIndex < 0 || retoIndex >= retosData.length) {
            console.warn("No hay más retos disponibles.");
            return;
        }

        const retoKey = retosData[retoIndex];

        fetch('contenido.json')
            .then(response => response.json())
            .then(data => {
                const content = data[retoKey];

                if (!content) {
                    console.error(`Reto ${retoIndex + 1} no encontrado en el JSON`);
                    return;
                }

                // Establecer el título del reto en un elemento h2
                const tituloReto = document.querySelector('h2');
                tituloReto.textContent = content.title || `Reto ${retoIndex + 1}`;

                // Limpiar los contenedores de códigos y conceptos
                document.querySelector('.codes').innerHTML = '';
                document.querySelector('.concepts').innerHTML = '';

                // Cargar los snippets de código
                content.codes.forEach(item => {
                    const codeDiv = document.createElement('div');
                    codeDiv.id = item.id;
                    codeDiv.className = 'code-snippet';
                    codeDiv.innerHTML = `<code>${item.code}</code>`;
                    document.querySelector('.codes').appendChild(codeDiv);
                });

                // Cargar los conceptos
                content.concepts.forEach(item => {
                    const conceptDiv = document.createElement('div');
                    conceptDiv.id = item.id;
                    conceptDiv.className = 'droppable';
                    conceptDiv.textContent = item.description;
                    document.querySelector('.concepts').appendChild(conceptDiv);
                });

                // Configurar Sortable después de cargar el contenido
                iniciarSortable();

                // Actualizar los botones de navegación
                mostrarBotonesNavegacion();
            })
            .catch(error => console.error('Error cargando el contenido:', error));
    }

    // Función para inicializar Sortable después de cargar el contenido dinámicamente
    function iniciarSortable() {
        const codesContainer = document.querySelector('.codes');

        // Crear Sortable para los bloques de código
        Sortable.create(codesContainer, {
            group: 'shared',
            animation: 150
        });

        // Crear Sortable para las descripciones de conceptos
        document.querySelectorAll('.droppable').forEach(function (concept) {
            Sortable.create(concept, {
                group: 'shared',
                animation: 150,
                ghostClass: 'sortable-ghost'
            });
        });
    }

    // Función para mostrar los botones de navegación
    function mostrarBotonesNavegacion() {
        const container = document.querySelector('.buttons-container');

        // Eliminar botones previos si existen
        container.innerHTML = '';

        // Botón "Reto Anterior"
        if (currentRetoIndex > 0) {
            const botonAnterior = document.createElement('button');
            botonAnterior.textContent = `< Reto anterior`;
            botonAnterior.className = 'boton-reto-anterior';
            botonAnterior.addEventListener('click', () => cargarContenido(--currentRetoIndex));
            container.appendChild(botonAnterior);
        }

        // Botón "Siguiente Reto" (solo si hay más retos)
        if (currentRetoIndex < retosData.length - 1) {
            const botonSiguiente = document.createElement('button');
            botonSiguiente.textContent = `Siguiente reto >`;
            botonSiguiente.className = 'boton-reto';
            botonSiguiente.addEventListener('click', () => cargarContenido(++currentRetoIndex));
            container.appendChild(botonSiguiente);
        }
    }

    // Función para verificar las respuestas
    window.checkAnswers = function () {
        fetch('contenido.json')
            .then(response => response.json())
            .then(data => {
                const retoKey = retosData[currentRetoIndex];
                const content = data[retoKey];

                if (!content || !content.correctAnswers) {
                    console.error(`No se encontraron respuestas correctas para ${retoKey}`);
                    return;
                }

                const correctAnswers = content.correctAnswers;
                let score = 0;
                let totalConcepts = Object.keys(correctAnswers).length;

                for (let concept in correctAnswers) {
                    const conceptDiv = document.getElementById(concept);

                    if (!conceptDiv) {
                        console.error(`No se encontró el elemento con ID ${concept}`);
                        continue;
                    }

                    const codeSnippet = conceptDiv.querySelector('.code-snippet');

                    if (codeSnippet && codeSnippet.id === correctAnswers[concept]) {
                        score++;
                    }
                }

                alert(`Tu puntuación es: ${score} de ${totalConcepts}`);

                // Si se completaron todos los retos, mostrar mensaje final
                if (currentRetoIndex >= retosData.length - 1) {
                    alert("¡Has completado todos los retos!");
                }
            })
            .catch(error => console.error('Error al validar las respuestas:', error));
    };

    // Cargar el primer reto
    cargarContenido(currentRetoIndex);
};
