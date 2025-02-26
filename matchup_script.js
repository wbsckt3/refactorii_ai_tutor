document.addEventListener("DOMContentLoaded", function () {
    
    // Función para cargar dinámicamente los códigos y conceptos desde JSON
 

    function cargarContenido(reto) {
    fetch('contenido.json')
        .then(response => response.json())
        .then(data => {
            const retoKey = codesReto${reto};
            if (!data[retoKey]) {
                console.error("No se encontró el reto:", retoKey);
                return;
            }

            // Limpia la UI antes de cargar el nuevo reto
            document.getElementById('contenedorRetos').innerHTML = '';

            // Lógica para cargar el nuevo reto
            const retoData = data[retoKey];
            document.getElementById('tituloReto').innerText = retoData.title;

            retoData.concepts.forEach(concept => {
                const div = document.createElement('div');
                div.id = concept.id;
                div.innerHTML = <p>${concept.description}</p>;
                document.getElementById('contenedorRetos').appendChild(div);
            });

            retoData.codes.forEach(code => {
                const codeDiv = document.createElement('div');
                codeDiv.classList.add('code-snippet');
                codeDiv.id = code.id;
                codeDiv.innerHTML = <pre>${code.code}</pre>;
                document.getElementById('contenedorRetos').appendChild(codeDiv);
            });
        })
        .catch(error => console.error("Error cargando contenido:", error));
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
    
        // Obtener el texto del h1 actual para los botones
        const tituloActual = document.querySelector('h1').textContent;
    
        // Botón de "Reto anterior" (si no estamos en el primer reto)
        if (retoActual > 0) {
            const botonRetoAnterior = document.createElement('button');
            const tituloAnterior = Reto ${retoActual}: ${tituloActual}; // Título del reto anterior
            botonRetoAnterior.textContent = < Reto anterior;
            botonRetoAnterior.className = 'boton-reto-anterior';
    
            // Funcionalidad del botón de reto anterior
            botonRetoAnterior.addEventListener('click', function () {
                cargarContenido(--retoActual);
            });
    
            // Añadir el botón de "Reto anterior" al contenedor
            container.appendChild(botonRetoAnterior);
        }
    
        // Crear el botón para el siguiente reto
        const botonSiguienteReto = document.createElement('button');
        const tituloSiguiente = Reto ${retoActual + 1}: ${tituloActual}; // Título del siguiente reto
        botonSiguienteReto.textContent = Siguiente reto >;
        botonSiguienteReto.className = 'boton-reto';
    
        // Funcionalidad del botón de siguiente reto
        botonSiguienteReto.addEventListener('click', function () {
            cargarContenido(++retoActual);
        });
    
        // Añadir el botón de "Siguiente reto" al contenedor
        container.appendChild(botonSiguienteReto);
    }
            
    let retoActual = 1;

    // Agregar evento para verificar cuando se completan todos los elementos
    document.addEventListener('dragend', verificarCompletado);

    // Cargar el primer reto al cargar la página
    cargarContenido(retoActual);
});

// Función para verificar las respuestas y avanzar si se completan todas correctamente
window.checkAnswers = function() {
    const correctAnswers = {
        concept1: "code1",
        concept2: "code2",
        concept3: "code3",
        concept4: "code4",
        concept5: "code5",
        concept6: "code6",
        concept7: "code7",
        concept8: "code8",
        concept9: "code9",
        concept10: "code10"
    };

    let score = 0;
    let totalConcepts = Object.keys(correctAnswers).length;

    for (let concept in correctAnswers) {
        const conceptDiv = document.getElementById(concept);

        if (!conceptDiv) {
            console.error(No se encontró el elemento con ID ${concept});
            continue;
        }

        const codeSnippet = conceptDiv.querySelector('.code-snippet');

        if (codeSnippet && codeSnippet.id === correctAnswers[concept]) {
            score++;
        }
    }

    alert(Tu puntuación es: ${score} de ${totalConcepts});

    // Si todas las respuestas son correctas, avanzar al siguiente reto
    if (score === totalConcepts) {
        alert("¡Felicidades! Pasaste al siguiente reto.");
        retoActual++;
        cargarContenido(retoActual);
    }
}; 
