/*function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const codeSnippet = document.getElementById(data);
    ev.target.appendChild(codeSnippet);
}

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
} */

document.addEventListener("DOMContentLoaded", function () {
    // Hacer que los códigos sean arrastrables
    const codesContainer = document.querySelector('.codes');
    const conceptsContainer = document.querySelector('.concepts');

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
});

