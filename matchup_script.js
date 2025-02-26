let currentRetoIndex = 0;  // Empezamos en el primer reto
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
                    console.error(`Reto ${retoIndex} no encontrado en el JSON`);
                    return;
                }

                // Establecer el título del reto en un elemento h2
                const tituloReto = document.querySelector('h2');
                tituloReto.textContent = content.title || `Reto ${retoIndex + 1}`;

                // Limpiar el contenedor de códigos y conceptos anteriores
                const codesContainer = document.querySelector('.codes');
                const conceptsContainer = document.querySelector('.concepts');
                codesContainer.innerHTML = '';
                conceptsContainer.innerHTML = '';

                // Cargar los snippets de código
                content.codes.forEach(item => {
                    const codeDiv = document.createElement('div');
                    codeDiv.id = item.id;
                    codeDiv.className = 'code-snippet';
                    codeDiv.innerHTML = `<code>${item.code}</code>`;
                    codesContainer.appendChild(codeDiv);
                });

                // Cargar los conceptos
                content.concepts.forEach(item => {
                    const conceptDiv = document.createElement('div');
                    conceptDiv.id = item.id;
                    conceptDiv.className = 'droppable';
                    conceptDiv.textContent = item.description;
                    conceptsContainer.appendChild(conceptDiv);
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

    // Función para verificar si todas las respuestas fueron completadas
    function verificarCompletado() {
        const droppables = document.querySelectorAll('.droppable');
        let completado = true;

        droppables.forEach(droppable => {
            if (!droppable.querySelector('.code-snippet')) {
                completado = false;
            }
        });

        if (completado) {
            mostrarBotonesNavegacion();
            checkAnswers(); // Llama a checkAnswers después de completar
        }
    }

    // Función para mostrar los botones de "Reto anterior" y "Siguiente reto"
    function mostrarBotonesNavegacion() {
        const container = document.querySelector('.buttons-container');
        
        // Verificar si ya existen botones y eliminarlos
        const botonesExistentes = document.querySelectorAll('.boton-reto, .boton-reto-anterior');
        botonesExistentes.forEach(boton => boton.remove());

        // Botón de "Reto anterior" (si no estamos en el primer reto)
        if (currentRetoIndex > 0) {
            const botonRetoAnterior = document.createElement('button');
            botonRetoAnterior.textContent = `< Reto anterior`;
            botonRetoAnterior.className = 'boton-reto-anterior';

            // Funcionalidad del botón de reto anterior
            botonRetoAnterior.addEventListener('click', function () {
                cargarContenido(--currentRetoIndex);
            });

            // Añadir el botón de "Reto anterior" al contenedor
            container.appendChild(botonRetoAnterior);
        }

        // Crear el botón para el siguiente reto (si hay más retos)
        if (currentRetoIndex < retosData.length - 1) {
            const botonSiguienteReto = document.createElement('button');
            botonSiguienteReto.textContent = `Siguiente reto >`;
            botonSiguienteReto.className = 'boton-reto';

            // Funcionalidad del botón de siguiente reto
            botonSiguienteReto.addEventListener('click', function () {
                cargarContenido(++currentRetoIndex);
            });

            // Añadir el botón de "Siguiente reto" al contenedor
            container.appendChild(botonSiguienteReto);
        }
    }

    // Agregar evento para verificar cuando se completan todos los elementos
    document.addEventListener('dragend', verificarCompletado);
};

// Función para verificar las respuestas
window.checkAnswers = function() {
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

            // Pasar al siguiente reto después del alert si hay más retos
            if (currentRetoIndex < retosData.length - 1) {
                cargarContenido(++currentRetoIndex);
            } else {
                alert("¡Has completado todos los retos!");
            }
        })
        .catch(error => console.error('Error al validar las respuestas:', error));
};
