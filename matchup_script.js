let retoActual = 1; // Mover esta línea fuera de document.addEventListener("DOMContentLoaded")

document.addEventListener("DOMContentLoaded", function () {

    function cargarContenido(reto) {
        fetch('contenido.json')
            .then(response => response.json())
            .then(data => {
                const retoKey = `codesReto${reto}`;
                if (!data[retoKey]) {
                    console.error("No se encontró el reto:", retoKey);
                    return;
                }

                // Limpiar contenido anterior
                const contenedor = document.getElementById('contenedorRetos');
                contenedor.innerHTML = '';

                // Cargar nuevo reto
                const retoData = data[retoKey];
                document.getElementById('tituloReto').innerText = retoData.title;

                retoData.concepts.forEach(concept => {
                    const div = document.createElement('div');
                    div.id = concept.id;
                    div.classList.add('droppable');
                    div.innerHTML = `<p>${concept.description}</p>`;
                    contenedor.appendChild(div);
                });

                retoData.codes.forEach(code => {
                    const codeDiv = document.createElement('div');
                    codeDiv.classList.add('code-snippet');
                    codeDiv.id = code.id;
                    codeDiv.innerHTML = `<pre>${code.code}</pre>`;
                    contenedor.appendChild(codeDiv);
                });

                iniciarSortable(); // Volver a inicializar Sortable tras cargar un nuevo reto
            })
            .catch(error => console.error("Error cargando contenido:", error));
    }

    function iniciarSortable() {
        const codesContainer = document.querySelector('.codes');

        Sortable.create(codesContainer, {
            group: 'shared',
            animation: 150
        });

        document.querySelectorAll('.droppable').forEach(function (concept) {
            Sortable.create(concept, {
                group: 'shared',
                animation: 150,
                ghostClass: 'sortable-ghost'
            });
        });
    }

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
            checkAnswers();
        }
    }

    function mostrarBotonesNavegacion() {
        const container = document.querySelector('.buttons-container');

        const botonesExistentes = document.querySelectorAll('.boton-reto, .boton-reto-anterior');
        botonesExistentes.forEach(boton => boton.remove());

        if (retoActual > 0) {
            const botonRetoAnterior = document.createElement('button');
            botonRetoAnterior.textContent = `< Reto anterior`;
            botonRetoAnterior.className = 'boton-reto-anterior';

            botonRetoAnterior.addEventListener('click', function () {
                cargarContenido(--retoActual);
            });

            container.appendChild(botonRetoAnterior);
        }

        const botonSiguienteReto = document.createElement('button');
        botonSiguienteReto.textContent = `Siguiente reto >`;
        botonSiguienteReto.className = 'boton-reto';

        botonSiguienteReto.addEventListener('click', function () {
            cargarContenido(++retoActual);
        });

        container.appendChild(botonSiguienteReto);
    }

    document.addEventListener('dragend', verificarCompletado);

    cargarContenido(retoActual);
});

window.checkAnswers = function () {
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
            console.error(`No se encontró el elemento con ID ${concept}`);
            continue;
        }
        const codeSnippet = conceptDiv.querySelector('.code-snippet');
        if (codeSnippet && codeSnippet.id === correctAnswers[concept]) {
            score++;
        }
    }

    alert(`Tu puntuación es: ${score} de ${totalConcepts}`);

    if (score === totalConcepts) {
        alert("¡Felicidades! Pasaste al siguiente reto.");
        retoActual++;
        cargarContenido(retoActual);
    }
};

