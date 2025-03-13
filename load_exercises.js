let exercises = [];
let currentExerciseIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = parseInt(urlParams.get("exercise"), 10); // Asegurar que sea número

    if (!isNaN(exerciseId)) {
        loadExercises(exerciseId);
    } else {
        console.error("No se encontró un ID de ejercicio válido en la URL.");
    }
});


function loadExercises(exerciseId) {  
    fetch('exercises.json') // Cargar el JSON con los ejercicios
        .then(response => response.json())
        .then(exercises => {
            const selectedExercise = exercises.find(ex => ex.id === exerciseId);
            if (selectedExercise) {
                loadExercise(selectedExercise); // Cargar solo el ejercicio filtrado
            } else {
                console.error("Ejercicio no encontrado en el JSON.");
            }
        })
        .catch(error => console.error("Error al cargar los ejercicios:", error));
}

function loadExercise(exercise) {
    if (!exercise || typeof exercise !== "object") {
        console.error("No se proporcionó un ejercicio válido.");
        return;
    }

    // Asegurar que el código se renderice correctamente
    setTimeout(() => {
        document.getElementById("h5_title").innerText = exercise.title;
        document.getElementById("challenge").innerText = exercise.description;
        document.getElementById("code-editor").value = exercise.codeKoToRefactor;

        // Variables adicionales para mensajes
        window.modal_click_message = exercise.modalClickMessage;
        window.error_message = exercise.errorMessage;
        window.success_message = exercise.successMessage;

        // Pasamos codeOkForExpect a token_functions.js
        getAIExpect(exercise.codeOkForExpect);
    }, 100); // Un pequeño delay puede ayudar en ciertos casos
}

// Recargar la página solo una vez asegurándonos de que no se haga en bucle
if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    location.reload();
}

