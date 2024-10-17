document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar dinámicamente los códigos y conceptos desde JSON
    function cargarContenido() {
        fetch('contenido.json')
            .then(response => response.json())
            .then(data => {
                // Cargar los snippets de código
                const codesContainer = document.querySelector('.codes');
                data.codes.forEach(item => {
                    const codeDiv = document.createElement('div');
                    codeDiv.id = item.id;
                    codeDiv.className = 'code-snippet';
                    codeDiv.innerHTML = `<code>${item.code}</code>`;
                    codesContainer.appendChild(codeDiv);
                });

                // Cargar los conceptos
                const conceptsContainer = document.querySelector('.concepts');
                data.concepts.forEach(item => {
                    const conceptDiv = document.createElement('div');
                    conceptDiv.id = item.id;
                    conceptDiv.className = 'droppable';
                    conceptDiv.textContent = item.description;
                    conceptsContainer.appendChild(conceptDiv);
                });

                // Configurar Sortable después de cargar el contenido
                iniciarSortable();
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
                ghostClass: 'sortable-ghost' // Añade una clase durante el arrastre para estilizarlo
            });
        });
    }

    // Función para verificar las respuestas
    function checkAnswers() {
        const correctAnswers = {
            concept1: "code1",  // Método de array
            concept2: "code2",  // Declaración de variable
            concept3: "code3",  // Método Math
            concept4: "code4",  // Declaración de función
            concept5: "code5",  // Interacción con el DOM
            concept6: "code6",  // Función flecha
            concept7: "code7",  // Objeto Date
            concept8: "code8",  // Conversión de tipo
            concept9: "code9",  // API de almacenamiento local
            concept10: "code10" // Salida en consola
        };

        let score = 0;

        for (let concept in correctAnswers) {
            const conceptDiv = document.getElementById(concept);
            const codeSnippet = conceptDiv.querySelector('.code-snippet');
            if (codeSnippet && codeSnippet.id === correctAnswers[concept]) {
                score++;
            }
        }

        alert(`Tu puntuación es: ${score} de ${Object.keys(correctAnswers).length}`);
    }

    // Agrega el evento al botón de enviar respuestas
    document.querySelector('button').addEventListener('click', checkAnswers);

    // Llamar a la función para cargar el contenido al cargar la página
    cargarContenido();
});
