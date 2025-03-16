/* async function fetchAIResponseGetAiExpect(userCode) {
		    try {
		        const challenge = document.getElementById('challenge').textContent;
		        const response = await fetch('https://www.refactorii.com/fetchAIExpectations', { // Ahora va al backend
		            method: 'POST',
		            headers: {
		                'Content-Type': 'application/json'
		            },
		            body: JSON.stringify({ code: userCode, challenge: challenge })
		        });
		        const data = await response.json();
		        if (data.success) {
		            localStorage.setItem('testExpectations', data.expectations);
		            console.log("Expectativas guardadas:", data.expectations);
		        } else {
		            console.error("Error en la respuesta de la IA:", data.message);
		        }
		    } catch (error) {
		        console.error("Error al obtener expectativas de IA:", error);
		    }
} */

/*let exercises = [];
let currentExerciseIndex = 0;

function loadExercise(exercise) {
    if (!exercise || typeof exercise !== "object") {
        console.error("No se proporcionó un ejercicio válido.");
        return;
    }
    setTimeout(() => {
        document.getElementById("h5_title").innerText = exercise.title; 
        document.getElementById("challenge").innerText = exercise.description; 
        editor.setValue(exercise.codeKoToRefactor);
        window.modal_click_message = exercise.modalClickMessage;
        window.error_message = exercise.errorMessage;
        window.success_message = exercise.successMessage;
        await fetchAIResponseGetAiExpect(exercise.codeOkForExpect); 
    }, 300); 
}

async function loadExercises(exerciseId) {
    try {
        const response = await fetch('exercises.json');
        const exercises = await response.json();
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
} */
