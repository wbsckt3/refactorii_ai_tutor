let currentRetoIndex = 0;
let retosData = [];

window.onload = function () {
    fetch('contenido.json')
        .then(response => response.json())
        .then(data => {
            retosData = Object.keys(data);
            cargarContenido(currentRetoIndex);
        })
        .catch(error => console.error('Error cargando el JSON:', error));
};

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

            document.querySelector('h2').textContent = content.title || `Reto ${retoIndex + 1}`;
            document.querySelector('.codes').innerHTML = '';
            document.querySelector('.concepts').innerHTML = '';

            content.codes.forEach(item => {
                const codeDiv = document.createElement('div');
                codeDiv.id = item.id;
                codeDiv.className = 'code-snippet';
                codeDiv.draggable = true;
                codeDiv.innerHTML = `<code>${item.code}</code>`;
                document.querySelector('.codes').appendChild(codeDiv);
            });

            content.concepts.forEach(item => {
                const conceptDiv = document.createElement('div');
                conceptDiv.id = `concept-${item.id}`;
                conceptDiv.className = 'droppable';
                conceptDiv.dataset.correctCode = item.correctCode || '';
                conceptDiv.textContent = item.description;
                document.querySelector('.concepts').appendChild(conceptDiv);
            });

            iniciarSortable();
            mostrarBotones();
        })
        .catch(error => console.error('Error cargando el contenido:', error));
}

function iniciarSortable() {
    Sortable.create(document.querySelector('.codes'), {
        group: 'shared',
        animation: 150
    });

    document.querySelectorAll('.droppable').forEach(concept => {
        Sortable.create(concept, {
            group: 'shared',
            animation: 150,
            ghostClass: 'sortable-ghost',
            onAdd: function (evt) {
                evt.item.dataset.assignedTo = concept.dataset.correctCode;
            },
            onRemove: function (evt) {
                delete evt.item.dataset.assignedTo;
            }
        });
    });
}

function mostrarBotones() {
    const container = document.querySelector('.buttons-container');
    container.innerHTML = '';

    const botonValidar = document.createElement('button');
    botonValidar.textContent = `✅ Validar Respuestas`;
    botonValidar.className = 'boton-validar';
    botonValidar.addEventListener('click', checkAnswers);
    container.appendChild(botonValidar);

    if (currentRetoIndex > 0) {
        const botonAnterior = document.createElement('button');
        botonAnterior.textContent = `< Reto anterior`;
        botonAnterior.className = 'boton-reto-anterior';
        botonAnterior.addEventListener('click', () => cargarContenido(--currentRetoIndex));
        container.appendChild(botonAnterior);
    }

    const botonSiguiente = document.createElement('button');
    botonSiguiente.textContent = `Siguiente reto >`;
    botonSiguiente.className = 'boton-reto';
    botonSiguiente.style.display = 'none';
    botonSiguiente.addEventListener('click', () => cargarContenido(++currentRetoIndex));
    container.appendChild(botonSiguiente);
}

window.checkAnswers = function () {
    let score = 0;
    let totalConcepts = document.querySelectorAll('.droppable').length;
    
    document.querySelectorAll('.droppable').forEach(conceptDiv => {
        const assignedCode = conceptDiv.querySelector('.code-snippet');
        if (assignedCode && assignedCode.id === conceptDiv.dataset.correctCode) {
            score++;
            conceptDiv.style.backgroundColor = "#a8e6cf"; // Verde si es correcto
        } else {
            conceptDiv.style.backgroundColor = "#ff8b94"; // Rojo si es incorrecto
        }
    });

    mostrarMensaje(`✅ Tu puntuación es: ${score} de ${totalConcepts}`, "success");
    if (score >= totalConcepts) {
        document.querySelector('.boton-reto').style.display = 'inline-block';
    }
    if (currentRetoIndex >= retosData.length - 1) {
        mostrarMensaje("🎉 ¡Has completado todos los retos!", "success");
    }
};

function mostrarMensaje(texto, tipo) {
    let mensajeDiv = document.getElementById("mensaje");
    if (!mensajeDiv) {
        mensajeDiv = document.createElement("div");
        mensajeDiv.id = "mensaje";
        document.body.appendChild(mensajeDiv);
    }
    mensajeDiv.textContent = texto;
    mensajeDiv.className = tipo;
    mensajeDiv.style.position = "fixed";
    mensajeDiv.style.bottom = "20px";
    mensajeDiv.style.left = "50%";
    mensajeDiv.style.transform = "translateX(-50%)";
    mensajeDiv.style.padding = "10px 20px";
    mensajeDiv.style.color = "#fff";
    mensajeDiv.style.borderRadius = "5px";
    mensajeDiv.style.zIndex = "1000";
    mensajeDiv.style.backgroundColor = tipo === "success" ? "green" : "red";
    setTimeout(() => mensajeDiv.remove(), 3000);
}
