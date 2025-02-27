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

                // Mostrar botones de validación y navegación
                mostrarBotones();
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

    // Función para mostrar los botones de Validar y Navegación
    function mostrarBotones() {
        const container = document.querySelector('.buttons-container');

        // Eliminar botones previos si existen
        container.innerHTML = '';

        // Botón "Validar Respuestas"
        const botonValidar = document.createElement('button');
        botonValidar.textContent = `✅ Validar Respuestas`;
        botonValidar.className = 'boton-validar';
        botonValidar.addEventListener('click', checkAnswers);
        container.appendChild(botonValidar);

        // Botón "Reto Anterior"
        if (currentRetoIndex > 0) {
            const botonAnterior = document.createElement('button');
            botonAnterior.textContent = `< Reto anterior`;
            botonAnterior.className = 'boton-reto-anterior';
            botonAnterior.addEventListener('click', () => cargarContenido(--currentRetoIndex));
            container.appendChild(botonAnterior);
        }

        // Botón "Siguiente Reto" (Se mostrará solo si el usuario tiene 10 respuestas correctas)
        const botonSiguiente = document.createElement('button');
        botonSiguiente.textContent = `Siguiente reto >`;
        botonSiguiente.className = 'boton-reto';
        botonSiguiente.style.display = 'none';  // Inicialmente oculto
        botonSiguiente.addEventListener('click', () => cargarContenido(++currentRetoIndex));
        container.appendChild(botonSiguiente);
    }

    // Función para verificar las respuestas
    window.checkAnswers = function () {
        fetch('contenido.json')
            .then(response => response.json())
            .then(data => {
                const retoKey = retosData[currentRetoIndex];
                const content = data[retoKey];

                if (!content || !content.correctAnswers) {
                    mostrarMensaje(`No se encontraron respuestas correctas para ${retoKey}`, "error");
                    return;
                }

                const correctAnswers = content.correctAnswers;
                let score = 0;
                let totalConcepts = Object.keys(correctAnswers).length;

                for (let concept in correctAnswers) {
                    const conceptDiv = document.getElementById(concept);

                    if (!conceptDiv) {
                        mostrarMensaje(`No se encontró el elemento con ID ${concept}`, "error");
                        continue;
                    }

                    const codeSnippet = conceptDiv.querySelector('.code-snippet');

                    if (codeSnippet && codeSnippet.id === correctAnswers[concept]) {
                        score++;
                    }
                }

                mostrarMensaje(`✅ Tu puntuación es: ${score} de ${totalConcepts}`, "success");

                // Mostrar botón de siguiente reto solo si el puntaje es 10
                if (score >= 10) {
                    document.querySelector('.boton-reto').style.display = 'inline-block';
                }

                // Si se completaron todos los retos, mostrar mensaje final
                if (currentRetoIndex >= retosData.length - 1) {
                    mostrarMensaje("🎉 ¡Has completado todos los retos!", "success");
                }
            })
            .catch(error => mostrarMensaje('Error al validar las respuestas.', "error"));
    };

    // Función para mostrar mensajes en pantalla
    function mostrarMensaje(texto, tipo) {
        let mensajeDiv = document.getElementById("mensaje");

        if (!mensajeDiv) {
            mensajeDiv = document.createElement("div");
            mensajeDiv.id = "mensaje";
            document.body.appendChild(mensajeDiv);
        }

        mensajeDiv.textContent = texto;
        mensajeDiv.className = tipo; // Puede ser "success" o "error"

        // Estilos básicos para el mensaje
        mensajeDiv.style.position = "fixed";
        mensajeDiv.style.bottom = "20px";
        mensajeDiv.style.left = "50%";
        mensajeDiv.style.transform = "translateX(-50%)";
        mensajeDiv.style.padding = "10px 20px";
        mensajeDiv.style.color = "#fff";
        mensajeDiv.style.borderRadius = "5px";
        mensajeDiv.style.zIndex = "1000";

        if (tipo === "success") {
            mensajeDiv.style.backgroundColor = "green";
        } else {
            mensajeDiv.style.backgroundColor = "red";
        }

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => mensajeDiv.remove(), 3000);
    }
};
