function allowDrop(ev) {
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
}
