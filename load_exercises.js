let exercises = [];
let currentExerciseIndex = 0;

function loadExercises(exerciseId) {
    fetch('exercises.json')
        .then(response => response.json())
        .then(data => {
            exercises = data; // Guardar los ejercicios cargados
            const selectedExercise = exercises.find(ex => ex.id === Number(exerciseId)); // Convertir ID a número
            if (selectedExercise) {
                loadExercise(selectedExercise); // Pasar el objeto directamente
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

    // Actualizar título y descripción del ejercicio
    document.getElementById("h5_title").innerText = exercise.title;
    document.getElementById("challenge").innerText = exercise.description;
    document.getElementById("code-editor").value = exercise.codeKoToRefactor;

    // Variables adicionales para mensajes
    window.modal_click_message = exercise.modalClickMessage;
    window.error_message = exercise.errorMessage;
    window.success_message = exercise.successMessage;

    // Pasamos codeOkForExpect a token_functions.js
    getAIExpect(exercise.codeOkForExpect);
}

// Obtener el parámetro "exercise" de la URL y cargar el ejercicio
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get("exercise"); // Obtener el ID del ejercicio desde la URL

    if (exerciseId) {
        loadExercises(exerciseId);
    } else {
        console.error("No se proporcionó un ID de ejercicio en la URL.");
    }
});
