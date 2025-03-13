let exercises = [];
let currentExerciseIndex = 0;

function loadExercises(exerciseId) {
    fetch('exercises.json') // Cargar el JSON con los ejercicios
        .then(response => response.json())
        .then(exercises => {
            const selectedExercise = exercises.find(ex => ex.id === exerciseId);
            if (selectedExercise) {
                loadExercise(exercises.indexOf(selectedExercise)); // Cargar solo el ejercicio filtrado
            } else {
                console.error("Ejercicio no encontrado en el JSON.");
            }
        })
        .catch(error => console.error("Error al cargar los ejercicios:", error));
}

function loadExercise(exercise) {
    if (!exercise) {
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
