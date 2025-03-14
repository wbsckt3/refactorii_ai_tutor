let exercises = [];
let currentExerciseIndex = 0;

function loadExercise(exercise) {
    if (!exercise || typeof exercise !== "object") {
        console.error("No se proporcionó un ejercicio válido.");
        return;
    }

    // Asegurar que el código se renderice correctamente
    setTimeout(() => {
        document.getElementById("h5_title").innerText = exercise.title; 
        document.getElementById("challenge").innerText = exercise.description; 

        // Esperar a que CodeMirror se inicialice antes de asignar el código
        let interval = setInterval(() => {
            if (window.codeEditor) { // ✅ Verificar si CodeMirror está listo
                clearInterval(interval); // Detener el intervalo
                codeEditor.setValue(exercise.codeKoToRefactor);
            }
        }, 50);

        // Variables adicionales para mensajes
        window.modal_click_message = exercise.modalClickMessage;
        window.error_message = exercise.errorMessage;
        window.success_message = exercise.successMessage;
        // Pasamos codeOkForExpect a token_functions.js
        getAIExpect(exercise.codeOkForExpect);
    }, 300); // Un pequeño delay puede ayudar en ciertos casos
}


async function loadExercises(exerciseId) {
    try {
        const response = await fetch('exercises.json');
        const exercises = await response.json();

        console.log("Ejercicios cargados:", exercises);
        console.log("Buscando ejercicio con ID:", exerciseId);

        const selectedExercise = exercises.find(ex => String(ex.id) === String(exerciseId));

        if (selectedExercise) {
            console.log("Ejercicio encontrado:", selectedExercise);
            loadExercise(selectedExercise);
        } else {
            console.error("❌ Ejercicio no encontrado en el JSON.");
        }
    } catch (error) {
        console.error("⚠️ Error al cargar los ejercicios:", error);
    }
}


